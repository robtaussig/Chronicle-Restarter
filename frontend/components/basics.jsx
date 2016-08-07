const React = require('react');
const SavedProjectActions = require('../actions/saved_project_actions.js');
const SavedProjectStore = require ('../stores/saved_project_store.js');
const ProjectCategories = require('../constants/project_category_ids.js');
const SessionStore = require('../stores/session_store.js');

const Basics = React.createClass({

  getInitialState () {
    return ({
      author_id: SessionStore.currentUser().id,
      image: {},
      title: "",
      blurb: "",
      category_id: 0,
      location: "",
      duration: 0,
      goal: 0,
      saved: 'saved',
      errorMessage: ""
    });
  },

  componentDidMount () {
    this.listener = SavedProjectStore.addListener(this._onChange);
    this.setState(SavedProjectStore.currentProject());
    this.displayCategory = ProjectCategories[0].label;
  },

  componentWillUnmount () {
    this.listener.remove();
  },

  _onChange () {
    this.setState(SavedProjectStore.currentProject());
    this.displayCategory = this._updateDisplayCategory();
    this.forceUpdate();
  },

  _updateDisplayCategory () {
    return ProjectCategories[this.state.category_id].label;
  },

  _resetSavedStatus () {
    this.setState({saved: 'unsaved', errorMessage: ""});
  },

  _setTitle (e) {
    this.setState({title: e.target.value});
    this._resetSavedStatus();
  },

  _setImage (e) {

  },

  _setBlurb (e) {
    this.setState({blurb: e.target.value});
    this._resetSavedStatus();
  },

  _setCategory (e) {
    this.setState({category: e.target.value});
    this._resetSavedStatus();
  },

  _setLocation (e) {
    this.setState({location: e.target.value});
    this._resetSavedStatus();
  },

  _setDuration (e) {
    this.setState({duration: e.target.value});
    this._resetSavedStatus();
  },

  _setGoal (e) {
    this.setState({goal: e.target.value});
    this._resetSavedStatus();
  },

  _handleSave () {
    console.log(this.state);
    if (this.state.saved === 'saved') {
      this.setState({errorMessage: "Your project is already up-to-date"});
    } else {
      this.setState({errorMessage: "", saved: 'saved'});
      this._saveProject();
    }
  },

  _saveProject () {
    if (SavedProjectStore.currentProject().id) {
      SavedProjectActions.updateSavedProject('basics', this.state);
    } else {
      SavedProjectActions.submitSavedProject('basics', this.state);
    }

  },

  render: function() {

    return (
      <div className="wrapper">
        <div className="project-basic-form">
          <ul>
            <li className="project-image">
              <div className="grey-field">
                <div className="attribute-field">Project image</div>
                <div className="field-wrapper">
                  <button>Choose an image from your computer</button>
                </div>
              </div>
            </li>
            <li className="project-title">
              <div className="grey-field">
                <div className="attribute-field">Project title</div>
                <div className="field-wrapper">
                  <input type="text" className="title"
                    onChange={this._setTitle} value={this.state.title || ""}/>
                </div>
              </div>
            </li>
            <li className="project-short-blurb">
              <div className="grey-field">
                <div className="attribute-field">Short blurb</div>
                <div className="field-wrapper">
                  <textarea rows="3" value={this.state.blurb || ""} wrap="hard" className="short-blurb-field"
                    onChange={this._setBlurb} />
                </div>
              </div>
            </li>
            <li className="project-category">
              <div className="grey-field">
                <div className="attribute-field">Category</div>
                <div className="field-wrapper">
                  <button className="category-button"
                    onClick={this._setCategory}>
                    {this.displayCategory  || ""}
                  </button>
                </div>
              </div>
            </li>
            <li className="project-location">
              <div className="grey-field">
                <div className="attribute-field">Project location</div>
                <div className="field-wrapper">
                  <input type="text" className="location"
                    onChange={this._setLocation}
                    value={this.state.location || ""}/>
                </div>
              </div>
            </li>
            <li className="project-duration">
              <div className="grey-field">
                <div className="attribute-field">Funding duration</div>
                <div className="field-wrapper">
                  <div className="num-days">
                    <input value={this.state.duration || ""} className="duration-field" type="number"
                      onChange={this._setDuration} />
                  </div>
                </div>
              </div>
            </li>
            <li className="project-goal">
              <div className="grey-field">
                <div className="attribute-field">Funding goal</div>
                <div className="field-wrapper">
                  $<input type="number" className="goal"
                    onChange={this._setGoal}
                    value={this.state.goal || ""}
                    placeholder="0"/>USD
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div id="save-box" className={this.state.saved}>
          <button className={this.state.saved}
            onClick={this._handleSave}>Save Changes</button>
          <p>{this.state.errorMessage}</p>
        </div>
      </div>
    );
  }

});

module.exports = Basics;

/* TODO
1) Create a delete button (discard changes)
 */
