import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import './GracefulLines.css';

export const wrapperClassName =
  'roulette-pro-graceful-lines-design-wrapper-overrides';

export const GracefulLinesTop = ({ hideTopArrow }) =>
  !hideTopArrow && (
    <div
      data-testid="design-top"
      className="roulette-pro-graceful-lines-design-top"
    />
  );

export const GracefulLinesBottom = ({
  hideSideArrows,
  replaceBottomArrowWithTopArrow,
}) => (
  <div data-testid="design-bottom">
    {!replaceBottomArrowWithTopArrow ? (
      <div className="roulette-pro-graceful-lines-design-bottom-line" />
    ) : (
      <div
        data-testid="design-replace-bottom-line-with-top-line"
        className="roulette-pro-graceful-lines-design-top down"
      />
    )}
    {!hideSideArrows && (
      <Fragment>
        <div
          data-testid="design-left-arrow"
          className="roulette-pro-graceful-lines-design-bottom-left-line"
        />
        <div
          data-testid="design-right-arrow"
          className="roulette-pro-graceful-lines-design-bottom-right-line"
        />
      </Fragment>
    )}
  </div>
);

GracefulLinesBottom.propTypes = {
  hideSideArrows: PropTypes.bool,
  replaceBottomArrowWithTopArrow: PropTypes.bool,
};

GracefulLinesBottom.defaultProps = {
  hideSideArrows: false,
  replaceBottomArrowWithTopArrow: false,
};

export const defaultPrizeItemWidth = 170;

export const prizeItemRenderFunction = (
  { id, image, text },
  index,
  {
    prizeItemWidth: width = defaultPrizeItemWidth,
    prizeItemHeight: height = 150,
  },
) => (
  <li
    key={`${id}-${index}`}
    data-testid="graceful-design-prize-item"
    className="roulette-pro-graceful-lines-prize-item"
    style={{ width, height }}
  >
    <div className="roulette-pro-graceful-lines-prize-item-content">
      <img
        className="roulette-pro-graceful-lines-prize-item-content-image"
        src={image}
        alt={text ? `prize item ${text}` : 'prize item'}
      />
      {text && (
        <p className="roulette-pro-graceful-lines-prize-item-content-text">
          {text}
        </p>
      )}
    </div>
  </li>
);
