const React = require('react');
const ProjectCategoryIds = require('../constants/project_category_ids.js');
const SavedProjectActions = require('../actions/saved_project_actions.js');
const UserStore = require('../stores/user_store.js');
const SessionStore = require('../stores/session_store.js');
import { browserHistory } from 'react-router';

const FocusProject = React.createClass({

  getInitialState () {
    return ({
      user: "", image: this.props.project.project_img_urls === 'null' ?
      "" : this.props.project.project_img_urls
    });
  },

  componentDidMount () {
    this.setState({user: this.props.project.author.full_name ||
      this.props.project.author.username});
  },

  _goToPage () {
    SavedProjectActions.updateSavedProject('savedProject', this.props.project);
    browserHistory.push('/finalizeProject');
  },

  render () {
    let _picture = this.props.project.image === "/assets/default_pic.png" ?
      window.default_pic : this.props.project.image;
    return (
      <div>
        <h1 className="focal-project-header">Your Latest Saved Project</h1>
        <div onClick={this._goToPage} className="focal-project-wrapper">
          <div className="focal-project-image"><img id="default-pic"
            src={_picture || window.default_pic}></img></div>
          <div className="focal-right-half">
            <h3 className="focal-project-title">{this.props.project.title ===
              'null' ? "" : this.props.project.title}</h3>
            <p className="focal-project-username">
              by <b>{this.state.user}</b>
            </p>
            <br></br>
            <p className="focal-project-blurb">{this.props.project.blurb ===
              'null' ? "" : this.props.project.blurb}</p>
            <br></br>
            <p className="focal-project-location">{
              this.props.project.location === 'null' ?
              "" : this.props.project.location
            }</p>
            <p className="focal-project-category">{
              ProjectCategoryIds[this.props.project.category_id === 'null' ?
               0 : this.props.project.category_id].label
            }</p>
            <br></br>
            <div className="focal-project-progress-bar"></div>
            <ul className="focal-project-summary">
              <li className="summary-cat">
                <ul className="focal-project-goal">
                  <li id="focal-basic-amount">${this.props.project.goal ===
                    'null' ? 0 : this.props.project.goal}</li>
                  <li id="focal-basic-text">goal</li>
                </ul>
              </li>
              <li className="summary-cat duration-li">
                <ul className="focal-project-duration">
                  <li id="focal-basic-amount">{this.props.project.duration ===
                    'null' ? 0 : this.props.project.duration}</li>
                  <li id="focal-basic-text">{this.props.project.duration === 1 ?
                    'day to go' : 'days to go'}</li>
                </ul>
              </li>
              <li className="summary-cat">
                <ul className="focal-project-funders">
                  <li id="focal-basic-amount">{this.props.project.funders ===
                    'null' ? 0 : this.props.project.funders}</li>
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
