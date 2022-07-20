/**
 * This function gets a random integer between two values, inclusive
 */
const getRandomIntInRange = (min: number, max: number): number => {
  const minNumber = Math.ceil(min);
  const maxNumber = Math.floor(max);

  return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
};

export default getRandomIntInRange;
