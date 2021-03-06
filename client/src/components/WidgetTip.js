import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/WidgetTip.css';
import IoAndroidHappy from 'react-icons/lib/io/android-happy';
import { connect } from 'react-redux';
import { addTip } from '../actions/orderActions';
import { resetOptions, changeOptionTip, optionOtherTip } from '../actions/tipActions';
import store from '../store';
const percentageTips = [5,10,15,'Other'];
const decimals = 2;
class WidgetTip extends Component {
  constructor(props){
    super(props);
    this.handleOptionChange=this.handleOptionChange.bind(this);
    this.assignTip = this.assignTip.bind(this);
    this.handleOtherTip = this.handleOtherTip.bind(this);
  }
  componentWillMount(){
    this.props.resetOptions(this.props.order.Tip);
  }

  handleOptionChange(event) {
      this.props.changeOptionTip(event);
      this.props.changeOptionTip(event,this.getTip(store.getState().tip.option));
  }

  handleOtherTip(event){
    this.props.optionOtherTip(event);
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
    if(this.props.tip === 0){
      alert("You must add tip to submit, if you do not want to, just click on close >:v")
      event.preventDefault();
    }else{
      this.props.addTip(this.props.order.Id, this.props.tip);
    }
  }

  render() {
    let optionTip = this.props.option;
    const optionTipInput = percentageTips.map((option,index) =>{
      return(
        <div key={index} >
          <input id={index} type="radio" value= {option}
         checked={optionTip === option.toString()}
        onChange={this.handleOptionChange}/>
        <label htmlFor={index}>
          {option!=='Other' ? option + '%' : option + ':' }
        </label>
        {option==='Other' ? (
          <input type="number" value={this.props.othertip}
          onChange={this.handleOtherTip}
          disabled={optionTip!=='Other'} className='boxTip'/>
        ) : null}
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
              <p> <b>Tip:</b> $ {this.props.tip.toFixed(decimals)} </p>
              <p> <b>Total:</b> $ {(this.props.order.Total + this.props.tip).toFixed(decimals)} </p>
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

WidgetTip.propTypes = {
  changeOptionTip: PropTypes.func.isRequired,
  addTip: PropTypes.func.isRequired,
  option: PropTypes.string.isRequired,
  othertip: PropTypes.node.isRequired,
  tip: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
  option: state.tip.option,
  othertip: state.tip.othertip,
  tip: state.tip.tip,
});

export default connect(
  mapStateToProps,
  { resetOptions,
    optionOtherTip,
    changeOptionTip,
    addTip }
  )(WidgetTip);
