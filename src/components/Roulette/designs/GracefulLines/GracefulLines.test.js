import React from 'react';
import { render, screen } from '@testing-library/react';

import RoulettePro from '../..';

it('should render a top design element', () => {
  render(
    <RoulettePro
      start={false}
      prizeIndex={0}
      design="GracefulLines"
      prizes={[]}
    />,
  );

  expect(screen.getByTestId('design-top')).toBeInTheDocument();
});

it('should render a top design element with children', () => {
  render(
    <RoulettePro
      start={false}
      prizeIndex={0}
      design="GracefulLines"
      topChildren={<div>Hello</div>}
      prizes={[]}
    />,
  );

  expect(screen.getByTestId('design-top')).toBeInTheDocument();
  expect(screen.getByText(/hello/i)).toBeInTheDocument();
});

it('should render a bottom design element', () => {
  render(
    <RoulettePro
      start={false}
      prizeIndex={0}
      design="GracefulLines"
      prizes={[]}
    />,
  );

  expect(screen.getByTestId('design-bottom')).toBeInTheDocument();
});

it('should render a bottom design element with children', () => {
  render(
    <RoulettePro
      start={false}
      prizeIndex={0}
      design="GracefulLines"
      bottomChildren={<div>Hello</div>}
      prizes={[]}
    />,
  );

  expect(screen.getByTestId('design-bottom')).toBeInTheDocument();
  expect(screen.getByText(/hello/i)).toBeInTheDocument();
});

it('should not render side arrows when the specific option passed', () => {
  render(
    <RoulettePro
      start={false}
      prizeIndex={0}
      design="GracefulLines"
      designOptions={{ hideSideArrows: true }}
      prizes={[]}
    />,
  );

  expect(screen.queryByTestId('design-left-arrow')).not.toBeInTheDocument();
  expect(screen.queryByTestId('design-right-arrow')).not.toBeInTheDocument();
});

it('should render a top arrow instead of bottom arrow', () => {
  render(
    <RoulettePro
      start={false}
      prizeIndex={0}
      design="GracefulLines"
      prizes={[]}
      designOptions={{ replaceBottomArrowWithTopArrow: true }}
    />,
  );

  expect(
    screen.getByTestId('design-replace-bottom-line-with-top-line'),
  ).toBeInTheDocument();
});

it('should not render a top design element when the specific option passed', () => {
  render(
    <RoulettePro
      start={false}
      prizeIndex={0}
      design="GracefulLines"
      prizes={[]}
      designOptions={{ hideTopArrow: true }}
    />,
  );

  expect(screen.queryByTestId('design-top')).not.toBeInTheDocument();
});

it('should render prize items with a default width and height', () => {
  const [defaultWidth, defaultHeight] = [170, 150];

  render(
    <RoulettePro
      start={false}
      prizeIndex={0}
      design="GracefulLines"
      prizes={[{ id: 1, image: 'file.webp' }]}
    />,
  );

  const prizeItems = screen.getAllByRole('listitem');

  prizeItems.forEach((item) => {
    expect(item).toHaveStyle(
      `width: ${defaultWidth}px; height: ${defaultHeight}px`,
    );
  });
});

it('should render prize items with a custom width and height', () => {
  const [customWidth, customHeight] = [200, 180];

  render(
    <RoulettePro
      start={false}
      prizeIndex={0}
      design="GracefulLines"
      prizes={[{ id: 1, image: 'file.webp' }]}
      designOptions={{
        prizeItemWidth: customWidth,
        prizeItemHeight: customHeight,
      }}
    />,
  );

  const prizeItems = screen.getAllByRole('listitem');

  prizeItems.forEach((item) => {
    expect(item).toHaveStyle(
      `width: ${customWidth}px; height: ${customHeight}px`,
    );
  });
});
