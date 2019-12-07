import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
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
  margin: 20px 0 10px;
`;

export const Info = styled.View`
  margin-top: 10px;
  width: 200px;
  flex-direction: row;
  align-self: center;
`;

export const Position = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  margin-top: 10px;
  padding-right: 30px;
`;

export const Name = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  margin-top: 10px;
`;

export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;
