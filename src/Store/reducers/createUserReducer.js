import { CREATE_USER, USER_CURRENT_ROOM } from '../constants';

const initialState = {
  user: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return {
        user: action.payload,
      };
    case USER_CURRENT_ROOM:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
