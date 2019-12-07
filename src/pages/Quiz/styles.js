import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: row;
`;

export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;

export const Info = styled.View`
  margin-left: 15px;
  margin-top: 30px;
`;

export const Description = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: #fff;
`;

export const SubmitButton = styled(Button)`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 50;
`;
