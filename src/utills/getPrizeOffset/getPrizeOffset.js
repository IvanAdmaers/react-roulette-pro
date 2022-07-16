/**
 * This function gets an offset from container start to container center
 *
 * @param {number} itemWidth - Item width
 * @param {number} prizeIndex - Prize index
 * @param {number} containerCenter - Container center
 * @returns {number} Prize offset
 */
const getPrizeOffset = (itemWidth = 0, prizeIndex = 0, containerCenter = 0) =>
  itemWidth * prizeIndex - (containerCenter - itemWidth / 2);

export default getPrizeOffset;
