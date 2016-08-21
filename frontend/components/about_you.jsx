const React = require('react');
const UserStore = require('../stores/user_store.js');
const UserActions = require('../actions/user_actions.js');
const SavedProjectStore = require('../stores/saved_project_store');
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
    e.preventDefault();
    cloudinary.openUploadWidget(window.CLOUDINARY_OPTIONS,(error,img) => {
      if (error === null) {
        this._setImage(img[0].url);
      } else {
        return;
      }
    });
  },

  _setImage (img_url) {
    let img = "https" + img_url.slice(4);
    this.setState({pic_url: img});
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
    UserActions.saveUser('about', this.state);
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
                    <button onClick={this._setUserPic} id="about-you-image" className="about-you-image">
                      Choose an image from your computer
                    </button>
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
