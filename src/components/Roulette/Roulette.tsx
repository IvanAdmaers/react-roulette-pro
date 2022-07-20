import React, { Fragment, useState, useEffect, useRef, useMemo } from 'react';

// Default design
import regularDesign from '../../designs/regular';
import type { IRegularDesignProps } from '../../designs/regular';

import type {
  PrizeType,
  IDesignPlugin,
  IDesignPluginProps,
  OptionsType,
  RouletteType,
} from '../../types';

import RouletteContext, {
  IRouletteContextProps,
} from '../../context/RouletteContext';

import Wrapper from '../Wrapper';
import PrizesWrapper from '../PrizesWrapper';

import {
  getPrizeOffset,
  getPrizeAdditionalOffset,
  classNames,
} from '../../utills';

import { useAudio } from '../../hooks';

type ClassesType = {
  wrapper?: string;
  prizeListWrapper?: string;
};

interface IRouletteProps {
  start: boolean;
  prizes: Array<PrizeType>;
  prizeIndex: number;
  onPrizeDefined?: Function;
  spinningTime?: number;
  prizeItemRenderFunction?: (item: PrizeType) => React.ReactNode;
  topChildren?: React.ReactNode;
  bottomChildren?: React.ReactNode;
  designPlugin?: ({ type }: IDesignPluginProps) => IDesignPlugin;
  defaultDesignOptions?: IRegularDesignProps;
  classes?: ClassesType;
  soundWhileSpinning?: string;
  options?: OptionsType;
  type?: RouletteType;
}

const Roulette = ({
  topChildren,
  bottomChildren,
  designPlugin,
  prizeItemRenderFunction,
  prizes,
  defaultDesignOptions = {},
  start,
  prizeIndex,
  spinningTime = 10,
  onPrizeDefined,
  classes,
  soundWhileSpinning,
  options = {},
  type = 'horizontal',
}: IRouletteProps) => {
  const [wrapperSize, setWrapperSize] = useState(0);

  const wrapperRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const { start: startSound, stop: stopSound } = useAudio(
    soundWhileSpinning ?? '',
  );

  const { stopInCenter } = options;

  const defaultDesign = regularDesign(defaultDesignOptions)({ type });

  const design =
    designPlugin === null ? defaultDesign : designPlugin!({ type });

  // prizeItemHeight doesn't doc
  const { prizeItemWidth, prizeItemHeight } = design;

  useEffect(() => {
    if (!wrapperRef) {
      return;
    }

    const setCurrentWrapperWidth = () => {
      const { width, height } = wrapperRef.current!.getBoundingClientRect();

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
      onPrizeDefined?.();

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
      stopInCenter === false ? getPrizeAdditionalOffset(prizeItemSize) : 0;

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

  const prizesElement = useMemo(() => {
    const getRenderFunction = () => {
      if (typeof prizeItemRenderFunction === 'function') {
        return prizeItemRenderFunction;
      }

      if (typeof design.prizeItemRenderFunction === 'function') {
        return design.prizeItemRenderFunction;
      }

      return defaultDesign.prizeItemRenderFunction;
    };

    const renderFunction = getRenderFunction();

    return prizes.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li key={`${item.id}-${index}`}>{renderFunction?.(item)}</li>
    ));
  }, [
    prizes,
    design.prizeItemRenderFunction,
    prizeItemRenderFunction,
    defaultDesign.prizeItemRenderFunction,
  ]);

  const wrapperClassName = classNames(
    classes?.wrapper,
    design.classes?.wrapper,
  );
  const prizeListClassName = classNames(
    classes?.prizeListWrapper,
    design.classes?.prizeListWrapper,
  );

  const contextValue = useMemo<IRouletteContextProps>(
    () => ({
      options,
      start,
      wrapperClassName,
      prizeListClassName,
      type,
    }),
    [options, start, type, prizeListClassName, wrapperClassName],
  );

  const topChildrenElement = (
    <Fragment>
      {design.topChildren}
      {topChildren}
    </Fragment>
  );

  const bottomChildrenElement = (
    <Fragment>
      {design.bottomChildren}
      {bottomChildren}
    </Fragment>
  );

  return (
    <RouletteContext.Provider value={contextValue}>
      <Wrapper ref={wrapperRef}>
        {topChildrenElement}
        <PrizesWrapper tagName="ul" style={inlineStyles}>
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
  designPlugin: null,
  prizeItemRenderFunction: null,
  defaultDesignOptions: {},
  options: {},
  spinningTime: 10,
  onPrizeDefined: () => null,
  classes: {},
  soundWhileSpinning: null,
  type: 'horizontal',
};

export default Roulette;
