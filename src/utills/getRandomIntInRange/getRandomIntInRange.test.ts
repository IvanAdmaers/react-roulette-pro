import getRandomIntInRange from '.';

describe('getRandomIntInRange', () => {
  it('should return a number that not less than `min` and not greather than `max`', () => {
    const min = 1;
    const max = 5;

    const number = getRandomIntInRange(min, max);

    expect(number >= min && number <= max).toBe(true);
  });
});
