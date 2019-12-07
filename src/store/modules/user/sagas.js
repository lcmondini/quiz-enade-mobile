import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import {
  updateProfileSuccess,
  updateProfileFailure,
  updatePointsSuccess,
  updatePointsFailure,
} from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };
    const response = yield call(api.put, 'users', profile);

    Alert.alert('Sucesso!', 'Perfil atualizado com sucesso');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert(
      'Falha na atualização',
      'Houve um erro na atualização do perfil, verifique seus dados',
    );
    yield put(updateProfileFailure());
  }
}

export function* updatePoints({ payload }) {
  try {
    const { name, email, level, points } = payload.data;

    const profile = {
      name,
      email,
      level,
      points,
    };

    const response = yield call(api.put, 'users', profile);

    yield put(updatePointsSuccess(response.data));
  } catch (err) {
    Alert.alert(
      'Falha na atualização',
      'Houve um erro na atualização dos pontos',
    );
    yield put(updatePointsFailure());
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@user/UPDATE_POINTS_REQUEST', updatePoints),
]);
