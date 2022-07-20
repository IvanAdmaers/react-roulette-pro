import getPrizeOffset from '.';

describe('getPrizeOffset', () => {
  it('should return a correct offset', () => {
    const itemSize = 100;
    const prizeIndex = 5;
    const containerCenter = 500;
    const offset = 50;

    expect(getPrizeOffset(itemSize, prizeIndex, containerCenter)).toBe(offset);
  });
});
