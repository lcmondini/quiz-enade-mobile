import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

import Background from '~/components/Background';

import { Container, Text, AnswerText, Answer, SubmitButton } from './styles';

function Feedback({ navigation }) {
  const { countCorrect, correctAnswer } = navigation.state.params;

  function handleSubmit() {
    navigation.navigate('Dashboard');
  }

  return (
    <Background>
      <Container>
        <Text>Você acertou {countCorrect} questões de 1!</Text>
        <AnswerText>A resposta correta é:</AnswerText>
        <Answer>{correctAnswer}</Answer>
        <SubmitButton onPress={() => handleSubmit()}>Tela Inicial</SubmitButton>
      </Container>
    </Background>
  );
}

Feedback.navigationOptions = ({ navigation }) => ({
  title: 'Resultado',
  headerLeft: null,
});

export default withNavigationFocus(Feedback);
