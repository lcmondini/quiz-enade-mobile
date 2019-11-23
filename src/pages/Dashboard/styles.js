import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.9);
  margin: 20px 0 30px;
`;

export const QuizButton = styled(Button)`
  background: #ea4335;
  font-weight: bold;
  margin-top: 300px;
  height: 150px;
  width: 150px;
  border-radius: 75px;
`;
