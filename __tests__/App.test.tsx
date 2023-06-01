import React from 'react';
import App from '../App';
import {fireEvent, render} from '@testing-library/react-native';

const mockCalculate = jest.fn();

jest.mock('../utils', () => {
  return {
    calculateSleepScore: () => mockCalculate(),
  };
});

describe('App tests', () => {
  test('App should render with default values and disabled button', () => {
    const {getByText} = render(<App />);
    getByText('Duration in bed');
    getByText('Duration asleep');
    const calculateButton = getByText('Calculate');
    fireEvent.press(calculateButton);
    expect(mockCalculate).toHaveBeenCalledTimes(0);
  });
});
