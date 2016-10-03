const React = require('react');
const UpdateActions = require('../actions/update_actions.js');
const SessionStore = require('../stores/session_store.js');

const Update = React.createClass({
  componentDidMount () {
    this.currentUser = window.myApp || SessionStore.currentUser();
    if (this.currentUser.id === this.props.update.user_id ||
      this.currentUser.email === 'rob@gmail.com' ||
      this.currentUser.email === 'admin@gmail.com') {
      this._delete = true;
    } else {
      this._delete = false;
    }
  },

  _deleteUpdate () {
    this.props.delete(this.props.update.id);
  },

  render () {
    let _delete = this._delete ? <div onClick={this._deleteUpdate} className="delete-update">X</div> : "";
    return (
      <div className="indiv-update">
        <h1 className="update-title">
          <b>{this.props.update.date}: </b>{`${this.props.update.title || ""}`}
        </h1>
        <p className="update-body">{this.props.update.body || ""}</p>
        {_delete}
      </div>
    );
  }

});

module.exports = Update;
