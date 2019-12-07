import React, { useEffect, useState } from 'react';
import { Dimensions, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, Title, Info, Separator, QuizButton } from './styles';

function Dashboard({ isFocused, navigation }) {
  const profile = useSelector(state => state.user.profile);

  const percent = (profile.points * 100) / (1000 * profile.level);

  return (
    <Background>
      <Container>
        <Title>{profile.name}</Title>
        <Separator />
        <Info>Level: {profile.level}</Info>
        <Info>Exp: {profile.points}</Info>
        <Separator />
        <ProgressBarAnimated width={250} height={25} value={percent} />
        <QuizButton
          onPress={() => {
            navigation.navigate('Quiz');
          }}>
          Iniciar Quiz
        </QuizButton>
      </Container>
    </Background>
  );
}

export default withNavigationFocus(Dashboard);
