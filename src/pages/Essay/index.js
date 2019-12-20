import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { TouchableOpacity, Modal, Alert, Button } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import { updatePointsRequest } from '~/store/modules/user/actions';

import {
  Container,
  Description,
  Image,
  Form,
  FormInput,
  SubmitButton,
} from './styles';

function Essay({ isFocused, navigation }) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const [description, setDescription] = useState([]);
  const [keyword, setKeyword] = useState([]);
  const [answer, setAnswer] = useState('');
  const [image, setImage] = useState([]);
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

  const id = navigation.state.params;

  useEffect(() => {
    async function loadQuestions() {
      const response = await api.get('questions', {
        params: {
          quiz: 'true',
          limit: 1,
          course: profile.course,
          id,
        },
      });
      setDescription(response.data.questions[0].description);
      setKeyword(response.data.questions[0].keyword);
      setImage(response.data.questions[0].image);
      if (image !== undefined && image === null) {
        setVisible(false);
      } else if (image !== undefined && image !== null) {
        setVisible(true);
      }
    }
    if (isFocused) {
      loadQuestions();
    }
  }, [isFocused]); // eslint-disable-line

  async function handleSubmit() {
    try {
      const { course, name, email } = profile;
      const user_name = profile.name;

      await api.post('corrections', {
        course,
        keyword,
        description,
        answer,
        user_name,
      });

      let { level, points } = profile;

      points += 100;

      if (points > level * 1000) {
        points -= level * 1000;
        level += 1;
      }

      dispatch(updatePointsRequest({ name, email, level, points }));
      navigation.navigate('Dashboard');
    } catch (err) {
      Alert.alert('Erro', 'Ocorreu um problema ao salvar sua resposta.');
    }
  }

  const images = [
    {
      url: image.url,
    },
  ];

  function handleShow() {
    setShow(!show);
  }

  return (
    <Background>
      <Container>
        <Form>
          <Description>{description}</Description>
          <Modal style={{ margin: 0 }} visible={show} transparent>
            <ImageViewer imageUrls={images} />
            <Button title="Fechar" onPress={() => handleShow()} />
          </Modal>
          {visible ? (
            <TouchableOpacity onPress={() => handleShow()}>
              <Image
                resizeMode="contain"
                source={{ uri: image.url }}
                onSwipeDown={() => handleShow()}
              />
            </TouchableOpacity>
          ) : null}
          <FormInput
            multiline
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite a sua resposta"
            value={answer}
            onChangeText={setAnswer}
          />
          <SubmitButton onPress={() => handleSubmit()}>Finalizar</SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}

Essay.navigationOptions = ({ navigation }) => ({
  title: 'Questionário',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

export default withNavigationFocus(Essay);
