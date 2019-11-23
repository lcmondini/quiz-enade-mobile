import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, Title } from './styles';

function Rank({ isFocused, navigation }) {
  const profile = useSelector(state => state.user.profile);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('users', {
        params: {
          limit: 10,
          course: profile.course,
        },
      });
      setUsers(response.data.questions);
    }
    if (isFocused) {
      loadUsers();
    }
  }, [isFocused, profile.course]);

  const [roles, setRole] = useState([
    {
      role: 'actor',
      text: 'Actor',
      checked: true,
    },
    {
      role: 'director',
      text: 'Director',
      checked: false,
    },
  ]);

  function handleChecked(key, status) {
    setRole(
      roles.map(function changeStatus(item) {
        if (item.role === key) {
          item = { ...item, checked: !status };
        } else if (item.checked) {
          item = { ...item, checked: status };
        }
        return item;
      }),
    );
  }

  return (
    <Background>
      <Container>
        <Title>Classificação</Title>
        <View>
          {roles.map(item => (
            <View key={item}>
              <CheckBox
                center
                title={item.text}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={item.checked}
                onPress={() => handleChecked(item.role, item.checked)}
              />
            </View>
          ))}
        </View>
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
