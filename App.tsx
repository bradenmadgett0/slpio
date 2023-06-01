import React, {useState} from 'react';
import {Button, useColorScheme} from 'react-native';
import styled from '@emotion/native';
import DurationSelector from './components/DurationSelector';

const MainView = styled.SafeAreaView<{isDarkMode: boolean}>`
  background-color: ${props => (props.isDarkMode ? 'black' : 'white')};
`;

const StyledStatusBar = styled.StatusBar<{isDarkMode: boolean}>`
  background-color: ${props => (props.isDarkMode ? 'black' : 'white')};
`;

const Content = styled.View`
  padding: 24px;
`;

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [inBedDuration, setInBedDuration] = useState<number | undefined>();
  const [asleepDuration, setAsleepDuration] = useState<number | undefined>();

  return (
    <MainView isDarkMode={isDarkMode}>
      <StyledStatusBar
        isDarkMode={isDarkMode}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <Content>
        <DurationSelector
          label="Duration in bed"
          increment={30}
          value={inBedDuration}
          onValueChange={itemValue => {
            console.log(itemValue);
            setInBedDuration(itemValue);
          }}
        />
        <DurationSelector
          label="Duration asleep"
          increment={30}
          maximumDuration={inBedDuration}
          value={asleepDuration}
          onValueChange={itemValue => setAsleepDuration(itemValue)}
        />
        <Button
          title="Calculate"
          disabled={inBedDuration == null || asleepDuration == null}
        />
      </Content>
    </MainView>
  );
}

export default App;
