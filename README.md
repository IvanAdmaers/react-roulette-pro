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

**The best** React roulette. Focus on customization, optimization and ease of use. Live example - [react-roulette-pro.ivanadmaers.com](https://react-roulette-pro.ivanadmaers.com)

<div align="center">
  <a href="https://react-roulette-pro.ivanadmaers.com">
    <img src="https://i.ibb.co/fxPtcmx/react-roulette-pro-example-gif.gif" alt="React Roulette Pro Example" />
  </a>
</div>

## Features

 - 🚀 Optimization
 - 🎨 Easily customizable
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
import React, { useState } from  'react';

import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';

const prizes = [
  {
    id: '7d24b681-82d9-4fc0-b034-c82f9db11a59',
    image: 'https://i.ibb.co/6Z6Xm9d/good-1.png',
  },
  {
    id: '9da9a287-952f-41bd-8c7a-b488938d7c7a',
    image: 'https://i.ibb.co/T1M05LR/good-2.png',
  },
  {
    id: '04106f3f-f99f-47e4-a62e-3c81fc8cf794',
    image: 'https://i.ibb.co/Qbm8cNL/good-3.png',
  },
  {
    id: '23c551bf-8425-4ffd-b7c2-77c87844f89d',
    image: 'https://i.ibb.co/5Tpfs6W/good-4.png',
  },
  {
    id: 'e4060930-538f-4bf7-ab8e-8d2aa05fba43',
    image: 'https://i.ibb.co/64k8D1c/good-5.png',
  },
];

const reproductionArray = (array = [], length = 0) => [
  ...Array(length)
    .fill('_')
    .map(() => array[Math.floor(Math.random() * array.length)]),
];

const prizeList = [
  ...prizes,
  ...reproductionArray(prizes, prizes.length * 3),
  ...prizes,
  ...reproductionArray(prizes, prizes.length),
];

const App = () => {
  const [start, setStart] = useState(false);

  const prizeIndex = prizes.length * 4 + 2;

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
```

## Props

Where * means required

| **Prop** | **Type** | **Default value** | **Description** |
|--|--|--|--|
| start* | `boolean` | - | Sets when the roulette must start spinning |
| prizes* | `Array` | - | Array of objects. Objects must have required fields: `id` and `image`. A field `text` is optional. If you use your own render function, only you define the required fields. |
| prizeIndex* | `number` | - | The index of a prize that must win |
| onPrizeDefined | `function` | () => null | Function to be called when the roulette stops spinning |
| spinningTime | `number` | 10 | The roulette spinning time in seconds |
| prizeItemRenderFunction | `function` | (item, index, designOptions) => ( {/* JSX */} ) | Function that renders the roulette prize items. Must returns a `li` element that has a `key` attribute |
| topChildren | `null` | - | Children before the roulette prize list |
| bottomChildren | `null` | - | Children after the roulette prize list |
| design | `string` | 'Regular' | The roulette design. Available designs: Regular, GracefulLines |
| designOptions | `object` | {} | Design options. See available options below |
| classes | `object` | {} | Classes that will be applied to the roulette. Available keys: `wrapper` - the roulette wrapper class and `prizeList` - the roulette prize list class |

---

**Design options**

Roulette

* withoutAnimation | `boolean` | Should the roulette animations before spinning

Regular and GracefulLines

* prizeItemWidth | `number` | Prize item width
* prizeItemHeight | `number` | Prize item height

Regular

* hideCenterDelimiter | `boolean` | Should hide a center delimiter

GracefulLines

* hideTopArrow | `boolean` | Should hide a top arrow
* hideSideArrows | `boolean` | Should hide side arrows
* replaceBottomArrowWithTopArrow | `boolean` | Should replace a bottom arrow with a top arrow


## FAQ

🧐 **Where can I find an example of how to use the package?**  
📣 You can find a live example on the site [react-roulette-pro.ivanadmaers.com](https://react-roulette-pro.ivanadmaers.com) and in the [example](https://github.com/IvanAdmaers/react-roulette-pro/tree/main/example) folder.

🧐 **How can I customize the roulette prize items?**  
📣 You can pass a `prizeItemRenderFunction` to render prize items by yourself. If you need to change prize items width pass the option `prizeItemWidth` to `designOptions`. If you need to change prize items height pass the options `prizeItemHeight` to `designOptions`.
```jsx
designOptions={{
  prizeItemWidth: 200,
  prizeItemHeight: 300,
}}
```

🧐 **How can I add my own CSS styles?**  
📣 If you need to set a custom className to the roulette use `styles` prop. To set a className to the roulette wrapper set the key `wrapper` with a className as a value to the `styles` prop. The same to set a custom className for prize list element but use the prop `plizeList`.
```jsx
styles={{
  wrapper: 'className-for-wrapper',
  plizeList: 'className-for-plize-list',
}}
```

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
 - react >=16.8.0
 - react-dom >=16.8.0
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

[MIT](LICENSE.md)

Copyright (c) 2021-present, Ivan Admaers