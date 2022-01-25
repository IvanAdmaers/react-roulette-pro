import PropTypes from 'prop-types';
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  Fragment,
} from 'react';

import { getPrizeOffset, getPrizeAdditionalOffset } from './utills';

import './styles.css';

const defaultPrizeRenderFunction = ({ image, text }) => (
  <Fragment>
    <div className="roulette-pro-image-wrapper">
      <img
        className="roulette-pro-prize-image"
        src={image}
        alt={text}
        draggable="false"
      />
    </div>
    <div className="roulette-pro-prize-title">{text}</div>
  </Fragment>
);

const RoulettePro = ({
  prizes,
  prizeIndex,
  start,
  debug,
  onPrizeDefined,
  spinningTime,
  prizeRenderFunction,
  prizeWidth,
}) => {
  const [init, setInit] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const conteinerRef = useRef();
  const contentRef = useRef();

  // Debug log
  const log = useCallback(
    (message = '') => {
      if (!debug) {
        return null;
      }

      return console.log(
        `%cRoulette%cPro%c | ${message}`,
        'background: #000; color: #fff; padding: 0 3px;',
        'background: #fff; color: #000; padding: 0 5px;',
        '',
      );
    },
    [debug],
  );

  // Container center
  const containerCenter = useMemo(() => containerWidth / 2, [containerWidth]);

  // Prize offset
  const prizeOffset = useMemo(() => {
    if (!containerCenter) return;

    const offset = getPrizeOffset(prizeWidth, prizeIndex, containerCenter);
    const additionalOffset = getPrizeAdditionalOffset(prizeWidth);

    log('Initialized ✅');

    setInit(true);

    return offset + additionalOffset;
  }, [containerCenter, prizeIndex, log, prizeWidth]);

  // Roulette inline styles
  const inlineStyles = useMemo(() => {
    if (!init) {
      return {};
    }

    if (!start) {
      return {
        transform: `translateX(-${prizeWidth}px)`,
      };
    }

    log('Start spinning ⏱');

    return {
      transition: `all ${spinningTime}s cubic-bezier(0.0125, 0.1, 0.1, 1) 0s`,
      transform: `translate3d(-${prizeOffset}px, 0px, 0px)`,
    };
  }, [init, start, prizeOffset, log, spinningTime, prizeWidth]);

  // Set container width
  useEffect(() => {
    if (!conteinerRef.current) return;

    const { width } = conteinerRef.current.getBoundingClientRect();

    setContainerWidth(width);
  }, [conteinerRef]);

  // Prize defined handler
  const handlePrizeDefined = useCallback(() => {
    log('Prize defined 🎁');

    onPrizeDefined();
  }, [onPrizeDefined, log]);

  // Prize defined (event listener for transitionend)
  useEffect(() => {
    if (!contentRef.current) return;

    const content = contentRef.current;

    const listener = content.addEventListener(
      'transitionend',
      handlePrizeDefined,
    );

    return () => content.removeEventListener('transitionend', listener);
  }, [contentRef, log, handlePrizeDefined]);

  // Prizes element
  const prizesElement = useMemo(
    () =>
      prizes.map((prize, index) => (
        <div
          key={`roulette-pro-item-key-${prize.id}-${index}`}
          className="roulette-pro-prize-item"
          style={{ width: prizeWidth }}
        >
          <div className="roulette-pro-prize-item-wrapper">
            {prizeRenderFunction(prize, index)}
          </div>
        </div>
      )),
    [prizes, prizeRenderFunction, prizeWidth],
  );

  return (
    <div className="roulette-pro-wrapper">
      <div className="roulette-pro-prizes">
        <div ref={conteinerRef} className="roulette-pro-prizes-container">
          <div className="roulette-pro-effects" />
          <div
            ref={contentRef}
            className="roulette-pro-content"
            style={!Object.keys(inlineStyles).length ? {} : inlineStyles}
          >
            {prizesElement}
          </div>
        </div>
      </div>
    </div>
  );
};

RoulettePro.defaultProps = {
  debug: false,
  onPrizeDefined: () => null,
  spinningTime: 8,
  prizeRenderFunction: defaultPrizeRenderFunction,
  prizeWidth: 205,
};

RoulettePro.propTypes = {
  prizes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string,
      text: PropTypes.string,
    }).isRequired,
  ).isRequired,
  prizeIndex: PropTypes.number.isRequired,
  start: PropTypes.bool.isRequired,
  debug: PropTypes.bool,
  onPrizeDefined: PropTypes.func,
  spinningTime: PropTypes.number,
  prizeRenderFunction: PropTypes.func,
  prizeWidth: PropTypes.number,
};

export default RoulettePro;
