const React = require('react');
const ProjectCategoryIds = require('../constants/project_category_ids.js');
const SavedProjectActions = require('../actions/saved_project_actions.js');
const UserStore = require('../stores/user_store.js');
import { browserHistory } from 'react-router';

const ProjectPreview = React.createClass({

  _goToPage () {
    SavedProjectActions.updateSavedProject('savedProject', this.props.project);
    browserHistory.push('/finalizeProject');
  },

  render: function() {
    return (
      <div>
        <div onClick={this._goToPage} className="project-preview-wrapper">
          <div className="project-preview-image"><img id="default-pic" src={window.pug}></img></div>
          <div className="preview-bottom-half">
            <h3 className="project-preview-title">{this.props.project.title || ""}</h3>
            <p className="project-preview-username">by <b>{UserStore.currentUser().full_name || window.myApp.username}</b></p>
            <br></br>
            <p className="project-preview-blurb">{this.props.project.blurb || "Empty Blurb"}</p>
            <br></br>
            <p className="project-preview-location">{this.props.project.location || "Empty Location"}</p>
            <p className="project-preview-category">{ProjectCategoryIds[this.props.project.category_id || 0].label }</p>
            <br></br>
            <div className="project-preview-progress-bar"></div>
            <ul className="project-preview-summary">
              <li className="preview-summary-cat">
                <ul className="project-preview-goal">
                  <li id="preview-basic-amount">${this.props.project.goal || 0}</li>
                  <li id="preview-basic-text">goal</li>
                </ul>
              </li>
              <li className="preview-summary-cat duration-li">
                <ul className="project-preview-duration">
                  <li id="preview-basic-amount">{this.props.project.duration || 0}</li>
                  <li id="preview-basic-text">days to go</li>
                </ul>
              </li>
              <li className="preview-summary-cat">
                <ul className="project-preview-funders">
                  <li id="preview-basic-amount">{this.props.project.funders || 0}</li>
                  <li id="preview-basic-text">backers</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = ProjectPreview;
