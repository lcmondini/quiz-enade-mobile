import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import {
  TouchableOpacity,
  View,
  Alert,
  Modal,
  Button,
  SafeAreaView,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import { updatePointsRequest } from '~/store/modules/user/actions';

import {
  Container,
  List,
  Image,
  Info,
  Description,
  SubmitButton,
} from './styles';

function Multiple({ isFocused, navigation }) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
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
      setQuestions(response.data.questions);
    }
    if (isFocused) {
      loadQuestions();
    }
  }, [id, isFocused, profile.course]);

  useEffect(() => {
    function loadOptions() {
      setOptions(
        questions.map(function(item) {
          const obj = JSON.parse(
            `[{"id":"${item.id}",
            "idAnswer":"${1}",
            "option":"${item.option_a}",
            "correctOption":"${item.correct_answer}",
            "checked":${false}
            },
            {"id":"${item.id}",
            "idAnswer":"${2}",
            "option":"${item.option_b}",
            "correctOption":"${item.correct_answer}",
            "checked":${false}
            },
            {"id":"${item.id}",
            "idAnswer":"${3}",
            "option":"${item.option_c}",
            "correctOption":"${item.correct_answer}",
            "checked":${false}
            },
            {"id":"${item.id}",
            "idAnswer":"${4}",
            "option":"${item.option_d}",
            "correctOption":"${item.correct_answer}",
            "checked":${false}
            },
            {"id":"${item.id}",
            "idAnswer":"${5}",
            "option":"${item.option_e}",
            "correctOption":"${item.correct_answer}",
            "checked":${false}
            }]`,
          );
          return obj;
        }),
      );
    }
    function loadVisible() {
      if (questions[0] !== undefined && questions[0].image === null) {
        setVisible(false);
      } else if (questions[0] !== undefined && questions[0].image !== null) {
        setVisible(true);
      }
    }
    loadOptions();
    loadVisible();
  }, [questions]);

  function handleSubmit() {
    let count = 0;
    let countCorrect = 0;
    let correctAnswer = '';
    options.map(function(option) {
      option.map(function(obj) {
        if (obj.checked) {
          count += 1;
        }
      });
    });
    if (count < 1) {
      Alert.alert(
        'Aviso',
        'Favor responder todas as questões antes de finalizar!',
      );
    } else {
      const { name, email } = profile;
      let { level, points } = profile;

      options.map(function(option) {
        option.map(function(obj) {
          if (obj.checked && obj.option === obj.correctOption) {
            points += 100;
            countCorrect += 1;
            correctAnswer = obj.option;
          } else if (obj.checked && obj.option !== obj.correctOption) {
            points += 25;
          } else if (obj.option === obj.correctOption) {
            correctAnswer = obj.option;
          }
        });
      });

      if (points > level * 1000) {
        points -= level * 1000;
        level += 1;
      }

      dispatch(updatePointsRequest({ name, email, level, points }));
      // navigation.navigate('Dashboard');
      navigation.navigate('Feedback', {
        countCorrect,
        correctAnswer,
      });
    }
  }

  function handleChecked(item, status) {
    setOptions(
      options.map(option => {
        return option.map(obj => {
          if (obj === item) {
            obj = { ...obj, checked: !status };
          } else if (
            obj.idAnswer !== item.idAnswer &&
            obj.id === item.id &&
            obj.checked
          ) {
            obj = { ...obj, checked: status };
          }
          return obj;
        });
      }),
    );
  }

  let images;

  if (questions[0] !== undefined && questions[0].image !== null) {
    images = [
      {
        url: questions[0].image.url,
      },
    ];
  }

  function handleShow() {
    setShow(!show);
  }

  return (
    <Background>
      <Container>
        <List
          data={questions}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Info>
              <Description>{item.description}</Description>
              <Modal visible={show} transparent>
                <ImageViewer imageUrls={images} />
                <Button title="Fechar" onPress={() => handleShow()} />
              </Modal>
              {visible ? (
                <TouchableOpacity onPress={() => handleShow()}>
                  <Image
                    resizeMode="contain"
                    source={{ uri: item.image.url }}
                  />
                </TouchableOpacity>
              ) : null}
              {options.map(option => {
                return option.map(obj => {
                  if (obj.id === String(item.id)) {
                    return (
                      <View key={obj.id}>
                        <CheckBox
                          center
                          title={obj.option}
                          checkedIcon="dot-circle-o"
                          uncheckedIcon="circle-o"
                          checked={obj.checked}
                          onPress={() => handleChecked(obj, obj.checked)}
                        />
                      </View>
                    );
                  }
                  return <View />;
                });
              })}
            </Info>
          )}
        />
        <SubmitButton onPress={() => handleSubmit()}>Finalizar</SubmitButton>
      </Container>
    </Background>
  );
}

Multiple.navigationOptions = ({ navigation }) => ({
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

export default withNavigationFocus(Multiple);
