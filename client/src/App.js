import React, { Component } from 'react';
import './App.css';
import ListOrders from './components/ListOrders'
class App extends Component {
  componentWillMount(){
    let endpointOrders = "http://localhost:8080/orders";
    let myInit = { method: 'GET', body: JSON.stringify({genOrders:true})};
    fetch(endpointOrders,myInit)
    .then(res => res.json()).then(data => console.log(data));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Navegación
        </header>
        <ListOrders />
      </div>
    );
  }
}

export default App;
