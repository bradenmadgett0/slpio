import React, {useState} from 'react';
import {Button, useColorScheme} from 'react-native';
import styled from '@emotion/native';
import DurationSelector from './components/DurationSelector';
import {calculateSleepScore} from './utils';
import {saveScore} from './services';

const MainView = styled.SafeAreaView<{isDarkMode: boolean}>`
  background-color: ${props => (props.isDarkMode ? 'black' : 'white')};
`;

const StyledStatusBar = styled.StatusBar<{isDarkMode: boolean}>`
  background-color: ${props => (props.isDarkMode ? 'black' : 'white')};
`;

const Content = styled.View`
  padding: 24px;
`;

const ScoreText = styled.Text`
  font-size: 24px;
`;

const ErrorText = styled.Text`
  font-size: 24px;
  color: red;
`;

const calculateAndSendSleepScore = async (
  durationInBed: number,
  durationAsleep: number,
): Promise<number> => {
  const sleepScore = calculateSleepScore(durationInBed, durationAsleep);
  return await saveScore(sleepScore);
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [inBedDuration, setInBedDuration] = useState<number | undefined>();
  const [asleepDuration, setAsleepDuration] = useState<number | undefined>();
  const [requestInFlight, setRequestInFlight] = useState(false);
  const [score, setScore] = useState<number>();
  const [fetchError, setFetchError] = useState();

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
          onValueChange={itemValue => setInBedDuration(itemValue)}
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
          onPress={async () => {
            setFetchError(undefined);
            setRequestInFlight(true);
            calculateAndSendSleepScore(inBedDuration ?? 0, asleepDuration ?? 0)
              .then(resp => {
                setScore(resp);
                setRequestInFlight(false);
              })
              .catch(e => {
                // Error handling could be more robust
                setScore(undefined);
                setFetchError(e);
                setRequestInFlight(false);
              });
          }}
        />
        <ScoreText>
          {requestInFlight ? 'Loading...' : `Sleep score: ${score}`}
        </ScoreText>
        {fetchError && <ErrorText>{fetchError}</ErrorText>}
      </Content>
    </MainView>
  );
}

export default App;
