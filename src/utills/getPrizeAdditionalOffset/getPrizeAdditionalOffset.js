import getRandomIntInRange from '../getRandomIntInRange';

const getPrizeAdditionalOffset = (itemWidth = 0) => {
  const center = itemWidth / 2;

  const randomOffset = getRandomIntInRange(-center + 1, center - 1);

  return randomOffset;
};

export default getPrizeAdditionalOffset;
