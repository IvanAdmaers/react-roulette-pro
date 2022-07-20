import getPrizeAdditionalOffset from '.';

describe('getPrizeAdditionalOffset', () => {
  it('should return a correct offset', () => {
    const itemSize = 200;
    const itemSizeDevided = itemSize / 2;

    const result = getPrizeAdditionalOffset(itemSize);

    expect(result >= -itemSizeDevided && result <= itemSizeDevided).toBe(true);
  });
});
