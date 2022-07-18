/**
 * This function gets an offset from container start to container center
 */
const getPrizeOffset = (
  itemSize: number,
  prizeIndex: number,
  containerCenter: number,
) => itemSize * prizeIndex - (containerCenter - itemSize / 2);

export default getPrizeOffset;
