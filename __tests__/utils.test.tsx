import {calculateSleepScore} from '../utils';

describe('calculateSleepScore tests', () => {
  test('Score should be 100', () => {
    expect(calculateSleepScore(100, 100)).toBe(100);
  });
  test('Score should be 50', () => {
    expect(calculateSleepScore(100, 50)).toBe(50);
  });
  test('Score should round to whole percentage', () => {
    expect(calculateSleepScore(100, 33)).toBe(33);
  });
});
