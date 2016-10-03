const React = require('react');
const ErrorStore = require('../stores/error_store.js');

const ErrorActions = require('../actions/error_actions.js');

const Errors  = React.createClass({

  getInitialState () {
    return ({error_message: ""});
  },

  _onChange () {
    this.setState({error_message: ErrorStore.currentError()[1]});
    this.timeOut = window.setTimeout(() => {
      ErrorActions.clearErrors();
    },3000);
  },

  componentDidMount () {
    this.listener = ErrorStore.addListener(this._onChange);
  },

  componentWillUnmount () {
    this.listener.remove();
  },

  _dismissError () {
    ErrorActions.clearErrors();
  },

  render () {
    let className = (this.state.error_message === "" ||
      ErrorStore.currentError().length === 0) ? 'empty' : 'present';
    return (
      <div id='error' className={`errors ${className}`}>
        <p>{this.state.error_message}</p>
        <button className={`dismissError ${className}`} onClick={this._dismissError}>Dismiss</button>
      </div>
    );
  }

});

module.exports = Errors;
