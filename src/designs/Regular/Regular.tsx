import React from 'react';

import './Regular.css';

export type RegularTopType = {
  hideCenterDelimiter?: boolean;
};

export const RegularTop = ({ hideCenterDelimiter }: RegularTopType) =>
  !hideCenterDelimiter && (
    <div data-testid="design-top" className="roulette-pro-regular-design-top" />
  );

RegularTop.defaultProps = {
  hideCenterDelimiter: false,
};

export const RegularBottom = () => null;

export const defaultPrizeItemWidth: number = 205;

export const prizeItemRenderFunction = (
  { id, image, text },
  index,
  { width = defaultPrizeItemWidth, height },
) => (
  <li
    key={`${id}-${index}`}
    data-testid="graceful-design-prize-item"
    className="roulette-pro-regular-prize-item"
    style={{ width, height }}
  >
    <div
      className={
        text
          ? 'roulette-pro-regular-prize-item-wrapper'
          : 'roulette-pro-regular-prize-item-wrapper center'
      }
    >
      <div className="roulette-pro-regular-image-wrapper">
        <img
          className="roulette-pro-regular-prize-item-image"
          src={image}
          alt={text ? `prize item ${text}` : 'prize item'}
        />
      </div>
      {text && <p className="roulette-pro-regular-prize-item-text">{text}</p>}
    </div>
  </li>
);
