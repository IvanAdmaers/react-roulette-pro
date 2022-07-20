import getRandomIntInRange from '../getRandomIntInRange';

const getPrizeAdditionalOffset = (itemSize: number): number => {
  const center = itemSize / 2;

  const randomOffset = getRandomIntInRange(-center + 1, center - 1);

  return randomOffset;
};

export default getPrizeAdditionalOffset;
