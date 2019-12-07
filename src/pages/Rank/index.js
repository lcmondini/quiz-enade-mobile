import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, Title, List, Info, Position, Name } from './styles';
import { Separator } from '../Dashboard/styles';

function Rank({ isFocused, navigation }) {
  const profile = useSelector(state => state.user.profile);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('users', {
        params: {
          course: profile.course,
        },
      });

      setUsers(response.data.users);
    }
    if (isFocused) {
      loadUsers();
    }
  }, [isFocused, profile.course, profile.email]);

  console.tron.log(users);

  return (
    <Background>
      <Container>
        <Title>Classificação</Title>

        <List
          data={users}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View>
              <Info>
                <Position>{item.ranking}º</Position>
                <Name>{item.name}</Name>
              </Info>
              <Separator />
            </View>
          )}
        />
      </Container>
    </Background>
  );
}

Rank.navigationOptions = {
  tabBarLabel: 'Classificação',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="trophy" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Rank);
