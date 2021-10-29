# React roulette pro

<div align="center">
  <a href="https://www.npmjs.com/package/react-roulette-pro">
    <img alt="npm version" src="https://img.shields.io/npm/v/react-roulette-pro" />
  </a>
  <a href="https://www.npmjs.com/package/react-roulette-pro">
    <img alt="npm downloads" src="https://img.shields.io/npm/dm/react-roulette-pro" />
  </a>
</div>

**The best** react roulette. 💪 Powerful  ⚙️ multifunctional 🚀 optimized implementation

![React Roulette Pro Example](https://i.ibb.co/8KNMmnP/react-roulette-pro-example.gif)

## Features

🚀 Optimization 
⚙️ Multifunctional 
💪 Powerful 
✅ Ease to use 
📝MIT license 
🔥Just cool 
📦 Lightweight

## Installation

```bash
# If you use npm:
npm i react-roulette-pro

# Or if you use yarn:
yarn add react-roulette-pro
```

## Usage

```jsx
import React, { useState } from  'react';

import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';

const goods = [
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
    text: 'Apple MacBook Pro M1 13 256GB (should win)',
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
];

const arrayReproduction = (array = [], length = 0) => [
  ...Array(length)
    .fill('_')
    .map(() => array[Math.floor(Math.random() * array.length)]),
];

const App = () => {
  const [start, setStart] = useState(false);

  const prizes = [
    ...goods,
    ...arrayReproduction(goods, goods.length * 3),
    ...goods,
  ];

  const prizeIndex = goods.length * 4 + 2;

  const handleStart = () => setStart(true);

  return (
    <>
      <RoulettePro prizes={prizes} prizeIndex={prizeIndex} start={start} />
      <button onClick={handleStart}>Start</button>
    </>
  );
};
```

## Props

Where * means required

| **Prop** | **Type** | **Default value** | **Description** |
|--|--|--|--|
| prizes* | `Array` | - | Array of object. Object must have required fields: `id, image, text` |
| prizeIndex* | `number` | - | It sets the winning prize. in the range 0 and prizes.length - 1 |
| start* | `boolean` | - | It sets when the roulette must start spinning  |
| onPrizeDefined | `function` | () => null | It function will be called when the roulette stops spinning |
| debug | `boolean` | false | When the option is set to true, you can see the roulette logs in a browser console. For example, when initializing the roulette, when starting a spin, or when stopping a spin, etc. |

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2021-present, Ivan Admaers