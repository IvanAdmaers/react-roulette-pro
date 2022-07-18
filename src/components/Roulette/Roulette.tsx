import React, { Fragment, useState, useEffect, useRef, useMemo } from 'react';

import {
  RegularTop,
  RegularBottom,
  prizeItemRenderFunction as regularRenderFunction,
  defaultPrizeItemWidth as regularDefaultPrizeItemWidth,
  defaultPrizeItemHeight as regularDefaultPrizeItemHeight,
} from '../../designs/Regular';
import {
  GracefulLinesTop,
  GracefulLinesBottom,
  prizeItemRenderFunction as gracefulLinesRenderFunction,
  defaultPrizeItemWidth as gracefulLinesDefaultPrizeItemWidth,
  wrapperClassName as gracefulLinesWrapperClassName,
} from '../../designs/GracefulLines';

import type { DesignOptionsType, IPrizesWrapperProps } from '../../types';

import RouletteContext, {
  IRouletteContextProps,
} from '../../context/RouletteContext';

import Wrapper from '../Wrapper';
import PrizesWrapper from '../PrizesWrapper';

import { getPrizeOffset, getPrizeAdditionalOffset } from '../../utills';

import { useAudio } from '../../hooks';

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
    defaultPrizeItemHeight: regularDefaultPrizeItemHeight,
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

type PrizeType = {
  id: string | number;
  image: string;
  text?: string;
};

type ClassesType = {
  wrapper?: string;
  prizeList?: string;
};

type OptionsType = {
  stopInCenter?: boolean;
};

interface IRouletteProps {
  start: boolean;
  prizes: Array<PrizeType>;
  prizeIndex: number;
  onPrizeDefined?: Function;
  spinningTime?: number;
  prizeItemRenderFunction?: (
    item: PrizeType,
    index: number,
    designOptions: DesignOptionsType,
  ) => React.ReactNode;
  topChildren?: React.ReactNode;
  bottomChildren?: React.ReactNode;
  design?: string;
  designOptions?: DesignOptionsType;
  classes?: ClassesType;
  soundWhileSpinning?: string;
  options?: OptionsType;
  type?: IPrizesWrapperProps['type'];
}

const Roulette = ({
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
  options,
  type,
}: IRouletteProps) => {
  const [wrapperSize, setWrapperSize] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>();

  const { start: startSound, stop: stopSound } = useAudio(soundWhileSpinning);

  const { stopInCenter } = options;

  const getSetup = () => {
    const designName = availableDesigns[design] ? design : Regular.name;

    const {
      getTopElement,
      getBottomElement,
      renderFunction,
      defaultPrizeItemWidth,
      defaultPrizeItemHeight,
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
      defaultPrizeItemHeight,
      wrapperClassName,
      prizeListClassName,
    ];
  };

  const [
    topChildrenElement,
    bottomChildrenElement,
    renderFunction,
    defaultPrizeItemWidth,
    defaultPrizeItemHeight,
    designWrapperClassName,
    designPrizeListClassName,
  ] = getSetup();

  const prizeItemWidth = designOptions.prizeItemWidth ?? defaultPrizeItemWidth;
  // prizeItemHeight doesnt doc
  const prizeItemHeight =
    designOptions.prizeItemHeight ?? defaultPrizeItemHeight;

  useEffect(() => {
    if (!wrapperRef) {
      return;
    }

    const setCurrentWrapperWidth = () => {
      const { width, height } = wrapperRef.current.getBoundingClientRect();

      if (type === 'horizontal') {
        return setWrapperSize(width);
      }

      if (type === 'vertical') {
        return setWrapperSize(height);
      }
    };

    setCurrentWrapperWidth();

    window.addEventListener('resize', setCurrentWrapperWidth);

    return () => {
      window.removeEventListener('resize', setCurrentWrapperWidth);
    };
  }, [wrapperRef, type]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, spinningTime]);

  const prizeIndexOffset = useMemo(() => {
    const prizeItemSize =
      type === 'horizontal' ? prizeItemWidth : prizeItemHeight;

    const prizeOffset = getPrizeOffset(
      prizeItemSize,
      prizeIndex,
      wrapperSize / 2,
    );

    const additionalOffset =
      stopInCenter === false ? getPrizeAdditionalOffset(prizeItemWidth) : 0;

    return prizeOffset + additionalOffset;
  }, [
    type,
    prizeIndex,
    prizeItemWidth,
    prizeItemHeight,
    wrapperSize,
    stopInCenter,
  ]);

  const getInlineStyles = () => {
    const getAnimationProperty = () => {
      switch (type) {
        case 'horizontal':
          return 'left';

        case 'vertical':
          return 'top';

        default:
          throw new Error('Type is unknown');
      }
    };

    const animationProperty = getAnimationProperty();

    if (start === false) {
      return {
        [animationProperty]: '0',
        willChange: animationProperty,
      };
    }

    return {
      transition: `all ${spinningTime}s cubic-bezier(0.0125, 0.1, 0.1, 1) 0s`,
      [animationProperty]: `-${prizeIndexOffset}px`,
    };
  };

  const inlineStyles = getInlineStyles();

  const prizesElement = useMemo(
    () =>
      prizes.map((item, index) => renderFunction(item, index, designOptions)),
    [designOptions, prizes, renderFunction],
  );

  const contextValue = useMemo<IRouletteContextProps>(
    () => ({
      designOptions,
      start,
      designPrizeListClassName,
      prizeListClassName: classes.prizeList,
      designWrapperClassName,
      wrapperClassName: classes.wrapper,
      type,
    }),
    [
      designOptions,
      start,
      designPrizeListClassName,
      classes,
      designWrapperClassName,
      type,
    ],
  );

  return (
    <RouletteContext.Provider value={contextValue}>
      <Wrapper ref={wrapperRef}>
        {topChildrenElement}
        <PrizesWrapper tagName="ul" type="circle" style={inlineStyles}>
          {prizesElement}
        </PrizesWrapper>
        {bottomChildrenElement}
      </Wrapper>
    </RouletteContext.Provider>
  );
};

Roulette.defaultProps = {
  topChildren: null,
  bottomChildren: null,
  design: Regular.name,
  prizeItemRenderFunction: null,
  designOptions: {},
  spinningTime: 10,
  onPrizeDefined: () => null,
  classes: {},
  soundWhileSpinning: null,
  options: {},
  type: 'horizontal',
};

export default Roulette;
