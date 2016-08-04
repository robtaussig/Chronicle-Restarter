const React = require('react');
const ErrorStore = require('../stores/error_store.js');

const Errors  = React.createClass({

  getInitialState () {
    return ({error_message: ""});
  },

  _onChange () {
    this.setState({error_message: ErrorStore.currentError()[1]});
  },

  componentDidMount () {
    ErrorStore.addListener(this._onChange);
  },

  render () {
    let className = (this.state.error_message === "" ||
      ErrorStore.currentError().length === 0) ? 'empty' : 'present';
    return (
      <div className={`errors ${className}`}>
        {this.state.error_message}
      </div>
    );
  }

});

module.exports = Errors;
