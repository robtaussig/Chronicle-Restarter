const React = require('react');
const ErrorStore = require('../stores/error_store.js');

const ErrorActions = require('../actions/error_actions.js');

const Errors  = React.createClass({

  getInitialState () {
    return ({error_message: ""});
  },

  _onChange () {
    debugger
    this.setState({error_message: ErrorStore.currentError()[1]});
  },

  componentDidMount () {
    ErrorStore.addListener(this._onChange);
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
