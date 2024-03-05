# React Roulette Pro

<div align="center">
  <a href="https://www.npmjs.com/package/react-roulette-pro">
    <img alt="npm version" src="https://img.shields.io/npm/v/react-roulette-pro" />
  </a>
  <a href="https://www.npmjs.com/package/react-roulette-pro">
    <img alt="npm downloads" src="https://img.shields.io/npm/dm/react-roulette-pro" />
  </a>
    <a href="https://www.npmjs.com/package/react-roulette-pro">
    <img alt="license" src="https://img.shields.io/npm/l/react-roulette-pro" />
  </a>
</div>

**The best** React roulette. Focus on optimization, customization and ease of use. Live example - [react-roulette-pro.ivanadmaers.com](https://react-roulette-pro.ivanadmaers.com)

> React Roulette Pro 3.0 realised! See [these release notes](./docs/releases/3.x/3.0.0.md) and [this migration guide](./docs/migrations/2.x_to_3.x.md)

<div align="center">
  <a href="https://react-roulette-pro.ivanadmaers.com">
    <img src="https://i.ibb.co/fxPtcmx/react-roulette-pro-example-gif.gif" alt="React Roulette Pro Example" />
  </a>
</div>

## Features

 - 🚀 Optimization
 - 🎨 Easily customizable
 - 🔌 Design plugins architecture **[🔥NEW🔥]**
 - 🔫 Two types: horizontal and vertical **[🔥NEW🔥]**
 - 💪 Powerful
 - ✅ Ease of use
 - 📝 MIT license 
 - 🔥 Just cool
 - 📦 Lightweight
 - 🔧 Well-tested
 - 🎉 NextJS, GatsbyJS and RemixJS support

## Installation

```bash
# Via npm:
npm i react-roulette-pro

# Via yarn:
yarn add react-roulette-pro
```

## Usage

```jsx
import { useState } from 'react';

import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';

const prizes = [
  {
    image: 'https://i.ibb.co/6Z6Xm9d/good-1.png',
  },
  {
    image: 'https://i.ibb.co/T1M05LR/good-2.png',
  },
  {
    image: 'https://i.ibb.co/Qbm8cNL/good-3.png',
  },
  {
    image: 'https://i.ibb.co/5Tpfs6W/good-4.png',
  },
  {
    image: 'https://i.ibb.co/64k8D1c/good-5.png',
  },
];

const winPrizeIndex = 0;

const reproductionArray = (array = [], length = 0) => [
  ...Array(length)
    .fill('_')
    .map(() => array[Math.floor(Math.random() * array.length)]),
];

const reproducedPrizeList = [
  ...prizes,
  ...reproductionArray(prizes, prizes.length * 3),
  ...prizes,
  ...reproductionArray(prizes, prizes.length),
];

const generateId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}`;

const prizeList = reproducedPrizeList.map((prize) => ({
  ...prize,
  id: typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : generateId(),
}));

const App = () => {
  const [start, setStart] = useState(false);

  const prizeIndex = prizes.length * 4 + winPrizeIndex;

  const handleStart = () => {
    setStart((prevState) => !prevState);
  };

  const handlePrizeDefined = () => {
    console.log('🥳 Prize defined! 🥳');
  };

  return (
    <>
      <RoulettePro
        prizes={prizeList}
        prizeIndex={prizeIndex}
        start={start}
        onPrizeDefined={handlePrizeDefined}
      />
      <button onClick={handleStart}>Start</button>
    </>
  );
};

export default App;
```

## Props

Where * means required

| **Prop** | **Type** | **Default value** | **Description** |
|--|--|--|--|
| start* | `boolean` | - | Sets when the roulette must start spinning |
| prizes* | `Array` | - | Array of objects. Objects must have required fields: `id` and `image`. A field `text` is optional. Each prize must have a unique `id`. Make sure you pass enough prize items for correct spinning. See an example in the `Usage` section above. |
| prizeIndex* | `number` | - | The index of a prize that will win |
| type | `string` | horizontal | The roulette type. Available values: horizontal, vertical |
| onPrizeDefined | `Function` | () => {} | Function to be called when the roulette stops spinning |
| spinningTime | `number` | 10 | The roulette spinning time in seconds |
| prizeItemRenderFunction | `(item) => JSX` | - | Function that renders the roulette prize items |
| topChildren | `node` | - | Children before the roulette prize list |
| bottomChildren | `node` | - | Children after the roulette prize list |
| designPlugin | `(props) => ({})` | - | Design plugin for the roulette. If not setted the roulette will use its default built-in design. See [this guide](./docs/guides/how_to_create_your_own_design_plugin.md) to know how to create your own design plugin |
| defaultDesignOptions | `object` | {} | Default design options. Available options: `hideCenterDelimiter` - optional, boolean type and `prizesWithText` - optional, boolean type |
| classes | `object` | {} | Classes that will be applied to the roulette. Available keys: `wrapper` - the roulette wrapper class, `prizeListWrapper` - the roulette prize list class and `prizeItem` - class for prize items |
| soundWhileSpinning | `string` | - | Path to a sound file that will be played while the roulette spinning [May be deprecated in the future] |
| options | `object` | {} | The roulette options. Available options: `stopInCenter` - optional, boolean type and `withoutAnimation` - optional, boolean type |
| transitionFunction | `string` | cubic-bezier(0.0125, 0.1, 0.1, 1) | The roulette animation transition function |

---

## Design plugins

* [rrp-graceful-lines-plugin](https://github.com/IvanAdmaers/rrp-graceful-lines-plugin)

## FAQ

🧐 **Where can I find an example of how to use the package?**  
📣 You can find a live example on this site - [react-roulette-pro.ivanadmaers.com](https://react-roulette-pro.ivanadmaers.com) and in the [example](https://github.com/IvanAdmaers/react-roulette-pro/tree/main/example) folder.

🧐 **How can I customize the roulette?**  
📣 First, you can pass a `prizeItemRenderFunction` to render prize items by yourself. Second, you can use a specific design plugin. Third, you can pass your specific classes via `classes` prop.
Avoid to rewrite the roulette and its plugins default styles.

🧐 **Is it possible to use this package with SSR?**  
📣 Of course! This package does not use a global object *window*. You can use this package without any problems. And I'd like to recommend you to use *dynamic* in NextJS to decrease your bundle size and render it only on client side.
```javascript
import dynamic from 'next/dynamic';

const RoulettePro = dynamic(() => import('react-roulette-pro'), {
  ssr: false,
});
```
🧐 **What version of React does this package support?**  
📣 Your versions should be:
 - react >=17.0.0
 - react-dom >=17.0.0
 - NodeJS >=10
 
🧐 **Are pull requests welcome?**  
📣 Any ideas to improve this package are very welcome!

## How to bootstrap the project locally

1. Clone the project

2. Run

```bash
npm ci i

npm start
```

The last command runs webpack to compile our package to a dist folder

3. cd example/  

4. Run

```bash
npm ci i

npm start
```

The last command runs webpack dev server  

5. Enjoy the magic!  

![enjoying the magic](https://media.giphy.com/media/olAik8MhYOB9K/giphy.gif)

## License

[MIT](./LICENSE.md)

Copyright (c) 2021-present, Ivan Admaers