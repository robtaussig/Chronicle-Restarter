const React = require('react');
const ProjectCategoryIds = require('../constants/project_category_ids.js');
const SavedProjectActions = require('../actions/saved_project_actions.js');
const UserStore = require('../stores/user_store.js');
const SessionStore = require('../stores/session_store.js');
import { browserHistory } from 'react-router';

const FocusProject = React.createClass({

  componentDidMount () {

  },

  _goToPage () {
    SavedProjectActions.updateSavedProject('savedProject', this.props.project);
    browserHistory.push('/finalizeProject');
  },

  render () {

    return (
      <div>
        <h1 className="focal-project-header">Your Latest Saved Project</h1>
        <div onClick={this._goToPage} className="focal-project-wrapper">
          <div className="focal-project-image"><img id="default-pic" src={this.props.project.image}></img></div>
          <div className="focal-right-half">
            <h3 className="focal-project-title">{this.props.project.title || ""}</h3>
            <p className="focal-project-username">by <b>{SessionStore.currentUser().full_name || window.myApp.username}</b></p>
            <br></br>
            <p className="focal-project-blurb">{this.props.project.blurb || "Empty Blurb"}</p>
            <br></br>
            <p className="focal-project-location">{this.props.project.location || "Empty Location"}</p>
            <p className="focal-project-category">{ProjectCategoryIds[this.props.project.category_id || 0].label }</p>
            <br></br>
            <div className="focal-project-progress-bar"></div>
            <ul className="focal-project-summary">
              <li className="summary-cat">
                <ul className="focal-project-goal">
                  <li id="focal-basic-amount">${this.props.project.goal || 0}</li>
                  <li id="focal-basic-text">goal</li>
                </ul>
              </li>
              <li className="summary-cat duration-li">
                <ul className="focal-project-duration">
                  <li id="focal-basic-amount">{this.props.project.duration || 0}</li>
                  <li id="focal-basic-text">days to go</li>
                </ul>
              </li>
              <li className="summary-cat">
                <ul className="focal-project-funders">
                  <li id="focal-basic-amount">{this.props.project.funders || 0}</li>
                  <li id="focal-basic-text">backers</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = FocusProject;
