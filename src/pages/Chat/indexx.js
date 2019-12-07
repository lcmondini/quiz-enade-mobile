import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GiftedChat } from 'react-native-gifted-chat';

import api from '~/services/api';
import Backend from '~/services/Backend';

import Background from '~/components/Background';

import { Container } from './styles';

function Chat({ isFocused, navigation }) {
  const profile = useSelector(state => state.user.profile);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function loadMessages() {
      Backend.loadMessages(message => {
        setMessages(previousState => {
          return {
            messages: GiftedChat.append(previousState.messages, message),
          };
        });
      });
    }
    if (isFocused) {
      loadMessages();
    }
  }, [isFocused]);

  const data = Object.keys(messages).map(key => messages[key]);

  console.tron.log(typeof messages, typeof data);

  return (
    <Background>
      <Container>
        <GiftedChat
          messages={messages}
          onSend={message => {
            Backend.sendMessage(message);
          }}
          user={{
            _id: profile.id,
            name: profile.name,
          }}
        />
      </Container>
    </Background>
  );
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

export default withNavigationFocus(Chat);
