import React from 'react';

import './Regular.css';

import { IDesignPlugin, IDesignPluginProps } from '../../types';

export interface IRegularDesignProps {
  hideCenterDelimiter?: boolean;
  prizesWithText?: boolean;
}

interface ITopChildrenProps {
  hideCenterDelimiter: IRegularDesignProps['hideCenterDelimiter'];
  type: IDesignPluginProps['type'];
}

const TopChildren = ({ type, hideCenterDelimiter }: ITopChildrenProps) =>
  hideCenterDelimiter !== true ? (
    <div
      data-testid="design-top"
      className={`roulette-pro-regular-design-top ${type}`}
    />
  ) : null;

const regularDesign =
  ({ prizesWithText, hideCenterDelimiter }: IRegularDesignProps) =>
  ({ type }: IDesignPluginProps): IDesignPlugin => {
    const prizeItemWidth: number = 205;
    const prizeItemHeightWithoutText = type === 'vertical' ? 172 : 174;
    const prizeItemHeight: number =
      prizesWithText === true ? 234 : prizeItemHeightWithoutText;
    const prizeItemClassName = `roulette-pro-regular-design-prize-item-${type}`;

    return {
      topChildren: (
        <TopChildren type={type} hideCenterDelimiter={hideCenterDelimiter} />
      ),
      bottomChildren: null,
      prizeItemWidth,
      prizeItemHeight,
      prizeItemRenderFunction: ({ image, text }) => {
        const withText = prizesWithText === true && text !== undefined;

        return (
          <div
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
          </div>
        );
      },
      classes: {
        prizeItem: prizeItemClassName,
      },
    };
  };

export default regularDesign;
