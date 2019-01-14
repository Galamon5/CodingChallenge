import React, { Component } from 'react';
import '../styles/ListOrders.css';
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from 'react-responsive-modal';
import WidgetTip from './WidgetTip';
const endpointOrders = "http://localhost:8080/orders";
class ListOrders extends Component {

  constructor(props){
    super(props);
    this.state = {
      orders: [],
      page: 0,
      hasMore: true,
      widget: false,
      order: {},
    }
  }

  componentWillMount(){
    this.getInitialData();
  }

  getInitialData = () => {
    let endpointOrdersQuery = endpointOrders + "?genOrders=true";
    let options = { method: 'GET' };
    fetch(endpointOrdersQuery,options)
    .then(res => res.json()).then(data => {
      this.setState({orders: data.data})
      this.props.getOrdersNum(data.total_size);
    });
  }

  addZero = (time) => {
    if(time<10)
      time = '0' + time;
    return time;
  }

  getMoreData = () => {
    this.setState({page: this.state.page + 1});
      let endpointOrdersQuery = endpointOrders + "?page="+this.state.page;
    let options = { method: 'GET' };
    fetch(endpointOrdersQuery,options)
    .then(res => res.json())
    .then(data => {
      let pagesDisplayed = 10;
      if (this.state.page>=data.total_size/pagesDisplayed)
        this.setState({hasMore: false});
      else
        this.setState({orders: this.state.orders.concat(data.data)});
    });
  }

  activateWidget = (order) => {
    if(order.Status === "Completed")
      this.setState({
        widget: !this.state.widget,
        order: order,
      });
  }

  render() {
    const ordersItems = this.state.orders.map((order,index) =>{
      let date = new Date(order.Date);
      let [year,month,day] = [date.getFullYear(),date.getMonth(),date.getDate()];
      let time = date.getHours() +':'+ this.addZero(date.getMinutes());
      return (
        <div className= "card" key={order.Id} onClick={this.activateWidget.bind(this,order)}>
          <div className="container">
            <div className='information'>
              <div className="date" >{day}/{month}/{year} {time}</div>
              <div className="total" ><b>Total:</b> $ {order.Total}</div>
            </div>
            <div className={order.Status==='Completed'? "ordercompleted": 'orderprocess' }>
              {order.Status}
            </div>
          </div>
        </div>
      )
    });

    return (
      <div className='ordersItems'>
        <InfiniteScroll
          dataLength={this.state.orders.length}
          next={this.getMoreData}
          hasMore={this.state.hasMore}
          loader={<div className="lds-roller"><div></div><div></div>
            <div></div><div></div><div></div><div></div><div></div>
            <div></div></div>}
        >
          {ordersItems}
        </InfiniteScroll>
        <Modal open={this.state.widget} onClose={() => this.activateWidget(this.state.order)}
        closeOnOverlayClick={false} center>
          <WidgetTip order={this.state.order}/>
        </Modal>
      </div>

    );
  }
}

export default ListOrders;
