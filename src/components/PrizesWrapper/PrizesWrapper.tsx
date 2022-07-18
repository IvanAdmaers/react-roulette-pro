import React, { useContext } from 'react';

import RouletteContext from '../../context/RouletteContext';

import { classNames } from '../../utills';

import type { IPrizesWrapperProps } from '../../types';

import './PrizesWrapper.css';

const PrizesWrapper = ({
  children,
  className,
  tagName: Tag,
  style,
}: IPrizesWrapperProps) => {
  const {
    type,
    designOptions,
    start,
    designPrizeListClassName,
    prizeListClassName,
  } = useContext(RouletteContext);

  const isWithAnimation =
    designOptions.withoutAnimation === false && start === false;

  const wrapperClassName = classNames(
    'roulette-pro-prize-list',
    {
      'with-animation': isWithAnimation,
    },
    {
      [type]: isWithAnimation,
    },
    designPrizeListClassName,
    prizeListClassName,
    className,
  );

  return (
    <Tag className={wrapperClassName} style={style}>
      {children}
    </Tag>
  );
};

PrizesWrapper.defaultProps = {
  className: null,
  tagName: 'div',
  style: null,
};

export default PrizesWrapper;
