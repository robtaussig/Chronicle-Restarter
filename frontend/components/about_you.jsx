const React = require('react');
const UserStore = require('../stores/user_store.js');
const UserActions = require('../actions/user_actions.js');
const SavedProjectStore = require('../stores/saved_project_store.js');
const SavedProjectActions = require('../actions/saved_project_actions.js');
const SessionStore = require('../stores/session_store.js');

const AboutYou = React.createClass({

  getInitialState () {
    return({
      id: "",
      pic_url: "",
      full_name: "",
      biography: "",
      location: "",
      website: "",
      saved: 'saved',
      errorMessage: "",
      appearance: 'entering',
      visibility: ""
    });
  },

  componentDidMount () {
    this.blankState = {
      pic_url: "",
      biography: "",
      location: "",
      website: "",
      saved: 'saved',
      errorMessage: "",
      visibility: ""
    };
    let userId = SessionStore.currentUser().id || window.myApp.id;
    this.setState({id: userId});
    this.listener = UserStore.addListener(this._onChange);
    UserActions.fetchUser('about', userId);
    window.setTimeout(() => {this.setState({appearance: 'entered'});},100);
  },

  componentWillUnmount () {
    this.listener.remove();
    this._saveUserInfo();
  },

  _onChange () {
    this.setState(UserStore.currentUser());
  },

  _setUserPic (e) {
    let file = e.currentTarget.files[0];
    let fileReader = new FileReader();
    fileReader.onloadend = function () {
      this.setState({imageFile : file, imageUrl: fileReader.result});
    }.bind(this);
    if (file) {
      fileReader.readAsDataURL(file);
    }
  },

  _resetSavedStatus () {
    this.setState({saved: 'unsaved', errorMessage: "", visibility: "visible"});
  },

  _setName (event) {
    event.preventDefault();
    this.setState({full_name: event.target.value});
    this._resetSavedStatus();
  },

  _deleteProject () {
    if (SavedProjectStore.currentProject().id) {
      SavedProjectActions.deleteSavedProject('finalizeProject',
        SavedProjectStore.currentProject());
      this.setState({deleteMessage: "", visibility: ""});
    } else {
      this.setState(this.blankState);
    }
  },

  _setBiography (event) {
    event.preventDefault();
    this.setState({biography: event.target.value});
    this._resetSavedStatus();
  },

  _setLocation (event) {
    event.preventDefault();
    this.setState({location: event.target.value});
    this._resetSavedStatus();
  },

  _setWebsite (event) {
    event.preventDefault();
    this.setState({website: event.target.value});
    this._resetSavedStatus();
  },

  _handleSave () {
    if (this.state.saved === 'saved') {
      this.setState({errorMessage: "Your information is already up-to-date"});
    } else {
      this.setState({errorMessage: "", saved: 'saved'});
      this._saveUserInfo();
    }
  },

  _saveUserInfo () {
    let formData = new FormData();
    if (this.state.imageFile) {
      formData.append("user[image]", this.state.imageFile);
    }
    formData.append("user[location]", this.state.location);
    formData.append("user[biography]", this.state.biography);
    formData.append("user[full_name]", this.state.full_name);
    formData.append("id", this.state.id);
    UserActions.saveUser('about', formData);
  },

  render: function() {
    return (
      <div>
        <div className={`about-you-wrapper ${this.state.appearance}`}>
          <div className="about-you-form">
            <ul>
              <li className="user-image-field">
                <div className="grey-field">
                  <div className="attribute-field">Profile photo</div>
                  <div className="field-wrapper">
                    <input type="file" onChange={this._setUserPic} />
                  </div>
                </div>
              </li>
              <li className="user-name-field">
                <div className="grey-field">
                  <div className="attribute-field">Full Name</div>
                  <div className="warning-text"><strong>Warning:</strong> Once
                    you launch your project, you cannot modify your full
                    name.</div>
                  <div className="field-wrapper">
                    <input type="text" className="user-name"
                      onChange={this._setName} value={this.state.full_name || ""}/>
                  </div>
                </div>
              </li>
              <li className="user-biography-field">
                <div className="grey-field">
                  <div className="attribute-field">Biography</div>
                  <div className="field-wrapper">
                    <textarea rows="5" value={this.state.biography || ""}
                      wrap="hard" className="user-biography"
                      onChange={this._setBiography} />
                  </div>
                </div>
              </li>
              <li className="user-location-field">
                <div className="grey-field">
                  <div className="attribute-field">Location</div>
                  <div className="field-wrapper">
                    <input type="text" className="user-location"
                      onChange={this._setLocation} value={this.state.location || ""}/>
                  </div>
                </div>
              </li>
              <li className="user-website-field">
                <div className="grey-field">
                  <div className="attribute-field">Website</div>
                  <div className="field-wrapper">
                    <input type="text" className="website"
                      placeholder="www."
                      onChange={this._setWebsite}
                      value={this.state.website || ""}/>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div id="save-box" className={this.state.saved || 'saved'}>
          <button className={this.state.saved || 'saved'}
            onClick={this._handleSave}>Save</button>
          <p>{this.state.errorMessage}</p>
        </div>
        <div className={`delete-wrapper ${this.state.visibility}`}>
          <button className="delete-project" onClick={this._deleteProject}>
            Clear</button>
          <p className="delete-message">{this.state.deleteMessage}</p>
        </div>
      </div>
    );
  }

});

module.exports = AboutYou;
