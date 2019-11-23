import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { TouchableOpacity, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, List, Info, Description, SubmitButton } from './styles';

function Quiz({ isFocused, navigation }) {
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
      console.tron.log(response.data);
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
              "option_a":"${item.option_a}",
              "checked":"${false}"
            },
            {"id":"${item.id}",
              "option_b":"${item.option_b}",
              "checked":"${false}"
            },
            {"id":"${item.id}",
              "option_c":"${item.option_c}",
              "checked":"${false}"
            },
            {"id":"${item.id}",
              "option_d":"${item.option_d}",
              "checked":"${false}"
            },
            {"id":"${item.id}",
              "option_e":"${item.option_e}",
              "checked":"${false}"
            }]`,
          );
          return obj;
        }),
      );
    }
    loadOptions();
  }, [questions]);

  function handleSubmit() {}

  return (
    <Background>
      <Container>
        <List
          data={questions}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Info>
              <Description>{item.description}</Description>
              {options.map(function(option) {
                if (option.id === item.id) {
                  return (
                    <View key={option}>
                      <CheckBox
                        center
                        title={option.description}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={option.checked}
                      />
                    </View>
                  );
                }
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
