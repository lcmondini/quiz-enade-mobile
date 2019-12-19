import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const Text = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  margin-top: 300px;
`;

export const AnswerText = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  margin-top: 50px;
`;

export const Answer = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  margin-top: 50px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 50px;
  width: 100px;
`;
