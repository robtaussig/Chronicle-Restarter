const React = require('react');
const SavedProjectActions = require('../actions/saved_project_actions.js');

const Basics = React.createClass({

  getInitialState () {
    return ({
      image: {},
      title: "",
      blurb: "",
      category: "",
      location: "",
      duration: 0,
      goal: 0,
      saved: false,
      errorMessage: ""
    });
  },

  componentDidMount () {
    this._setPrefilledData();
  },

  componentWillUnmount () {

  },

  _onChange () {

  },

  _resetSavedStatus () {
    this.setState({saved: false});
    this.setState({errorMessage: ""});
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

  _setPrefilledData () {
    this.setState(this.props.data);
  },

  _saveChangeToPage () {
    this.props.onSave(this.state);
  },

  _handleSave () {
    console.log(this.state);
    if (this.state.saved) {
      this.setState({errorMessage: "Your project is already up-to-date"});
    } else {
      this.setState({errorMessage: ""});
      this.setState({saved: true});
      this._saveChangeToPage ();
    }


    // SavedProjectActions.submitSavedProject('basicForm', this.state);
    // Use modal to show quick preview + confirmation
  },

  render: function() {
    let rows = 3;
    let saved = this.state.saved ? 'saved' : 'unsaved';
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
                    onChange={this._setTitle} value={this.state.title}/>
                </div>
              </div>
            </li>
            <li className="project-short-blurb">
              <div className="grey-field">
                <div className="attribute-field">Short blurb</div>
                <div className="field-wrapper">
                  <textarea rows="3" wrap="hard" className="short-blurb-field"
                    onChange={this._setBlurb} />
                </div>
              </div>
            </li>
            <li className="project-category">
              <div className="grey-field">
                <div className="attribute-field">Category</div>
                <div className="field-wrapper">
                  <button className="category-button"
                    onClick={this._setCategory}>{this.state.category}</button>
                </div>
              </div>
            </li>
            <li className="project-location">
              <div className="grey-field">
                <div className="attribute-field">Project location</div>
                <div className="field-wrapper">
                  <input type="text" className="location"
                    onChange={this._setLocation}
                    placeholder={this.state.location}/>
                </div>
              </div>
            </li>
            <li className="project-duration">
              <div className="grey-field">
                <div className="attribute-field">Funding duration</div>
                <div className="field-wrapper">
                  <div className="num-days">
                    <input className="duration-field" type="text"
                      onChange={this._setDuration} />
                  </div>
                </div>
              </div>
            </li>
            <li className="project-goal">
              <div className="grey-field">
                <div className="attribute-field">Funding goal</div>
                <div className="field-wrapper">
                  <input type="text" className="goal"
                    onChange={this._setGoal}
                    placeholder="$0 USD"/>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div id="save-box" className={saved}>
          <button className={saved} onClick={this._handleSave}>Save Changes</button>
          <p>{this.state.errorMessage}</p>
        </div>
      </div>
    );
  }

});

module.exports = Basics;
