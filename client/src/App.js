import React, { Component } from 'react';
import './App.css';
import ListOrders from './components/ListOrders'
import GoPackage from 'react-icons/lib/go/package'
class App extends Component {
  constructor(){
    super();
    this.state = {
      ordersNumber: 0
    }
    this.handleOrders = this.handleOrders.bind(this);
  }

  handleOrders = (ordersNumberValue) => {
        this.setState({ordersNumber: ordersNumberValue});
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <p style={{'marginLeft':'2vw'}}>
          <GoPackage style={{'marginRight':'2vw'}}/> Orders: {this.state.ordersNumber}
        </p>
        </header>
        <ListOrders getOrdersNum={this.handleOrders}/>
      </div>
    );
  }
}

export default App;
