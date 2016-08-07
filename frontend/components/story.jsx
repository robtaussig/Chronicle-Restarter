const React = require('react');

const Story = React.createClass({

  getInitialState () {
    return ({description: "", risk: ""});
  },

  componentDidMount () {
    
  },

  _setDescription () {

  },

  _setRisks () {

  },

  render: function() {
    let projectDescriptionInstructions = "Use your project description to \
    share more about what you’re raising funds to do and how you plan to pull \
    it off. It’s up to you to make the case for your project.";

    let projectRisksInstructions = "What are the risks and challenges that come\
     with completing your project, and how are you qualified to overcome them?";

    return (
      <div className="story-wrapper">
        <div className="project-description-title">Project Description</div>
        <div className="project-description-wrapper">
          <ul>
            <li className="instructions">{projectDescriptionInstructions}</li>
            <li>
              <textarea rows="10" value={this.state.description || ""}
                wrap="hard" className="project-description-field"
                onChange={this._setDescription} />
            </li>
          </ul>
        </div>
        <div className="project-risks-title">Risks and challenges</div>
        <div className="project-risks-wrapper">
          <ul>
            <li className="risks">{projectRisksInstructions}</li>
            <li>
              <textarea rows="5" value={this.state.risks || ""}
                wrap="hard" className="project-risks-field"
                onChange={this._setRisks} />
            </li>
          </ul>
        </div>
      </div>
    );
  }

});

module.exports = Story;
