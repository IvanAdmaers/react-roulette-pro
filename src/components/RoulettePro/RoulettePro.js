import PropTypes from 'prop-types';
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';

import { getPrizeOffset, getPrizeAdditionalOffset } from './utills';

import './styles.css';

const itemWidth = 205;

const RoulettePro = ({
  prizes,
  prizeIndex,
  start,
  debug,
  onPrizeDefined,
  spinningTime,
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

    const offset = getPrizeOffset(itemWidth, prizeIndex, containerCenter);
    const additionalOffset = getPrizeAdditionalOffset(itemWidth);

    log('Initialized ✅');

    setInit(true);

    return offset + additionalOffset;
  }, [containerCenter, prizeIndex, log]);

  // Roulette inline styles
  const inlineStyles = useMemo(() => {
    if (!init) {
      return {};
    }

    if (!start) {
      return {
        transform: `translateX(-${itemWidth}px)`,
      };
    }

    log('Start spinning ⏱');

    return {
      transition: `all ${spinningTime}s cubic-bezier(0.0125, 0.1, 0.1, 1) 0s`,
      transform: `translate3d(-${prizeOffset}px, 0px, 0px)`,
    };
  }, [init, start, prizeOffset, log, spinningTime]);

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
            {prizes.map(({ id, image, text }, index) => (
              <div
                key={`roulette-pro-item-key-${id}-${index}`}
                className="roulette-pro-prize-item"
              >
                <div className="roulette-pro-prize-item-wrapper">
                  <div className="roulette-pro-image-wrapper">
                    <img
                      className="roulette-pro-prize-image"
                      src={image}
                      alt={text}
                      draggable="false"
                    />
                  </div>
                  <div className="roulette-pro-prize-title">{text}</div>
                </div>
              </div>
            ))}
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
};

RoulettePro.propTypes = {
  prizes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  prizeIndex: PropTypes.number.isRequired,
  start: PropTypes.bool.isRequired,
  debug: PropTypes.bool,
  onPrizeDefined: PropTypes.func,
  spinningTime: PropTypes.number,
};

export default RoulettePro;
