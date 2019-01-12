import React, { Component } from 'react';
import '../styles/ListOrders.css';
import InfiniteScroll from "react-infinite-scroll-component";
class ListOrders extends Component {
  constructor(props){
    super(props);
    this.state = {
      orders: [],
      page: 0,
      hasMore: true,
    }
  }
  componentWillMount(){
    let endpointOrders = "http://localhost:8080/orders?genOrders=true";
    let myInit = { method: 'GET' };
    fetch(endpointOrders,myInit)
    .then(res => res.json()).then(data => {
      this.setState({orders: data.data})
      this.props.getOrdersNum(data.total_size);
    });
  }
  addZero(time){
    if(time<10)
      time = '0' + time;
    return time;
  }
  fetchMoreData = () => {
    this.setState({page: this.state.page + 1});
    let endpointOrders = "http://localhost:8080/orders?page="+this.state.page;
    let myInit = { method: 'GET' };
    fetch(endpointOrders,myInit)
    .then(res => res.json())
    .then(data => {
      if (this.state.page>=data.total_size/10)
        this.setState({hasMore: false});
      else
        this.setState({orders: this.state.orders.concat(data.data)});
    });
  };
  render() {
    const ordersItems = this.state.orders.map((order) =>{
      let date = new Date(order.Date);
      let [year,month,day] = [date.getFullYear(),date.getMonth(),date.getDate()];
      let time = date.getHours() +':'+ this.addZero(date.getMinutes());
      return (
      <div className= "card" key={order.Id}>
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
    )});

    return (
      <div className='ordersItems'>
        <InfiniteScroll
          dataLength={this.state.orders.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<div className="lds-roller"><div></div><div></div>
          <div></div><div></div><div></div><div></div><div></div>
          <div></div></div>}
        >
          {ordersItems}
        </InfiniteScroll>

      </div>

    );
  }
}

export default ListOrders;
