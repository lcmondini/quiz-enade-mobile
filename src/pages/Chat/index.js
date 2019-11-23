import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GiftedChat } from 'react-native-gifted-chat';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import Background from '~/components/Background';

import 'prop-types';
import { Container } from './styles';

const styles = StyleSheet.create({
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
});

export default class Chat extends Component {
  state = {
    messages: [],
  };

  renderCustomView = props => {
    if (props.currentMessage.location) {
      return (
        <View style={props.containerStyle}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={[styles.mapView]}
            region={{
              latitude: props.currentMessage.location.latitude,
              longitude: props.currentMessage.location.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            scrollEnabled={false}
            zoomEnabled={false}>
            <MapView.Marker
              coordinate={{
                latitude: props.currentMessage.location.latitude,
                longitude: props.currentMessage.location.longitude,
              }}
            />
          </MapView>
        </View>
      );
    }
    return null;
  };

  componentWillMount() {
    if (!this.state.messages.length) {
      this.setState({
        messages: [
          {
            _id: Math.round(Math.random() * 1000000),
            text: '0 message',
            createdAt: new Date(),
            system: true,
          },
        ],
      });
    }
    this.setState({
      messages: [
        {
          _id: Math.round(Math.random() * 1000000),
          text: '#awesome',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'Developer',
          },
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: '',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
          },
          image:
            'data:image/jpeg;base64,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',
          sent: true,
          received: true,
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: 'Send me a picture!',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'Developer',
          },
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: '',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
          },
          sent: true,
          received: true,
          location: {
            latitude: 48.864601,
            longitude: 2.398704,
          },
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: 'Where are you?',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'Developer',
          },
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: 'Yes, and I use Gifted Chat!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
          },
          sent: true,
          received: true,
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: 'Are you building a chat app?',
          createdAt: new Date(2019, 11, 22),
          user: {
            _id: 3,
            name: 'Developer',
          },
        },
        {
          _id: Math.round(Math.random() * 1000000),
          text: 'You are officially rocking GiftedChat.',
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  //  https://stackoverflow.com/a/54550286/1458375
  render() {
    return (
      <Background>
        <Container>
          {this.state.messages.length === 0 && (
            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bottom: 50,
                },
              ]}>
              <Image
                source={{ uri: 'https://i.stack.imgur.com/qLdPt.png' }}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  resizeMode: 'contain',
                }}
              />
            </View>
          )}
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            renderCustomView={this.renderCustomView}
            user={{
              _id: 1,
            }}
            parsePatterns={linkStyle => [
              {
                pattern: /#(\w+)/,
                style: { ...linkStyle, color: 'lightgreen' },
                onPress: props => alert(`press on ${props}`),
              },
            ]}
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
