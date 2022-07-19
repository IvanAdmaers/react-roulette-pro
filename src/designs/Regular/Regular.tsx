import React from 'react';

import './Regular.css';

import { IDesignPlugin, IDesignPluginProps } from '../../types';

export interface IRegularDesignProps {
  hideCenterDelimiter?: boolean;
  prizesWithText?: boolean;
}

const TopChildren = ({
  hideCenterDelimiter,
}: Pick<IRegularDesignProps, 'hideCenterDelimiter'>) =>
  hideCenterDelimiter !== true && (
    <div data-testid="design-top" className="roulette-pro-regular-design-top" />
  );

const regularDesign =
  ({ prizesWithText, hideCenterDelimiter }: IRegularDesignProps) =>
  ({ type }: IDesignPluginProps): IDesignPlugin => {
    const prizeItemWidth: number = prizesWithText === true ? 205 : 205;
    const prizeItemHeight: number = prizesWithText === true ? 174 : 174;

    if (typeof type === 'symbol') {
      console.log('just to temporary avoid `type is defined but never used`');
    }

    return {
      topChildren: <TopChildren hideCenterDelimiter={hideCenterDelimiter} />,
      bottomChildren: null,
      prizeItemWidth,
      prizeItemHeight,
      prizeItemRenderFunction: ({ id, image, text }, index) => {
        const withText = prizesWithText === true && text !== undefined;

        return (
          <li
            key={`${id}-${index}`}
            className="roulette-pro-regular-prize-item"
            style={{ width: prizeItemWidth, height: prizeItemHeight }}
          >
            <div
              className={
                withText === true
                  ? 'roulette-pro-regular-prize-item-wrapper'
                  : 'roulette-pro-regular-prize-item-wrapper center'
              }
            >
              <div className="roulette-pro-regular-image-wrapper">
                <img
                  className="roulette-pro-regular-prize-item-image"
                  src={image}
                  alt={withText === true ? `prize item ${text}` : 'prize item'}
                />
              </div>
              {withText === true && (
                <p className="roulette-pro-regular-prize-item-text">{text}</p>
              )}
            </div>
          </li>
        );
      },
      classes: null,
    };
  };

export default regularDesign;
