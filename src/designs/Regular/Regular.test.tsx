import React from 'react';
import { render, screen } from '@testing-library/react';

import RoulettePro from '../../components/Roulette';

import regularDesign from '.';

const { prizeItemWidth, prizeItemHeight } = regularDesign({})({
  type: 'horizontal',
});

describe('regularDesign', () => {
  it('should render prize items with a default width and height', () => {
    render(
      <RoulettePro
        start={false}
        prizeIndex={0}
        prizes={[{ id: 1, image: 'file.webp' }]}
      />,
    );

    const prizeItems = screen.getAllByRole('listitem');

    prizeItems.forEach((item) => {
      expect(item.firstChild).toHaveStyle(`width: ${prizeItemWidth}px;`);
      expect(item.firstChild).toHaveStyle(`height: ${prizeItemHeight}px;`);
    });
  });

  it('should not render a center delimiter when the specific option passed', () => {
    render(
      <RoulettePro
        start={false}
        prizeIndex={0}
        prizes={[]}
        defaultDesignOptions={{ hideCenterDelimiter: true }}
      />,
    );

    expect(screen.queryByRole('design-top')).not.toBeInTheDocument();
  });

  it('should render a center delimiter when the specific option passed', () => {
    render(<RoulettePro start={false} prizeIndex={0} prizes={[]} />);

    expect(screen.queryByRole('design-top')).not.toBeInTheDocument();
  });
});

// it('should render prize items with a custom width and height', () => {
//   const [customWidth, customHeight] = [255, 275];

//   render(
//     <RoulettePro
//       start={false}
//       prizeIndex={0}
//       design="GracefulLines"
//       prizes={[{ id: 1, image: 'file.webp' }]}
//       designOptions={{
//         prizeItemWidth: customWidth,
//         prizeItemHeight: customHeight,
//       }}
//     />,
//   );

//   const prizeItems = screen.getAllByRole('listitem');

//   prizeItems.forEach((item) => {
//     expect(item).toHaveStyle(
//       `width: ${customWidth}px; height: ${customHeight}px`,
//     );
//   });
// });
