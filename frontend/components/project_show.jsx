const React = require('react');
const ProjectCategories = require('../constants/project_category_ids.js');
const ProjectStore = require('../stores/project_store.js');
const RewardActions = require('../actions/reward_actions.js');
const RewardStore = require('../stores/reward_store.js');
const Comments = require('./comments.jsx');
const Community = require('./community.jsx');
const Updates = require('./updates.jsx');
const UserStore = require('../stores/user_store.js');
const SessionStore = require('../stores/session_store.js');
const UserActions = require('../actions/user_actions.js');
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
      userBio: "hidden",
      email: "hidden",
      highlight: "",
      bottomPage: 0,
      reveal: "campaign",
      image: ""
    });
  },

  componentDidMount () {
    this.projectListener = ProjectStore.addListener(this._onProjectChange);
    let user = this.props.project.author_id;
    this.userListener = UserStore.addListener(this._onUserChange);
    UserActions.fetchUser('show', user);
    console.log(this.props);
  },

  componentWillUnmount () {
    this.projectListener.remove();
    this.userListener.remove();
    clearTimeout(this.timeout);
  },

  _onUserChange () {
    let user = UserStore.currentUser();
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

  _switchToCommunity (event) {
    this.setState({bottomPage: 3});
    window.setTimeout(() => {
      this.setState({reveal: "community"});
    },100);
  },

  _highlightRewards (event) {
    this.setState({highlight: "highlight"});
    window.setTimeout(() => {
      this.timeout = this.setState({highlight: ""});
    },1500);
  },

  _emailAuthor (event) {
    this.setState({email: "revealed"});
  },

  _seeBio (event) {
    this.setState({userBio: "revealed"});
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
    let _userId = UserStore.currentUser().id || window.myApp.id;
    if (this.props.project.author_id === _userId) {
      this.setState({selected: this.positions[idx],
        message: "You can't back your own project"});
    } else {
      let reward = this.props.project.rewards[idx];
      RewardActions.fundProject('show', reward.id, _userId);
      this.setState({backers: this.state.backers + 1, funded: this.state.funded
        + reward.amount, selected: this.positions[idx], message:
        "You have selected this reward!"});
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

    let _currentBottomPage = [
      [],
      <Comments revealed={this.state.reveal} />,
      <Updates revealed={this.state.reveal} />,
      <Community revealed={this.state.reveal} />
    ][this.state.bottomPage || 0];



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
          <div className="preview-project-image">
            <div>{<img id="default-pic"
              src={this.props.project.image === 'window.pug' ?
              window.pug : this.props.project.image}></img>}</div>
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
          </div>
          <div id="era-wrapper" className="era-field"><b>{'Era: '}</b>
            {ProjectCategories[this.props.project.category_id].label}</div>
          <div className="project-location">{this.props.project.location}</div>
          <div className="preview-sub-info">
            <div className="social-links-wrapper">
              <ul className="social-links group">
                <li><b>Share:</b> </li>
                <li>[Tweet]</li>
                <li>[Facebook]</li>
                <li>[Embed]</li>
                <li>[Email]</li>
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
                    {this.state.user.pic_url || 'user pic'}
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
              <li id="campaign" className={this.state.reveal} onClick={this._switchToCampaign}>Campaign</li>
              <li id="updates" className={this.state.reveal} onClick={this._switchToUpdates}>Updates</li>
              <li id="comments" className={this.state.reveal} onClick={this._switchToComments}>Comments</li>
              <li id="community" className={this.state.reveal} onClick={this._switchToCommunity}>Community</li>
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
          </div>
        </div>
        <div className="bottom-page-wrapper">
          {_currentBottomPage}
        </div>
      </div>
    );
  }
});

module.exports = ProjectShow;
