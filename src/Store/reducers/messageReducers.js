import { SET_MESSAGES } from '../constants';

export default function (state = [], action) {
  switch (action.type) {
    case SET_MESSAGES:
      return action.payload;
    default:
      return state;
  }
}

// export default function (state = { messages: [] }, action) {
//   switch (action.type) {
//     case SET_MESSAGES:
//       return { ...state, messages: action.payload };
//     default:
//       return state;
//   }
// }
