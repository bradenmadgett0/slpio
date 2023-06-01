import styled from '@emotion/native';
import {Picker} from '@react-native-picker/picker';
import React, {useMemo} from 'react';

interface DurationSelectorProps {
  increment: number;
  value?: number;
  onValueChange: (itemValue: number | undefined) => void;
  maximumDuration?: number;
  label?: string;
}

const generateIncrements = (increment: number, maximum: number) => {
  let currentIncrement = 0;
  const entries: Array<number | undefined> = [undefined];
  while (currentIncrement <= maximum) {
    entries.push(currentIncrement);
    currentIncrement += increment;
  }
  return entries;
};

const DurationPickerLabel = styled.Text`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const DurationSelector = ({
  increment,
  value,
  onValueChange,
  maximumDuration,
  label,
}: DurationSelectorProps) => {
  const increments = useMemo(
    () => generateIncrements(increment, maximumDuration || 24 * 60),
    [increment, maximumDuration],
  );

  return (
    <>
      {label && <DurationPickerLabel>{label}</DurationPickerLabel>}
      <Picker
        style={{
          backgroundColor: 'midnightblue',
          borderRadius: 8,
          marginBottom: 24,
        }}
        itemStyle={{color: 'white', fontWeight: '600'}}
        selectedValue={value}
        onValueChange={(itemValue: number | undefined) =>
          onValueChange(itemValue)
        }>
        {increments.map(totalMinutes => {
          if (totalMinutes === undefined) {
            return (
              <Picker.Item
                key="default"
                label="Please select an option..."
                value={totalMinutes}
              />
            );
          }
          const hours = Math.floor(totalMinutes / 60);
          const minutes = totalMinutes % 60;
          return (
            <Picker.Item
              key={totalMinutes}
              label={`${hours} ${hours !== 1 ? 'hours' : 'hour'} ${
                minutes ? minutes + ' mins' : ''
              }`}
              value={totalMinutes}
            />
          );
        })}
      </Picker>
    </>
  );
};

export default DurationSelector;
