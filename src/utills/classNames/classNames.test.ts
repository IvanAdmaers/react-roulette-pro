import classNames from '.';

describe('classNames', () => {
  it('should ignore primitive boolean values', () => {
    expect(classNames(true, false)).toBe('');
  });

  it('keeps object keys with truthy values', () => {
    expect(
      classNames({
        a: true,
        b: false,
        c: 0,
        d: null,
        e: undefined,
        f: 1,
      }),
    ).toBe('a f');
  });

  it('joins arrays of class names and ignore falsy values', () => {
    expect(classNames('a', 0, null, undefined, true, 1, 'b')).toBe('a 1 b');
  });

  it('supports heterogenous arguments', () => {
    expect(classNames({ a: true }, 'b', 0)).toBe('a b');
  });

  it('should be trimmed', () => {
    expect(classNames('', 'b', {}, '')).toBe('b');
  });

  it('returns an empty string for an empty configuration', () => {
    expect(classNames({})).toBe('');
  });

  it('supports an array of class names', () => {
    expect(classNames(['a', 'b'])).toBe('a b');
  });

  it('joins array arguments with string arguments', () => {
    expect(classNames(['a', 'b'], 'c')).toBe('a b c');
    expect(classNames('c', ['a', 'b'])).toBe('c a b');
  });

  it('handles multiple array arguments', () => {
    expect(classNames(['a', 'b'], ['c', 'd'])).toBe('a b c d');
  });

  it('handles arrays that include falsy and true values', () => {
    expect(classNames(['a', 0, null, undefined, false, true, 'b'])).toBe('a b');
  });

  it('handles arrays that include arrays', () => {
    expect(classNames(['a', ['b', 'c']])).toBe('a b c');
  });

  it('handles arrays that include objects', () => {
    expect(classNames(['a', { b: true, c: false }])).toBe('a b');
  });

  it('handles deep array recursion', () => {
    expect(classNames(['a', ['b', ['c', { d: true }]]])).toBe('a b c d');
  });

  it('handles arrays that are empty', () => {
    expect(classNames('a', [])).toBe('a');
  });

  it('handles nested arrays that have empty nested arrays', () => {
    expect(classNames('a', [[]])).toBe('a');
  });

  it('handles all types of truthy and falsy property values as expected', () => {
    expect(
      classNames({
        // falsy:
        null: null,
        emptyString: '',
        noNumber: NaN,
        zero: 0,
        negativeZero: -0,
        false: false,
        // eslint-disable-next-line object-shorthand
        undefined: undefined,

        // truthy (literally anything else):
        nonEmptyString: 'foobar',
        whitespace: ' ',
        function: Object.prototype.toString,
        emptyObject: {},
        nonEmptyObject: { a: 1, b: 2 },
        emptyList: [],
        nonEmptyList: [1, 2, 3],
        greaterZero: 1,
      }),
    ).toBe(
      'nonEmptyString whitespace function emptyObject nonEmptyObject emptyList nonEmptyList greaterZero',
    );
  });

  it('handles toString() method defined on object', () => {
    expect(
      classNames({
        toString: () => 'classFromMethod',
      }),
    ).toBe('classFromMethod');
  });

  it('handles toString() method defined inherited in object', function test1() {
    const Class1 = function c1() {};
    const Class2 = function c2() {};
    Class1.prototype.toString = function propt() {
      return 'classFromMethod';
    };
    Class2.prototype = Object.create(Class1.prototype);

    expect(classNames(new Class2())).toBe('classFromMethod');
  });
});
