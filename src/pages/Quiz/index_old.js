import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
  Dimensions,
} from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container } from './styles';

const styles = StyleSheet.create({
  option: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  yes: {
    backgroundColor: 'rgba(255, 255, 255, .1)',
  },
  optionText: {
    fontSize: 30,
    color: '#FFF',
    marginBottom: 50,
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    fontSize: 30,
    color: '#FFF',
    textAlign: 'center',
  },
  progress: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 10,
  },
  bar: {
    height: '100%',
    backgroundColor: '#FFF',
  },
});

function Quiz({ isFocused, navigation }) {
  const [index, setIndex] = useState(0);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [progress, setProgress] = useState(new Animated.Value(0));
  const profile = useSelector(state => state.user.profile);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function loadQuestions() {
      const response = await api.get('questions', {
        params: {
          quiz: 'true',
          limit: 1,
          course: profile.course,
        },
      });
      setQuestions(response.data.questions);
    }
    if (isFocused) {
      loadQuestions();
    }
  }, [isFocused, profile.course]);

  const { width } = Dimensions.get('window');

  const progressInterpolate = animation.interpolate({
    inputRange: [0, questions.length],
    outputRange: ['0%', '100%'],
  });

  const progressStyle = {
    width: progressInterpolate,
  };

  const mainQuestionInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width],
  });

  const nextQuestionInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [width, 0],
  });

  const mainStyle = {
    transform: [
      {
        translateX: mainQuestionInterpolate,
      },
    ],
  };

  const nextStyle = {
    transform: [
      {
        translateX: nextQuestionInterpolate,
      },
    ],
  };

  let question;
  let nextQuestion;

  questions.map(function(item) {
    if (questions[index] === item) {
      question = { ...item };
    }
  });

  if (index + 1 < questions.length) {
    questions.map(function(item) {
      if (questions[index + 1] === item) {
        nextQuestion = { ...item };
      }
    });
  }

  handleAnswer = () => {
    Animated.parallel([
      Animated.timing(progress, {
        toValue: index + 1,
        duration: 400,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 400,
      }),
    ]).start(() => {
      setIndex(index + 1);
      animation.setValue(0);
    });
  };

  return (
    <Background>
      <Container>
        <View style={[StyleSheet.absoluteFill, styles.overlay]}>
          <Animated.Text style={[styles.questionText, mainStyle]}>
            {question.id}
          </Animated.Text>
          <Animated.Text style={[styles.questionText, nextStyle]}>
            {nextQuestion.id}
          </Animated.Text>
        </View>
        <View style={styles.progress}>
          <Animated.View style={[styles.bar, progressStyle]} />
        </View>
        <TouchableOpacity
          onPress={this.handleAnswer}
          activeOpacity={0.7}
          style={styles.option}>
          <Text style={styles.optionText}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.handleAnswer}
          activeOpacity={0.7}
          style={[styles.option, styles.yes]}>
          <Text style={styles.optionText}>Yes</Text>
        </TouchableOpacity>
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
