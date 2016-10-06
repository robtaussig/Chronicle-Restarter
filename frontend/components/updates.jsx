const React = require('react');
const Update = require('./update.jsx');
const UpdateActions = require('../actions/update_actions.js');
const SessionStore = require('../stores/session_store.js');

const Updates = React.createClass({

  getInitialState () {
    return ({
      title: "",
      body: "",
      newUpdates: [],
      loggedIn: false,
      submitEnabled: false
    });
  },

  componentDidMount () {
    this.currentUser = SessionStore.currentUser() || window.myApp;
    if (this.currentUser.id) {
      this.setState({loggedIn: true});
    }
  },

  _deleteUpdate(id) {
    if (id) {
      UpdateActions.deleteUpdate('update', id);
    } else {
      let newUpdates = this.state.newUpdates;
      newUpdates.pop();
      this.setState({newUpdates: newUpdates});
    }
  },

  _setTitle (e) {
    this.setState({title: e.currentTarget.value});
    if (this.state.title !== "" &&
    this.state.body !== "" &&
    this.state.loggedIn) {
      this._enableSubmit();
    } else {
      this._disableSubmit();
    }
  },

  _setBody (e) {
    this.setState({body: e.currentTarget.value});
    if (this.state.title !== "" &&
    this.state.body !== "" &&
    this.state.loggedIn) {
      this._enableSubmit();
    } else {
      this._disableSubmit();
    }
  },

  _enableSubmit () {
    this.setState({submitEnabled: true});
  },

  _disableSubmit () {
    this.setState({submitEnabled: false});
  },

  _createUpdate () {
    let date = new Date();
    let day = date.getUTCDate();
    day = day < 10 ? `0${day}` : day;
    let month = date.getUTCMonth() + 1;
    let year = date.getUTCFullYear();
    let newDate = year + "-" + month + "-" + day;

    const updateInfo = {
      title: this.state.title,
      body: this.state.body,
      campaign_id: this.props.project.id,
      user_id: this.currentUser.id,
      email: this.currentUser.email,
      date: newDate
    };
    if (this.state.submitEnabled) {
      UpdateActions.submitUpdate('update', updateInfo);
      this.setState({newUpdates: this.state.newUpdates.concat(updateInfo)});
    }
  },

  render () {
    let _newUpdates = this.state.newUpdates || [];
    let _updates =
      this.props.updates.concat(_newUpdates).map((update,i) => {
      return <li key={i}><Update delete={this._deleteUpdate}
        update={update} i={i} /></li>;
    });
    _updates = _updates.length === 0 ? "No updates have been made" : _updates;
    let _enabled = this.state.submitEnabled ? 'enabled' : 'disabled';
    let _submit = this.currentUser ? (
      this.currentUser.id === this.props.project.author_id ||
      this.currentUser.email === 'admin@gmail.com' ||
      this.currentUser.email === 'rob@gmail.com'?
      [<span key="1" className="new-update-header">New Update</span>,
      <input key="2" className="update-input" type="text" onChange={this._setTitle}
      value={this.state.title || ""} placeholder="Title" />,
      <input key="3" className="update-input body" type="text" onChange={this._setBody}
      value={this.state.body || ""} placeholder="Your update" />,
      <div key="4" className={`update-create-button ${_enabled}`}
      onClick={this._createUpdate}>Create</div>] : ''
    ) : '';

    return (
      <div className={`bottom-page-item updates-wrapper ${this.props.revealed}`}>
        <ul className="updates">{_updates}</ul>
        {_submit}
      </div>
    );
  }

});

module.exports = Updates;
