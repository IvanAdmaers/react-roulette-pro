import React, { useState, useCallback } from 'react';

import RoulettePro from 'react-roulette-pro';

import reproductionArray from './utills/reproductionArray';

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

const prizes = [
  ...goods,
  ...reproductionArray(goods, goods.length * 3),
  ...goods,
];

const SimpleUsage = () => {
  const [start, setStart] = useState(false);

  const prizeIndex = goods.length * 4 + 2;

  const handleStart = () => setStart(true);

  const handlePrizeDefined = useCallback(() => {
    console.log('🥳 Prize defined! 🥳');
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Simple usage</h1>
      <RoulettePro
        prizes={prizes}
        prizeIndex={prizeIndex}
        start={start}
        onPrizeDefined={handlePrizeDefined}
      />
      <div style={{ textAlign: 'center', marginTop: 5 }}>
        <button onClick={handleStart}>Start</button>
      </div>
    </div>
  );
};

export default SimpleUsage;
