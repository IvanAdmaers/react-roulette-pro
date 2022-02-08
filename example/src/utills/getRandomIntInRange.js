/**
 * This function gets a random integer between two values, inclusive
 *
 * @param {number} min - Min number
 * @param {number} max - Max number
 * @returns {number} Random number in a range
 */
const getRandomIntInRange = (min = 0, max = 0) => {
  const minNumber = Math.ceil(min);
  const maxNumber = Math.floor(max);

  return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
};

export default getRandomIntInRange;
