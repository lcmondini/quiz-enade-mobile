import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { TouchableOpacity, View, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import { updatePointsRequest } from '~/store/modules/user/actions';

import { Container, List, Info, Description, SubmitButton } from './styles';

function Quiz({ isFocused, navigation }) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function loadQuestions() {
      const response = await api.get('questions', {
        params: {
          quiz: 'true',
          limit: 10,
          course: profile.course,
        },
      });
      setQuestions(response.data.questions);
    }
    if (isFocused) {
      loadQuestions();
    }
  }, [isFocused, profile.course]);

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
    loadOptions();
  }, [questions]);

  function handleSubmit() {
    let count = 0;
    options.map(function(option) {
      option.map(function(obj) {
        if (obj.checked) {
          count += 1;
        }
      });
    });
    if (count < 10) {
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
          } else if (obj.checked && obj.option !== obj.correctOption) {
            points += 25;
          }
        });
      });

      if (points > level * 1000) {
        points -= level * 1000;
        level += 1;
      }

      dispatch(updatePointsRequest({ name, email, level, points }));
      navigation.navigate('Dashboard');
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

  return (
    <Background>
      <Container>
        <List
          data={questions}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Info>
              <Description>{item.description}</Description>
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

Quiz.navigationOptions = ({ navigation }) => ({
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

export default withNavigationFocus(Quiz);
