import React, { useContext } from 'react';

import RouletteContext from '../../context/RouletteContext';

import classNames from '../RoulettePro/utills/classNames';

interface IPrizesWrapperProps {
  type: 'horizontal' | 'vertical' | 'circle';
  children: React.ReactNode;
  className?: string;
  tagName?: React.ElementType;
  style?: React.CSSProperties;
}

const PrizesWrapper = ({
  type,
  children,
  className,
  tagName: Tag,
  style,
}: IPrizesWrapperProps) => {
  const { designOptions, start, designPrizeListClassName, prizeListClassName } =
    useContext(RouletteContext);

  const wrapperClassName = classNames(
    'roulette-pro-prize-list',
    {
      'with-animation':
        designOptions.withoutAnimation === false && start === false,
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
