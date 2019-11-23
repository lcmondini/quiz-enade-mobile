import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

import api from '~/services/api';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import { Container, Title, Separator, QuizButton } from './styles';

function Dashboard({ isFocused, navigation }) {
  const profile = useSelector(state => state.user.profile);
  const [appointments, setAppointments] = useState([]);

  async function loadAppointments() {
    const response = await api.get('appointments');

    setAppointments(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);

    setAppointments(
      appointments.map(appointment =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: response.data.canceled_at,
            }
          : appointment,
      ),
    );
  }

  return (
    <Background>
      <Container>
        <Title>{profile.name}</Title>
        <QuizButton
          onPress={() => {
            navigation.navigate('Quiz');
          }}>
          Iniciar Quiz
        </QuizButton>
      </Container>
    </Background>
  );
}

export default withNavigationFocus(Dashboard);
