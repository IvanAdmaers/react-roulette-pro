import React, { useState, useEffect, useCallback, Fragment } from 'react';

import RoulettePro from 'react-roulette-pro';

import classes from './AdvancedUsage.module.css';

import reproductionArray from './utills/reproductionArray';
import getRandomIntInRange from './utills/getRandomIntInRange';

const goods = [
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

const getPrizes = () => [
  ...goods,
  ...reproductionArray(goods, 10),
  ...reproductionArray(goods, 10),
  ...goods,
  ...reproductionArray(goods, 10),
];

const getRandomGoodIndex = () => getRandomIntInRange(0, goods.length - 1);
const getPrizeOffset = (goodIndex = 0) => 10 + 10 + 10 + goodIndex;

const getPrizeIndex = () => {
  const randomGoodIndex = getRandomGoodIndex();
  const getRandomGoodOffset = getPrizeOffset(randomGoodIndex);

  return getRandomGoodOffset;
};

const prizes = getPrizes();

const prizeRenderFunction = ({ image, text }, index) => (
  <Fragment>
    <div className={classes['prize-image-wrapper']}>
      <img className={classes['prize-image']} src={image} alt={text} />
    </div>
    <div className={classes['prize-content']}>
      <p className={classes['prize-text']}>{text}</p>
      {(index === 3 || Math.random() > 0.8) && (
        <p className={classes['super-prize']}>Super Prize</p>
      )}
    </div>
  </Fragment>
);

const AdvancedUsage = () => {
  const [start, setStart] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winText, setWinText] = useState('');

  useEffect(() => {
    if (!prizeIndex) {
      return;
    }

    setStart(true);
  }, [prizeIndex]);

  useEffect(() => {
    if (!prizeIndex || spinning) {
      return;
    }

    const { text } = prizes[prizeIndex];

    setWinText(`🎉 Congratulations! You won ${text} 🎉`);
  }, [prizeIndex, spinning]);

  const handleStart = () => {
    const currentPrizeIndex = getPrizeIndex();

    setStart(false);
    setPrizeIndex(currentPrizeIndex);
    setSpinning(true);
    setWinText('');
  };

  const handlePrizeDefined = useCallback(() => {
    console.log('🥳 Prize defined! 🥳');

    setSpinning(false);
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Advanced usage</h1>
      <RoulettePro
        prizes={prizes}
        prizeIndex={prizeIndex}
        start={start}
        spinningTime={2}
        onPrizeDefined={handlePrizeDefined}
        prizeRenderFunction={prizeRenderFunction}
      />
      <div style={{ textAlign: 'center', marginTop: 5 }}>
        <button onClick={handleStart} disabled={spinning}>
          Start
        </button>
        {winText && <div>{winText}</div>}
      </div>
    </div>
  );
};

export default AdvancedUsage;
