import React from 'react';
import { render, screen } from '@testing-library/react';

import RoulettePro from '.';

const prizes = [
  {
    id: 'a44c728d-8a0e-48ca-a963-3d5ce6dd41b0',
    image: 'https://i.ibb.co/ZLHZgKf/good-0.png',
    text: 'Monoblock Apple iMac 27',
  },
  {
    id: '7d24b681-82d9-4fc0-b034-c82f9db11a59',
    image: 'https://i.ibb.co/6Z6Xm9d/good-1.png',
    text: 'Apple MacBook Pro 13 Late 2020',
  },
  {
    id: '9da9a287-952f-41bd-8c7a-b488938d7c7a',
    image: 'https://i.ibb.co/T1M05LR/good-2.png',
    text: 'Apple iPhone 13 Pro Max 512GB',
  },
  {
    id: '04106f3f-f99f-47e4-a62e-3c81fc8cf794',
    image: 'https://i.ibb.co/Qbm8cNL/good-3.png',
    text: 'Apple MacBook Pro M1 13 256GB',
  },
  {
    id: '23c551bf-8425-4ffd-b7c2-77c87844f89d',
    image: 'https://i.ibb.co/5Tpfs6W/good-4.png',
    text: 'MacBook Air 13',
  },
  {
    id: 'e4060930-538f-4bf7-ab8e-8d2aa05fba43',
    image: 'https://i.ibb.co/64k8D1c/good-5.png',
    text: 'Apple iPad Pro 12.9',
  },
  {
    id: 'fb121804-e4f6-4fce-bdd6-1e3189172f37',
    image: 'https://i.ibb.co/TLjjsG3/good-6.png',
    text: 'Apple AirPods Max',
  },
  {
    id: '26ee933e-0858-481d-afe8-b30d3829242a',
    image: 'https://i.ibb.co/943n9PQ/good-7.png',
    text: 'Apple iPad Pro 12.9',
  },
  {
    id: 'c769c2b1-df6e-4e6e-8985-53b531527b35',
    image: 'https://i.ibb.co/HVpYpsH/good-8.png',
    text: 'Apple Watch Series 6 44mm',
  },
  {
    id: 'bd9f86a3-9a72-4ba3-a071-3ea9cbc87cc1',
    image: 'https://i.ibb.co/BnmJvZT/good-9.png',
    text: 'Apple Smart Keyboard iPad Pro 12.9',
  },
];

it('should render a top children', () => {
  render(
    <RoulettePro
      start={false}
      prizeIndex={0}
      topChildren={<p>Hello, world!</p>}
      prizes={[]}
    />,
  );

  expect(screen.getByText(/hello, world!/i)).toBeInTheDocument();
});

it('should render a bottom children', () => {
  render(
    <RoulettePro
      start={false}
      prizeIndex={0}
      bottomChildren={<p>It is already 2022</p>}
      prizes={[]}
    />,
  );

  expect(screen.getByText(/it is already 2022/i)).toBeInTheDocument();
});

it('should render using a custom prize items function', () => {
  const renderFunction = jest.fn();
  const defaultDesignOptions = {};

  render(
    <RoulettePro
      start={false}
      prizeIndex={0}
      prizes={prizes}
      prizeItemRenderFunction={renderFunction}
      defaultDesignOptions={defaultDesignOptions}
    />,
  );

  prizes.forEach((item, index) => {
    expect(renderFunction).toHaveBeenNthCalledWith(index + 1, item);
  });
});

it('should not animate when the specific option passed', () => {
  render(
    <RoulettePro
      start={false}
      prizeIndex={0}
      prizes={[]}
      options={{ withoutAnimation: true }}
    />,
  );

  expect(screen.getByRole('list')).not.toHaveClass('with-animation');
});

describe('roulette spinning', () => {
  jest.useFakeTimers();

  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

  beforeAll(() => {
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 900,
      height: 200,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      x: -1,
      y: -1,
      toJSON: () => null,
    }));
  });

  afterAll(() => {
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });

  it('should not add animation class when the roulette is spinning', () => {
    render(<RoulettePro start prizeIndex={0} prizes={[]} />);

    expect(screen.getByRole('list')).not.toHaveClass('with-animation');
  });

  it('should called a `onPrizeDefined` function once', () => {
    const onPrizeDefined = jest.fn();

    render(
      <RoulettePro
        start
        prizeIndex={0}
        prizes={[]}
        spinningTime={10}
        onPrizeDefined={onPrizeDefined}
      />,
    );

    jest.advanceTimersByTime(10000);

    expect(onPrizeDefined).toHaveBeenCalledTimes(1);
  });
});

it('should add a custom className to the roulette wrapper', () => {
  const wrapperClassName = 'lol-test-for-wrapper';

  const { container } = render(
    <RoulettePro
      start={false}
      prizeIndex={0}
      prizes={[]}
      classes={{ wrapper: wrapperClassName }}
    />,
  );

  expect(
    (container.firstChild as HTMLElement).classList.contains(wrapperClassName),
  ).toBeTruthy();
});

it('should add a custom className to the roulette prize list', () => {
  const prizeListClassName = 'lol-test-for-prize-list';

  render(
    <RoulettePro
      start={false}
      prizeIndex={0}
      prizes={[]}
      classes={{ prizeListWrapper: prizeListClassName }}
    />,
  );

  expect(
    screen.getByRole('list').classList.contains(prizeListClassName),
  ).toBeTruthy();
});
