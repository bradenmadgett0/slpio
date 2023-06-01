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
    const {getByTestId, getByText} = render(<App />);
    getByText('Duration in bed');
    getByTestId('Duration in bed_picker');
    getByText('Duration asleep');
    getByTestId('Duration asleep_picker');
    const calculateButton = getByText('Calculate');
    fireEvent.press(calculateButton);
    expect(mockCalculate).toHaveBeenCalledTimes(0);
  });
});
