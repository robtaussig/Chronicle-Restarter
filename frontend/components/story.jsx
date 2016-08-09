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
      appearance: 'entering'
    });
  },

  componentDidMount () {
    this.listener = SavedProjectStore.addListener(this._onChange);
    this.setState(SavedProjectStore.currentProject());
    window.setTimeout(() => {this.setState({appearance: 'entered'});},200);
  },

  componentWillUnmount () {
    this.listener.remove();
  },

  _onChange () {
    this.setState(SavedProjectStore.currentProject());
    this.forceUpdate();
  },

  _setDescription (event) {
    this.setState({content: event.target.value, saved: 'unsaved'});
  },

  _deleteProject () {
    SavedProjectActions.deleteSavedProject('finalizeProject',
      SavedProjectStore.currentProject());
    if (SavedProjectStore.currentProject().id) {
      this.setState({deleteMessage: "Project deleted"});
    } else {
      this.setState({deleteMessage: "No project to delete"});
    }

    let that = this;
    window.setTimeout(()=> {
      this.setState({deleteMessage: ""});
    },2000);
  },

  _setRisks (event) {
    this.setState({risks: event.target.value, saved: 'unsaved'});
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
        <div className="delete-wrapper">
          <button className="delete-project" onClick={this._deleteProject}>
            Clear</button>
          <p className="delete-message">{this.state.deleteMessage}</p>
        </div>
      </div>
    );
  }

});

module.exports = Story;
