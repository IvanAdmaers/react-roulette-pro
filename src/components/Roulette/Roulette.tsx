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

import type { DesignOptionsType } from '../../types';

import RouletteContext, {
  IRouletteContextProps,
} from '../../context/RouletteContext';

import Wrapper from '../Wrapper';
import PrizesWrapper from '../PrizesWrapper';

import getPrizeOffset from './utills/getPrizeOffset';
import getPrizeAdditionalOffset from './utills/getPrizeAdditionalOffset';

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
}: IRouletteProps) => {
  const [wrapperWidth, setWrapperWidth] = useState(0);

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

    window.addEventListener('resize', setCurrentWrapperWidth);

    return () => {
      window.removeEventListener('resize', setCurrentWrapperWidth);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, spinningTime]);

  const prizeIndexOffset = useMemo(() => {
    const prizeOffset = getPrizeOffset(
      prizeItemWidth,
      prizeIndex,
      wrapperWidth / 2,
    );

    const additionalOffset =
      stopInCenter === false ? getPrizeAdditionalOffset(prizeItemWidth) : 0;

    return prizeOffset + additionalOffset;
  }, [prizeIndex, prizeItemWidth, wrapperWidth, stopInCenter]);

  const inlineStyles = !start
    ? {}
    : {
        transition: `all ${spinningTime}s cubic-bezier(0.0125, 0.1, 0.1, 1) 0s`,
        // transform: `translate3d(-${prizeIndexOffset}px, 0px, 0px)`,
        left: `-${prizeIndexOffset}px`,
      };

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
    }),
    [
      designOptions,
      start,
      designPrizeListClassName,
      classes,
      designWrapperClassName,
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
};

export default Roulette;
