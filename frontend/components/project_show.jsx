const React = require('react');
const ProjectCategories = require('../constants/project_category_ids.js');
const ProjectActions = require('../actions/project_actions.js');
const ProjectStore = require('../stores/project_store.js');
const RewardActions = require('../actions/reward_actions.js');
const RewardStore = require('../stores/reward_store.js');
const Comments = require('./comments.jsx');
const Updates = require('./updates.jsx');
const UserStore = require('../stores/user_store.js');
const SessionStore = require('../stores/session_store.js');
const UserActions = require('../actions/user_actions.js');
const DeleteProject = require('./delete_project.jsx');
const UpdateStore = require('../stores/update_store.js');
const UpdateActions = require('../actions/update_actions.js');
const CommentActions = require('../actions/comment_actions.js');
const CommentStore = require('../stores/comment_store.js');

import { browserHistory } from 'react-router';

const ProjectShow = React.createClass({

  getInitialState () {
    return ({
      user: "",
      userProjects: [],
      backers: this.props.project.funders,
      funded: this.props.project.funded,
      selected: "",
      message: "",
      location: this.props.project.location,
      userBio: "hidden",
      email: "hidden",
      highlight: "",
      bottomPage: 0,
      reveal: "campaign",
      image: "",
      comments: [],
      updates: []
    });
  },

  componentDidMount () {
    this.projectListener = ProjectStore.addListener(this._onProjectChange);
    let user = this.props.project.author_id;
    this.userListener = UserStore.addListener(this._onUserChange);
    if (UserStore.allUsers().length === 0) {
      UserActions.fetchAllUsers('front');
    } else {
      let thisUser = UserStore.find(this.props.project.author_id);
      this.setState({user: thisUser, userProjects: thisUser.projects});
    }
    this.commentListener = CommentStore.addListener(this._onCommentChange);
    CommentActions.fetchAllComments('project',this.props.project.id);
    this.updateListener = UpdateStore.addListener(this._onUpdateChange);
    UpdateActions.fetchAllUpdates('project',this.props.project.id);
  },

  componentWillUnmount () {
    this.projectListener.remove();
    this.updateListener.remove();
    this.userListener.remove();
    this.commentListener.remove();
    clearTimeout(this.timeout);
  },

  _onCommentChange () {
    this.setState({comments: CommentStore.allComments()});
  },

  _onUpdateChange () {
    this.setState({updates: UpdateStore.allUpdates()});
  },

  onDelete () {
    ProjectActions.deleteProject('show',this.props.project.id);
    browserHistory.push('/');
  },

  _onUserChange () {
    let user = UserStore.find(this.props.project.author_id);
    this.setState({user: user, userProjects: user.projects});
  },

  _switchToCampaign (event) {
    this.setState({bottomPage: 0, reveal: "campaign"});
  },

  _switchToUpdates (event) {
    this.setState({bottomPage: 2});
    window.setTimeout(() => {
      this.setState({reveal: "updates"});
    },100);
  },

  _switchToComments (event) {
    this.setState({bottomPage: 1});
    window.setTimeout(() => {
      this.setState({reveal: "comments"});
    },100);
  },

  _highlightRewards (event) {
    this.setState({highlight: "highlight"});
    window.setTimeout(() => {
      this.timeout = this.setState({highlight: ""});
    },1500);
  },

  _emailAuthor (event) {
    this.setState({userBio: "", email: "revealed"});
  },

  _seeBio (event) {
    this.setState({email: "", userBio: "revealed"});
  },

  _resetReveals (event) {
    if (event.target.innerHTML === "See full bio" ||
      event.target.innerHTML === "Contact me") {
      return;
    } else {
      this.setState({userBio: "hidden", email: "hidden"});
    }
  },

  _selectReward (idx, event) {
    let _userId = SessionStore.currentUser().id || window.myApp.id;
    if (this.props.project.author_id === _userId) {
      this.setState({selected: this.positions[idx],
        message: "You can't back your own project"});
    } else if (!_userId){
      this.setState({selected: this.positions[idx],
        message: "You must be signed in to back a project"});
    } else {
      let reward = this.props.project.rewards[idx];
      RewardActions.fundProject('show', reward.id, _userId);
      this.setState({backers: this.state.backers + 1, funded: this.state.funded
        + reward.amount, selected: this.positions[idx], message:
        "You have selected this reward!"});
    }
  },

  changePicture (file, results) {
    let formData = new FormData();
    formData.append("project[image]", file);
    formData.append("id", this.props.project.id);
    ProjectActions.updateProject('show',formData);
  },

  onChangePic (e) {
    let file = e.currentTarget.files[0];
    let fileReader = new FileReader();
    fileReader.onloadend = function () {
      this.changePicture(file, fileReader.result);
    }.bind(this);
    if (file) {
      fileReader.readAsDataURL(file);
    }
  },

  render: function() {

    this.positions = ['zero', 'one', 'two', 'three'];
    let _revealReward = this.state.reveal === 'campaign' ? 'reveal-reward' : "";

    let _rewards = this.props.project.rewards.slice(0,4).map((reward,idx) => {
      return <div onClick={(event) => this._selectReward(idx, event)}
        className={`single-reward-wrapper final ${this.state.highlight} ${_revealReward}`}
          key={idx}>
        <h3>Pledge ${reward.amount} or more</h3>
        <p className="reward-number">Reward #{idx + 1}</p>
        <br></br>
        <h4 className="reward-title">{reward.title}</h4>
        <br></br>
        <p className="reward-description">{reward.description}</p>
        <br></br>
        <p className="reward-availability">{`Available for ${reward.quantity}
          backers`}</p>
        <div id={this.positions[idx] || idx}
          className={`${this.state.selected ||
          idx} funded-message`}>{this.state.message}</div>
      </div>;
    });

    let _comments = this.state.comments || [];
    let _updates = this.state.updates || [];

    let _currentBottomPage = [
      [],
      <Comments revealed={this.state.reveal} comments={_comments}
        project={this.props.project}/>,
      <Updates updates={_updates} project={this.props.project}
        revealed={this.state.reveal} />
    ][this.state.bottomPage || 0];

    let _currentUser = window.myApp.email || SessionStore.currentUser().email;

    let _deleteProject;
    if (this.state.user.email === _currentUser ||
       _currentUser === 'rob@gmail.com' || _currentUser === 'admin@gmail.com') {
      _deleteProject = <DeleteProject action="delete" callback={this.onDelete} project={this.props.project} />;
    } else {
      _deleteProject = <DeleteProject project="wrong user" />;
    }

    let _changePicture;
    if (this.state.user.email === _currentUser ||
       _currentUser === 'rob@gmail.com' || _currentUser === 'admin@gmail.com') {
       _changePicture = ['Change picture', <input type="file" onChange={this.onChangePic} />];
    } else {
      _changePicture = "";
    }
    return (
      <div onClick={this._resetReveals}>
        <div id="top" className="preview-wrapper">
          <div className="preview-header">
            <h3 className="preview-project-title">
              {this.props.project.title}
            </h3>
              <p className="preview-project-name">
                by <b>{this.state.user.full_name || this.state.user.username ||
                  "No name"}</b>
              </p>
            <br></br>
          </div>
          <div className="change-picture">{_changePicture}</div>
          <div className="preview-project-image">
            <div><img id="default-pic"
              src={this.props.project.image}></img></div>
          </div>
          <div className="preview-project-summary">
            <ul className="funders group">
              <li className="funders-num-final">{this.state.backers || 0}</li>
              <li className="funders-text">backers</li>
            </ul>
            <ul className="funded group">
              <li className="funded-num-final">${this.state.funded || 0}</li>
              <li className="funded-goal">
                pledged of ${this.props.project.goal} goal
              </li>
            </ul>
            <div className="preview-project-duration-final">
              {this.props.project.duration}
            </div>
            <div className="preview-project-remaining">
              days to go
            </div>
            <a href="#back-project" onClick={this._highlightRewards}>
              <div className="back-project">
                Back this project
              </div>
            </a>
            <div>
              {_deleteProject}
            </div>
          </div>
          <div id="era-wrapper" className="era-field"><b>{'Era: '}</b>
            {ProjectCategories[this.props.project.category_id].label}</div>
          <div className="project-location">{this.state.location}</div>
          <div className="preview-sub-info">
            <div className="social-links-wrapper">
              <ul className="social-links group">
                <li><b>Share:</b> </li>
                <li><a className="twitter-share-button"
                  target="_blank"
                  href="https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20project!"
                  text="Check out this awesome project!">
                  <img src={window.twitter}/></a></li>
                  <div id="fb-root"></div>
              	<li><div className="fb-share-button"
                  data-href="http://www.chronicle-restarter.com"
                  data-layout="button" data-size="large"
                  data-mobile-iframe="true">
                <a className="fb-xfbml-parse-ignore" target="_blank"
                  href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.chronicle-restarter.com%2F&amp;src=sdkpreparse">
                <img src={window.facebook}/></a></div></li>
              </ul>
            </div>
            <div className="preview-project-blurb">
              {this.props.project.blurb}
            </div>
            <div className="user-info">
              <ul className="user-name-pic">
                <li><p className="user-full-name">{this.state.user.full_name ||
                  this.state.user.username || "No name"}</p></li>
                  <li className="profile-pic">
                    <img id="nav-prof-pic" src={this.state.user.pic_url ||
                      window.profile_pic}></img>
                  </li>
              </ul>
              <br></br>
              <p className="project-total">{this.state.userProjects.length || 0}
                {this.state.userProjects.length === 1 ? ' project ' :
                  ' projects '} created</p>
                <br></br>
                <a href={`http://${this.state.user.website}`}>
                  <p className="user-website final">
                    {this.state.user.website}
                  </p>
                </a>
              <br></br>
              <ul className="user-contact-info final group">
                <li onClick={this._seeBio}>See full bio</li>
                <div className={`user-biography ${this.state.userBio}`}>
                  {this.state.user.biography}
                </div>
                <li onClick={this._emailAuthor}>Contact me</li>
              </ul>
              <div className={`user-email ${this.state.email}`}>
                {this.state.user.email}
              </div>
            </div>
          </div>
        </div>
        <div className="content-divider"></div>
        <div className="preview-bottom-page group">
          <div id="back-project" className="project-content-bar">
            <ul className="project-content-nav-bar final group">
              <li id="campaign" className={this.state.reveal}
                onClick={this._switchToCampaign}>Campaign</li>
              <li id="updates" className={this.state.reveal}
                onClick={this._switchToUpdates}>
                {`Updates (${this.state.updates.length || "0"})`}
              </li>
              <li id="comments" className={this.state.reveal}
                onClick={this._switchToComments}>
                {`Comments (${this.state.comments.length || "0"})`}
              </li>
            </ul>
          </div>

          <div className="project-content-field">
            <h3 className="preview-about-field">About this project</h3>
            <div className="project-content">
              <h4>Background</h4>
              {this.props.project.content || "Test Text"}</div>
            <br></br>
            <div className="project-risks">
              <h4>Risks</h4>
              <div className="project-risk-content">
                {this.props.project.risks}
              </div>
            </div>
            <div className="project-rewards-sidebar">
              {_rewards}
            </div>
            {_currentBottomPage}
          </div>
        </div>
        <div className="bottom-page-wrapper">
        </div>
      </div>
    );
  }
});

module.exports = ProjectShow;
