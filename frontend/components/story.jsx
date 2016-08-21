const React = require('react');
const SavedProjectStore = require('../stores/saved_project_store.js');
const SavedProjectActions = require('../actions/saved_project_actions.js');

const Story = React.createClass({

  getInitialState () {
    return ({
      content: "",
      risks: "",
      saved: 'saved',
      errorMessage: "",
      appearance: 'entering',
      visibility: ""
    });
  },

  componentDidMount () {
    this.blankState = {
      content: "",
      risks: "",
      saved: 'saved',
      errorMessage: "",
      visibility: ""
    };
    this.listener = SavedProjectStore.addListener(this._onChange);
    this.setState(SavedProjectStore.currentProject());
    window.setTimeout(() => {this.setState({appearance: 'entered'});},100);
  },

  componentWillUnmount () {
    this.listener.remove();
    this._saveProject();
  },

  _onChange () {
    this.setState(SavedProjectStore.currentProject());
    this.forceUpdate();
  },

  _setDescription (event) {
    this.setState({content: event.target.value, saved: 'unsaved', visibility: "visible"});
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

  _setRisks (event) {
    this.setState({risks: event.target.value, saved: 'unsaved', visibility: "visible"});
  },

  _handleSave () {
    if (this.state.saved === 'saved') {
      this.setState({errorMessage: "Your project is already up-to-date"});
    } else {
      this.setState({errorMessage: "", saved: 'saved'});
      this._saveProject();
    }
  },

  _saveProject () {
    if (SavedProjectStore.currentProject().id) {
      SavedProjectActions.updateSavedProject('story', this.state);
    } else {
      SavedProjectActions.submitSavedProject('story', this.state);
    }

  },

  render: function() {
    let projectDescriptionInstructions = "Use your project description to \
    share more about what you’re raising funds to do and how you plan to pull \
    it off. It’s up to you to make the case for your project.";

    let projectRisksInstructions = "What are the risks and challenges that come\
     with completing your project, and how are you qualified to overcome them?";

    return (
      <div>
        <div key="story" className={`story-wrapper ${this.state.appearance}`}>
          <div className="story-basic-form">
            <ul>
              <li className="story-content">
                <div className="story-grey-field">
                  <div className="story-attribute-field">Description</div>
                  <div className="story-field-wrapper">
                    <div className="story-instructions">{projectDescriptionInstructions}</div>
                    <div className="text-box">
                      <textarea rows="10" value={this.state.content || ""}
                        wrap="hard" className="story-description-field"
                        onChange={this._setDescription} />
                    </div>
                  </div>
                </div>
              </li>
              <li className="story-risks">
                <div className="story-grey-field">
                  <div className="story-attribute-field">Risks</div>
                  <div className="story-field-wrapper">
                      <div className="story-instructions">{projectRisksInstructions}</div>
                      <div className="text-box">
                        <textarea rows="10" value={this.state.risks || ""}
                          wrap="hard" className="story-risks-field"
                          onChange={this._setRisks} />
                      </div>
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

module.exports = Story;
