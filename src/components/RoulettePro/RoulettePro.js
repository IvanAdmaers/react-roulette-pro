import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect, useRef, useMemo } from 'react';

import {
  RegularTop,
  RegularBottom,
  prizeItemRenderFunction as regularRenderFunction,
  defaultPrizeItemWidth as regularDefaultPrizeItemWidth,
} from './designs/Regular';
import {
  GracefulLinesTop,
  GracefulLinesBottom,
  prizeItemRenderFunction as gracefulLinesRenderFunction,
  defaultPrizeItemWidth as gracefulLinesDefaultPrizeItemWidth,
  wrapperClassName as gracefulLinesWrapperClassName,
} from './designs/GracefulLines';

import classNames from './utills/classNames';
import getPrizeOffset from './utills/getPrizeOffset';
import getPrizeAdditionalOffset from './utills/getPrizeAdditionalOffset';

import { useAudio } from '../../hooks';

import './styles.css';

const availableDesigns = {
  Regular: {
    name: 'Regular',
    getTopElement: (options) => (
      <RegularTop hideCenterDelimiter={options.hideCenterDelimiter} />
    ),
    getBottomElement: () => <RegularBottom />,
    renderFunction: (item, index, designOptions) =>
      regularRenderFunction(item, index, designOptions),
    defaultPrizeItemWidth: regularDefaultPrizeItemWidth,
    wrapperClassName: '',
    prizeListClassName: '',
  },
  GracefulLines: {
    name: 'GracefulLines',
    getTopElement: (options) => (
      <GracefulLinesTop hideTopArrow={options.hideTopArrow} />
    ),
    getBottomElement: (options) => (
      <GracefulLinesBottom
        hideSideArrows={options.hideSideArrows}
        replaceBottomArrowWithTopArrow={options.replaceBottomArrowWithTopArrow}
      />
    ),
    renderFunction: (item, index, designOptions) =>
      gracefulLinesRenderFunction(item, index, designOptions),
    defaultPrizeItemWidth: gracefulLinesDefaultPrizeItemWidth,
    wrapperClassName: gracefulLinesWrapperClassName,
    prizeListClassName: '',
  },
};

const { Regular } = availableDesigns;

const RoulettePro = ({
  topChildren,
  bottomChildren,
  design,
  prizeItemRenderFunction,
  prizes,
  designOptions,
  start,
  prizeIndex,
  spinningTime,
  onPrizeDefined,
  classes,
  soundWhileSpinning,
}) => {
  const [wrapperWidth, setWrapperWidth] = useState(0);

  const wrapperRef = useRef();

  const { start: startSound, stop: stopSound } = useAudio(soundWhileSpinning);

  const getSetup = () => {
    const designName = availableDesigns[design] ? design : Regular.name;

    const {
      getTopElement,
      getBottomElement,
      renderFunction,
      defaultPrizeItemWidth,
      wrapperClassName,
      prizeListClassName,
    } = availableDesigns[designName];

    const topChildrenElement = (
      <Fragment>
        {getTopElement(designOptions)}
        {topChildren}
      </Fragment>
    );

    const bottomChildrenElement = (
      <Fragment>
        {getBottomElement(designOptions)}
        {bottomChildren}
      </Fragment>
    );

    const currentRenderFunction = !prizeItemRenderFunction
      ? renderFunction
      : prizeItemRenderFunction;

    return [
      topChildrenElement,
      bottomChildrenElement,
      currentRenderFunction,
      defaultPrizeItemWidth,
      wrapperClassName,
      prizeListClassName,
    ];
  };

  const [
    topChildrenElement,
    bottomChildrenElement,
    renderFunction,
    defaultPrizeItemWidth,
    designWrapperClassName,
    designPrizeListClassName,
  ] = getSetup();

  const prizeItemWidth = designOptions.prizeItemWidth ?? defaultPrizeItemWidth;

  useEffect(() => {
    if (!wrapperRef) {
      return;
    }

    const setCurrentWrapperWidth = () => {
      const { width } = wrapperRef.current.getBoundingClientRect();

      setWrapperWidth(width);
    };

    setCurrentWrapperWidth();

    const listener = window.addEventListener('resize', setCurrentWrapperWidth);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [wrapperRef]);

  useEffect(() => {
    if (!start) {
      return;
    }

    if (soundWhileSpinning) {
      startSound();
    }

    const timeout = setTimeout(() => {
      onPrizeDefined();

      if (soundWhileSpinning) {
        stopSound();
      }
    }, spinningTime * 1000);

    return () => {
      clearTimeout(timeout);

      if (soundWhileSpinning) {
        stopSound();
      }
    };
    // to think about is it ok that we exclude onPrizeDefined from dependencies array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, spinningTime, soundWhileSpinning, startSound, stopSound]);

  const prizeIndexOffset = useMemo(() => {
    return (
      getPrizeOffset(prizeItemWidth, prizeIndex, wrapperWidth / 2) +
      getPrizeAdditionalOffset(prizeItemWidth)
    );
  }, [prizeIndex, prizeItemWidth, wrapperWidth]);

  const inlineStyles = !start
    ? {}
    : {
        transition: `all ${spinningTime}s cubic-bezier(0.0125, 0.1, 0.1, 1) 0s`,
        // transform: `translate3d(-${prizeIndexOffset}px, 0px, 0px)`,
        left: `-${prizeIndexOffset}px`,
      };

  const wrapperClasses = classNames(
    'roulette-pro-wrapper',
    designWrapperClassName,
    {
      [classes.wrapper]: classes.wrapper,
    },
  );

  const prizeListClasses = classNames(
    'roulette-pro-prize-list',
    {
      'with-animation': !designOptions.withoutAnimation && !start,
    },
    designPrizeListClassName,
    { [classes.prizeList]: classes.prizeList },
  );

  const prizesElement = useMemo(
    () =>
      prizes.map((item, index) => renderFunction(item, index, designOptions)),
    [designOptions, prizes, renderFunction],
  );

  return (
    <div ref={wrapperRef} className={wrapperClasses}>
      {topChildrenElement}
      <ul style={inlineStyles} className={prizeListClasses}>
        {prizesElement}
      </ul>
      {bottomChildrenElement}
    </div>
  );
};

RoulettePro.propTypes = {
  topChildren: PropTypes.node,
  bottomChildren: PropTypes.node,
  design: PropTypes.oneOf(Object.keys(availableDesigns)),
  prizeItemRenderFunction: PropTypes.func,
  prizes: PropTypes.arrayOf(PropTypes.object).isRequired,
  designOptions: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  ),
  start: PropTypes.bool.isRequired,
  prizeIndex: PropTypes.number.isRequired,
  spinningTime: PropTypes.number,
  onPrizeDefined: PropTypes.func,
  classes: PropTypes.shape({
    wrapper: PropTypes.string,
    prizeList: PropTypes.string,
  }),
  soundWhileSpinning: PropTypes.string,
};

RoulettePro.defaultProps = {
  topChildren: null,
  bottomChildren: null,
  design: Regular.name,
  prizeItemRenderFunction: null,
  designOptions: {},
  spinningTime: 10,
  onPrizeDefined: () => null,
  classes: {},
  soundWhileSpinning: null,
};

export default RoulettePro;
