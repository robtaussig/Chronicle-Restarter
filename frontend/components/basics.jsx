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
      saved: false
    });
  },

  componentDidMount () {
    this._setPrefilledData();
  },

  componentWillUnmount () {

  },

  _onChange () {

  },

  _setTitle () {

  },

  _setImage () {

  },

  _setBlurb () {

  },

  _setCategory () {

  },

  _setLocation () {

  },

  _setDuration () {

  },

  _setDurationRadio () {

  },

  _setGoal () {

  },

  _setPrefilledData () {
    this.setState(this.props.data);
  },

  _saveChangeToPage () {
    this.props.onSave(this.state);
  },

  _handleSave () {
    this._saveChangeToPage ();
    SavedProjectActions.submitSavedProject(this.state);
    // Use modal to show quick preview + confirmation
  },

  render: function() {
    let rows = 3;
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
        <div id="save-box">
          <button onClick={this._handleSave}>Save Changes</button>
        </div>
      </div>
    );
  }

});

module.exports = Basics;
