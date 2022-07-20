import React, { forwardRef, useContext } from 'react';

import { classNames } from '../../utills';

import RouletteContext from '../../context/RouletteContext';

import './Wrapper.css';

interface IWrapperProps {
  children: React.ReactNode;
  className?: string;
}

type RefType = HTMLDivElement;

const Wrapper = forwardRef<RefType, IWrapperProps>(
  ({ children, className }, ref) => {
    const rouletteContext = useContext(RouletteContext);

    const wrapperClassName = classNames(
      'roulette-pro-wrapper',
      rouletteContext.wrapperClassName,
      className,
    );

    return (
      <div className={wrapperClassName} ref={ref}>
        {children}
      </div>
    );
  },
);

Wrapper.defaultProps = {
  className: undefined,
};

Wrapper.displayName = 'Wrapper';

export default Wrapper;
