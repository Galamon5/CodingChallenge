import { ACT_WIDGET, GEN_ORDERS, GET_ORDERS, ADD_TIP } from '../actions/types';

const initialState = {
  orders: [],
  order: {},
  page: 0,
  widget: false,
  hasMore: true,
  totalSize: 0,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GEN_ORDERS:
      return {
        ...state,
        orders: action.orders,
        totalSize: action.totalSize,
      }
    case GET_ORDERS:
      return {
        ...state,
        orders: action.orders,
        page: action.page,
        hasMore: action.hasMore,
      }
    case ACT_WIDGET:
      return {
        ...state,
        widget: action.widget,
        order: action.order,
      }
    case ADD_TIP:
      return {
        ...state,
      }
    default:
      return state;
  }
}
