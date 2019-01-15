import { combineReducers } from 'redux';
import orderReducer from './orderReducer';
import tipReducer from './tipReducer';

export default combineReducers({
  order: orderReducer,
  tip: tipReducer
})
