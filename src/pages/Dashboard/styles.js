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
  margin-bottom: 50px;
`;

export const InfoBox = styled.View`
  width: 300px;
  border-radius: 10px;
  border-width: 2px;
  border-color: rgba(255, 255, 255, 0.9);
  align-items: center;
`;

export const Info = styled.View`
  margin-top: 10px;
  width: 150px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  margin-top: 10px;
`;

export const Text = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  margin-top: 10px;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.9);
  margin: 20px 0 10px;
`;

export const QuizButton = styled(Button)`
  background: #ea4335;
  font-weight: bold;
  margin-top: 150px;
  height: 150px;
  width: 150px;
  border-radius: 75px;
  align-self: center;
`;
