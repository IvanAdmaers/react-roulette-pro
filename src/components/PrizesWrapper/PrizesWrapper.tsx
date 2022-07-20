import React, { useContext } from 'react';

import RouletteContext from '../../context/RouletteContext';

import { classNames } from '../../utills';

import type { IPrizesWrapperProps } from '../../types';

import './PrizesWrapper.css';

const PrizesWrapper = ({
  children,
  className,
  tagName: Tag = 'div',
  style,
}: IPrizesWrapperProps) => {
  const { type, options, start, prizeListClassName } =
    useContext(RouletteContext);

  const isWithAnimation = options.withoutAnimation !== true && start !== true;

  const wrapperClassName = classNames(
    'roulette-pro-prize-list',
    {
      'with-animation': isWithAnimation,
    },
    [type],
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
