import { EVENT_CHANGE_TIP, EVENT_OTHER_TIP,  RESET_TIP } from '../actions/types';

const initialState = {
  option: '0',
  othertip: 0,
  tip: 0,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case EVENT_CHANGE_TIP:
      return {
        ...state,
        option: action.option,
        tip: action.tip,
      }
    case EVENT_OTHER_TIP:
      return {
        ...state,
        othertip: action.othertip,
        tip: action.tip,
      }
    case RESET_TIP:
      return {
        ...state,
        option: action.option,
        othertip: action.othertip,
        tip: action.tip,
      }
    default:
      return state;
  }
}
