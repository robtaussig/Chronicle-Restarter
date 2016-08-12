const React = require('react');
const ProjectCategoryIds = require('../constants/project_category_ids.js');
const SavedProjectActions = require('../actions/saved_project_actions.js');
const UserStore = require('../stores/user_store.js');
const UserActions = require('../actions/user_actions.js');
const SessionStore = require('../stores/session_store.js');
import { browserHistory } from 'react-router';

const ProjectPreview = React.createClass({

  getInitialState () {
    return({progressWidth: 0, user: {}});
  },

  componentDidMount () {
    this.fundedPercentage = this.props.project.funded === 0 ? 0 :
      this.props.project.funded / this.props.project.goal;
    this.fundedWidth = (335 * this.fundedPercentage) > 335 ? 335 :
      (335 * this.fundedPercentage);
    this.setState({progressWidth: this.fundedWidth, user: UserStore.find(this.props.author_id)});
    this.listener = UserStore.addListener(this._handleUser);

  },

  componentWillUnmount () {
    this.listener.remove();
  },

  _handleUser () {
    this.setState({user: UserStore.find(this.props.project.author_id)});
  },

  _goToPage () {
    if (window.location.pathname === "/savedProjects") {
      SavedProjectActions.updateSavedProject('savedProject', this.props.project);
      browserHistory.push('/finalizeProject');
    } else {
      browserHistory.push('/projects/' + this.props.project.id);
    }
  },

  render: function() {
    let _user;
    let _width;
    if (this.state.progressWidth) {
      _width = this.state.progressWidth;
    } else {
      _width = 0;
    }

    return (
      <div>
        <div onClick={this._goToPage} className="project-preview-wrapper">
          <div className="project-preview-image"><img id="default-pic" src={this.props.project.image || window.pug}></img></div>
          <div className="preview-bottom-half">
            <h3 className="project-preview-title">{this.props.project.title || ""}</h3>
            <p className="project-preview-username">by <b>{UserStore.find(this.props.project.author_id).full_name || window.myApp.username}</b></p>
            <br></br>
            <p className="project-preview-blurb">{this.props.project.blurb || "Empty Blurb"}</p>
            <br></br>
            <p className="project-preview-location">{this.props.project.location || "Empty Location"}</p>
            <p className="project-preview-category">{ProjectCategoryIds[this.props.project.category_id || 0].label }</p>
            <br></br>
            <p className="funded-preview"><b>${this.props.project.funded}</b> funded to-date</p>
            <br></br>
            <div className="project-preview-progress-bar">
              <div style={{width: _width + 'px'}} className="progress-overflow"></div>
            </div>
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
