import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

import api from '~/services/api';

import Background from '~/components/Background';

import {
  Container,
  Title,
  InfoBox,
  Info,
  Label,
  Text,
  Separator,
  QuizButton,
} from './styles';

function Dashboard({ isFocused, navigation }) {
  const profile = useSelector(state => state.user.profile);

  const percent = (profile.points * 100) / (1000 * profile.level);

  async function handleStart() {
    const response = await api.get('questions', {
      params: {
        quiz: 'true',
        limit: 1,
        course: profile.course,
      },
    });

    if (response.data.questions[0].correct_answer !== null) {
      navigation.navigate('Multiple', response.data.questions[0].id);
    } else {
      navigation.navigate('Essay', response.data.questions[0].id);
    }
  }

  return (
    <Background>
      <Container>
        <Title>{profile.name}</Title>
        <Separator />
        <InfoBox>
          <Info>
            <Label>Nível:</Label>
            <Text>{profile.level}</Text>
          </Info>
          <Info>
            <Label>Exp.:</Label>
            <Text>{profile.points}</Text>
          </Info>
          <Separator />
          <ProgressBarAnimated
            width={250}
            height={25}
            value={percent}
            backgroundColor="#f3c014"
          />
          <Separator />
        </InfoBox>
        <QuizButton onPress={() => handleStart()}>Iniciar Quiz</QuizButton>
      </Container>
    </Background>
  );
}

export default withNavigationFocus(Dashboard);
