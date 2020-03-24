import { CREATE_USER } from '../constants';

export default function (state = {}, action) {
  switch (action.type) {
    case CREATE_USER:
      return action.payload;
    default:
      return state;
  }
}
