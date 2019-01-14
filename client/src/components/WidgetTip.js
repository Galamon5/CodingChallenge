import React, { Component } from 'react';
import '../styles/WidgetTip.css';
const percentageTips = [5,10,15,'Other'];
const decimals = 2;
const endpointOrders = "http://localhost:8080/orders";
class WidgetTip extends Component {
  constructor(props){
    super(props);
    this.state = {
      option: 0,
      othertip: 0,
      tip: this.props.order.Tip,
    }
    this.handleOptionChange=this.handleOptionChange.bind(this);
    this.assignTip = this.assignTip.bind(this);
    this.handleOtherTip = this.handleOtherTip.bind(this);
  }

  handleOptionChange(event) {
      this.setState({
        option: event.target.value,
        tip: this.getTip(event.target.value),
      });
  }

  handleOtherTip(event){
    if(event.target.value===''){
      this.setState({
        othertip: '',
        tip: 0,
      });
    } else{
      this.setState({
        othertip: parseFloat(event.target.value),
        tip: parseFloat(event.target.value),
      });
    }
  }

  getTip(option){
    for (let i = 0; i < percentageTips.length-1; i++) {
      if (option===percentageTips[i].toString()){
        return this.props.order.Subtotal * percentageTips[i] / 100;
      }
    }
    return 0;
  }

  assignTip(event){
    let data = {
      id: this.props.order.Id,
      tip: this.state.tip,
    }
    let options = {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json' },
   };
    if(this.state.tip === 0){
      return 0;
    } else {
      fetch(endpointOrders,options)
      .then(res => res.json())
      .catch(error => alert('Error:', error));
    }
  }

  render() {
    let optionTip = this.state.option;
    const optionTipInput = percentageTips.map((option,index) =>{
      return(
        <div key={index}>
          <input type="radio" value= {option}
         checked={optionTip === option.toString()}
        onChange={this.handleOptionChange}/> {option!=='Other' ?
        option + '%' : option + ':' }
      </div>
    );
    });
    if(this.props.order.Tip === 0){
      return (
        <form onSubmit={this.assignTip} style={{'width':'30vw'}}>
          <div>Subtotal: {this.props.order.Subtotal} </div>
          {optionTipInput}
            <input type="number" value={this.state.othertip}
              onChange={this.handleOtherTip}
              disabled={optionTip!=='Other'}/> <br/>
            Taxes: {this.props.order.Taxes} <br/>
            Tip: {this.state.tip.toFixed(decimals)} <br/>
            Total: {(this.props.order.Total + this.state.tip).toFixed(decimals)} <br/>
          <input type="submit" value="Submit" />
        </form>
      );
    } else {
      return (
        <div style={{'width':'30vw'}}>
          Subtotal: {this.props.order.Subtotal} <br/>
          Taxes: {this.props.order.Taxes} <br/>
          Tip: {this.props.order.Tip} <br/>
          Total: { this.props.order.Total } <br/>
        </div>
      );
    }
  }
}

export default WidgetTip;
