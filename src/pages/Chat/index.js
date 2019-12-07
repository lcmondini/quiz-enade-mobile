import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { GiftedChat } from 'react-native-gifted-chat';

import Background from '~/components/Background';
import Backend from '~/services/Backend';

import { Container } from './styles';
export default class Chat extends React.Component {
  state = {
    messages: [],
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    console.tron.log(messages);
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <Background>
        <Container>
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          />
        </Container>
      </Background>
    );
  }
}

Chat.navigationOptions = ({ navigation }) => ({
  title: 'Conversa',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});
