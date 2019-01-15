import { ACT_WIDGET, GEN_ORDERS, GET_ORDERS, ADD_TIP } from './types';
const endpointOrders = "http://localhost:8080/orders";

export const generateOrders = () => dispatch => {
  let endpointOrdersQuery = endpointOrders + "?genOrders=true";
  let options = { method: 'GET' };

  fetch(endpointOrdersQuery,options)
  .then(res => res.json())
  .then(ordersList => dispatch({
    type: GEN_ORDERS,
    orders: ordersList.data,
    totalSize: ordersList.total_size,
  }))
  .catch((err) => console.log(err));
}

export const getOrders = (actualPage,lastOrders) => dispatch => {
  actualPage++;
  let endpointOrdersQuery = endpointOrders + "?page=" + actualPage;
  let options = { method: 'GET' };

  fetch(endpointOrdersQuery,options)
  .then(res => res.json())
  .then(ordersList => {
    let pagesDisplayed = 10;
    if (actualPage>=ordersList.total_size/pagesDisplayed){
      return dispatch ({
        type: GET_ORDERS,
        page: actualPage,
        hasMore: false,
        orders: lastOrders,
      });
    } else{
      return dispatch ({
        type: GET_ORDERS,
        page: actualPage,
        hasMore: true,
        orders: [...lastOrders,...ordersList.data],
      });
    }
  })
  .catch((err) => console.log(err));
}

export const activateWidget = (actualOrder,stateWidget) => dispatch => {
  if(actualOrder.Status === "Completed"){
    dispatch({
      type: ACT_WIDGET,
      order: actualOrder,
      widget: !stateWidget,
    })
  }
}

export const addTip = (Id,Tip) => dispatch => {
  const data = {
    id: Id,
    tip: Tip,
  }
  const options = {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: { 'Content-type': 'application/json' },
  };

  fetch(endpointOrders,options)
    .then(res => res.json())
    .then(order => dispatch({
      type: ADD_TIP,
      payload: order,
    }))
    .catch(error => console.log('Error:', error));
}
