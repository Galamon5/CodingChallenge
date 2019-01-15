import React, { Component } from 'react';
import '../styles/WidgetTip.css';
import IoAndroidHappy from 'react-icons/lib/io/android-happy';
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
      .then(data => console.log('Done'))
      .catch(error => alert('Error:', error));
    }
  }

  render() {
    let optionTip = this.state.option;
    const optionTipInput = percentageTips.map((option,index) =>{
      return(
        <div key={index} >
          <input id={index} type="radio" value= {option}
         checked={optionTip === option.toString()}
        onChange={this.handleOptionChange}/><label htmlFor={index}>{option!=='Other' ? option + '%' : option + ':' }</label>
        {option==='Other' ? (<input type="number" value={this.state.othertip}
          onChange={this.handleOtherTip}
          disabled={optionTip!=='Other'} className='boxTip'/>) : null}
      </div>
    );
    });
    if(this.props.order.Tip === 0){
      return (
        <div>
          <div className='header'>{this.props.order.Status}</div>
          <form onSubmit={this.assignTip} className='body-form'>
            <h2 style={{'textAlign':'center', 'fontSize':'24px','width':'100%'}}>
              Add a tip <IoAndroidHappy />
            </h2>
            <div className='options'>
              {optionTipInput}
            </div>
            <div className='orderInfo'>
              <p> <b>Subtotal:</b> $ {this.props.order.Subtotal} </p>
              <p> <b>Taxes:</b> $ {this.props.order.Taxes} </p>
              <p> <b>Tip:</b> $ {this.state.tip.toFixed(decimals)} </p>
              <p> <b>Total:</b> $ {(this.props.order.Total + this.state.tip).toFixed(decimals)} </p>
            </div><br/>
            <input type="submit" value="Submit" className='bSubmit'/>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <div className='header'>{this.props.order.Status}</div>
          <div className='body-form'>
            <h2 style={{'textAlign':'center', 'fontSize':'24px','width':'100%'}}> 
              Thanks for the tip <IoAndroidHappy style={{'color':'green'}}/>
            </h2>
            <div className='orderInfo'>
              <p> <b>Subtotal:</b> $ {this.props.order.Subtotal} </p>
              <p> <b>Taxes:</b> $ {this.props.order.Taxes} </p>
              <p> <b>Tip:</b> $ {this.props.order.Tip} </p>
              <p> <b>Total:</b> $ {this.props.order.Total} </p>
            </div><br/>
          </div>
        </div>
      );
    }
  }
}

export default WidgetTip;
