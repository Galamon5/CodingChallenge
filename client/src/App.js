import React, { Component } from 'react';
import { Provider } from 'react-redux';
import GoPackage from 'react-icons/lib/go/package';
import './App.css';

import ListOrders from './components/ListOrders';
import store from './store';

class App extends Component {
  constructor(){
    super();
    this.state = {
      ordersNumber: 0
    }
    store.subscribe(() => {
      this.setState({
        ordersNumber: store.getState().order.totalSize,
      });
    });
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
          <p style={{'marginLeft':'2vw'}}>
            <GoPackage style={{'marginRight':'2vw'}}/> Orders: {this.state.ordersNumber}
          </p>
          </header>
          <ListOrders />
        </div>
      </Provider>
    );
  }
}

export default App;
