import React, { Component } from 'react';
import '../styles/ListOrders.css';
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';

import { connect } from 'react-redux';
import { activateWidget, getOrders, generateOrders } from '../actions/orderActions';
import WidgetTip from './WidgetTip';

class ListOrders extends Component {

  componentWillMount(){
    this.props.generateOrders();
  }

  addZero(time){
    if(time<10)
      time = '0' + time;
    return time;
  }

  render() {
    const ordersItems = this.props.orders.map((order,index) =>{
      let date = new Date(order.Date);
      let [year,month,day] = [date.getFullYear(),date.getMonth(),date.getDate()];
      let time = date.getHours() +':'+ this.addZero(date.getMinutes());
      return (
        <div className= "card" key={order.Id}
          onClick={this.props.activateWidget.bind(this,order,this.props.widget)}>
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
          dataLength={this.props.orders.length}
          next={this.props.getOrders.bind(this,this.props.page,this.props.orders)}
          hasMore={this.props.hasMore}
          loader={<div className="lds-roller"><div></div><div></div>
            <div></div><div></div><div></div><div></div><div></div>
            <div></div></div>}
        >
          {ordersItems}
        </InfiniteScroll>
        <Modal styles={{'modal':{'padding':'0'}}} open={this.props.widget}
          onClose={this.props.activateWidget.bind(this,this.props.order,this.props.widget)}
           closeOnOverlayClick={true} center>
          <WidgetTip order={this.props.order}/>
        </Modal>
      </div>

    );
  }
}

ListOrders.propTypes = {
  getOrders: PropTypes.func.isRequired,
  generateOrders: PropTypes.func.isRequired,
  activateWidget: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
  hasMore: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  widget: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  order: state.order.order,
  orders: state.order.orders,
  hasMore: state.order.hasMore,
  page: state.order.page,
  widget: state.order.widget,
});

export default connect(mapStateToProps,{ getOrders, generateOrders, activateWidget })(ListOrders);
