import React from 'react';
import { render, screen } from '@testing-library/react';

import RoulettePro from '../../components/Roulette';

it('should render prize items with a default width', () => {
  const [defaultWidth] = [205];

  render(
    <RoulettePro
      start={false}
      prizeIndex={0}
      design="Regular"
      prizes={[{ id: 1, image: 'file.webp' }]}
    />,
  );

  const prizeItems = screen.getAllByRole('listitem');

  prizeItems.forEach((item) => {
    expect(item).toHaveStyle(`width: ${defaultWidth}px;`);
  });
});

it('should render prize items with a custom width and height', () => {
  const [customWidth, customHeight] = [255, 275];

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

it('should not render a center delimiter when the specific option passed', () => {
  render(
    <RoulettePro
      start={false}
      prizeIndex={0}
      design="Regular"
      prizes={[]}
      designOptions={{ hideCenterDelimiter: true }}
    />,
  );

  expect(screen.queryByTestId('design-top')).not.toBeInTheDocument();
});
