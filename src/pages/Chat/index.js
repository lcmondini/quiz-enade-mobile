import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GiftedChat } from 'react-native-gifted-chat';

import Background from '~/components/Background';
import firebase from 'firebase';
//import Backend from '~/services/Backend';

import api from '~/services/api';

import 'prop-types';
import { Container } from './styles';

const mapStateToProps = state => ({
  profile: state.user.profile,
});

function setUid(value) {
  this.uid = value;
}
function getUid() {
  return this.uid;
}
// retrieve the messages from the Backend
function loadMessages(callback, course) {
  this.messagesRef = firebase.database().ref(course);
  this.messagesRef.off();
  const onReceive = data => {
    const message = data.val();
    callback({
      _id: data.key,
      text: message.text,
      createdAt: new Date(message.createdAt),
      user: {
        _id: message.user._id,
        name: message.user.name,
      },
    });
  };
  this.messagesRef.limitToLast(20).on('child_added', onReceive);
}
// send the message to the Backend
function sendMessage(message) {
  for (let i = 0; i < message.length; i++) {
    this.messagesRef.push({
      text: message[i].text,
      user: message[i].user,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    });
  }
}
// close the connection to the Backend
function closeChat() {
  if (this.messagesRef) {
    this.messagesRef.off();
  }
}
class Chat extends Component {
  state = {
    messages: [],
  };
  uid = '';
  messagesRef = null;
  // initialize Firebase Backend
  constructor() {
    super();
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyDZTOXOT2waYz2dNTQiYjGGMdcPeZmVlpQ',
        authDomain: 'quiz-enade.firebaseapp.com',
        databaseURL: 'https://quiz-enade.firebaseio.com',
        storageBucket: 'quiz-enade.appspot.com',
      });
      firebase.auth().signInAnonymously();
    }
  }

  componentDidMount() {
    loadMessages(message => {
      this.setState(previousState => {
        return {
          messages: GiftedChat.append(previousState.messages, message),
        };
      });
    }, this.props.profile.course);
  }

  render() {
    return (
      <Background>
        <Container>
          <GiftedChat
            messages={this.state.messages}
            onSend={message => {
              // send message to the backend.
              sendMessage(message);
            }}
            user={{
              _id: this.props.profile.id,
              name: this.props.profile.name,
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

export default connect(mapStateToProps)(Chat);
