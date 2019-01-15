import { EVENT_CHANGE_TIP, EVENT_OTHER_TIP, RESET_TIP } from './types';

export const changeOptionTip = (event,getTip = 0) => dispatch => dispatch({
    type: EVENT_CHANGE_TIP,
    option: event.target.value,
    tip: getTip,
  });

export const optionOtherTip = (event) => dispatch => {
  if(event.target.value===''){
    dispatch({
      type: EVENT_OTHER_TIP,
      othertip: '',
      tip: 0,
    });
  } else{
    dispatch({
      type: EVENT_OTHER_TIP,
      othertip: parseFloat(event.target.value),
      tip: parseFloat(event.target.value),
    });
  }
}

export const resetOptions = (actualTip) => dispatch => dispatch({
    type: RESET_TIP,
    option: '0',
    othertip: 0,
    tip: actualTip,
  });
