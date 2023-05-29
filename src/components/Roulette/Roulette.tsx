import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';

// Default design
import regularDesign from '../../designs/Regular';
import type { IRegularDesignProps } from '../../designs/Regular';

import type {
  PrizeType,
  IDesignPlugin,
  IDesignPluginProps,
  OptionsType,
  RouletteType,
  ClassesType,
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

type PrizeItemRenderFunctionType = (item: PrizeType) => React.ReactNode;

interface IRouletteProps {
  start: boolean;
  prizes: Array<PrizeType>;
  prizeIndex: number;
  onPrizeDefined?: () => void;
  spinningTime?: number;
  transitionFunction?: string;
  prizeItemRenderFunction?: PrizeItemRenderFunctionType;
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
  transitionFunction = 'cubic-bezier(0.0125, 0.1, 0.1, 1)',
  onPrizeDefined = () => {},
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
    typeof designPlugin !== 'function' ? defaultDesign : designPlugin({ type });

  const { prizeItemWidth, prizeItemHeight } = design;

  useEffect(() => {
    if (!wrapperRef) {
      return;
    }

    const setCurrentWrapperWidth = () => {
      const { width, height } = wrapperRef.current!.getBoundingClientRect();

      switch (type) {
        case 'horizontal':
          return setWrapperSize(width);

        case 'vertical':
          return setWrapperSize(height);

        default:
          console.error(`Unknown roulette type ${type}`);
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
      transition: `all ${spinningTime}s ${transitionFunction} 0s`,
      [animationProperty]: `-${prizeIndexOffset}px`,
    };
  };

  const inlineStyles = getInlineStyles();

  const getRenderFunction = useCallback((): PrizeItemRenderFunctionType => {
    if (typeof prizeItemRenderFunction === 'function') {
      return prizeItemRenderFunction;
    }

    if (typeof design.prizeItemRenderFunction === 'function') {
      return design.prizeItemRenderFunction;
    }

    return defaultDesign.prizeItemRenderFunction as PrizeItemRenderFunctionType;
  }, [
    defaultDesign.prizeItemRenderFunction,
    design.prizeItemRenderFunction,
    prizeItemRenderFunction,
  ]);

  const prizesElement = useMemo(() => {
    const renderFunction = getRenderFunction();

    const className = classNames(classes?.prizeItem, design.classes?.prizeItem);

    return prizes.map((item) => (
      <li key={item.id} className={className}>
        {renderFunction(item)}
      </li>
    ));
  }, [
    prizes,
    getRenderFunction,
    classes?.prizeItem,
    design.classes?.prizeItem,
  ]);

  /* Guards */

  // The width & height guard
  useEffect(() => {
    if (prizesElement.length === 0) {
      return;
    }

    let width = -1;
    let height = -1;

    const reset = () => {
      width = -1;
      height = -1;
    };

    for (let i = 0; i < prizesElement.length; i += 1) {
      const item = prizesElement[i]?.props?.children?.props?.style;
      const itemWidth = item?.width;
      const itemHeight = item?.height;

      if (width === -1 && height === -1) {
        width = itemWidth;
        height = itemHeight;

        continue;
      }

      if (width === itemWidth && height === itemHeight) {
        continue;
      }

      // This guard makes sure that every prize item width and height the same as in designPlugin
      if (itemWidth !== prizeItemWidth || itemHeight !== prizeItemHeight) {
        console.error(
          'One or more prize items have a different width or height than what is set in the designPlugin. Therefore, the roulette is incorrectly calculating the offset for the prize item index. Please check your `prizeItemRenderFunction`. All prize items must have the same width and height as set in the `prizeItemRenderFunction`',
        );
      }

      // This guard makes sure that every prize item has the same width & height
      // TODO: to think about should we stay this guard because actually the first guard covers this check
      console.error(
        'One or more prize items have different width or height; therefore, the roulette is incorrectly calculating the offset for the prize item index. All prize items must have the same width and height. Please check your `prizeItemRenderFunction` or `designPlugin` options',
      );

      break;
    }

    reset();

    return () => {
      reset();
    };
  }, [prizesElement, prizeItemWidth, prizeItemHeight]);

  /* End guards */

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

export default Roulette;
