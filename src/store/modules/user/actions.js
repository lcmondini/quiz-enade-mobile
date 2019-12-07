export function updateProfileRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function updateProfileFailure() {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
  };
}

export function updatePointsRequest(data) {
  return {
    type: '@user/UPDATE_POINTS_REQUEST',
    payload: { data },
  };
}

export function updatePointsSuccess(profile) {
  return {
    type: '@user/UPDATE_POINTS_SUCCESS',
    payload: { profile },
  };
}

export function updatePointsFailure() {
  return {
    type: '@user/UPDATE_POINTS_FAILURE',
  };
}
