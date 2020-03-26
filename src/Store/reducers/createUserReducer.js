import { CREATE_USER } from '../constants';

const initialState = {
  user: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return {
        user: action.payload,
      };
    default:
      return state;
  }
}
