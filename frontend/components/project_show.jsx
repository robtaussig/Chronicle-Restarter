const React = require('react');
const ProjectCategories = require('../constants/project_category_ids.js');
const ProjectStore = require('../stores/project_store.js');
const RewardActions = require('../actions/reward_actions.js');
const RewardStore = require('../stores/reward_store.js');
const UserStore = require('../stores/user_store.js');
const UserActions = require('../actions/user_actions.js');
import { browserHistory } from 'react-router';

const ProjectShow = React.createClass({

  getInitialState () {
    return ({
      user: "",
      userProjects: [],
      backers: 0,
      funded: 0,
    });
  },

  componentDidMount () {
    this.projectListener = ProjectStore.addListener(this._onProjectChange);
    let user = this.props.project.author_id;
    this.userListener = UserStore.addListener(this._onUserChange);
    this.rewardListener = RewardStore.addListener(this._onRewardChange);
    UserActions.fetchUser('show', user);
    // RewardActions.fetchFunding('show', this.props.project.id);
  },

  componentWillUnmount () {
    this.projectListener.remove();
    this.userListener.remove();
  },

  _onProjectChange () {

  },

  _onRewardChange () {
    let funding = RewardStore.currentFunding();
    this.setState({funded: funding.funded, backers: funding.funders});
  },

  _onUserChange () {
    let user = UserStore.currentUser();
    this.setState({user: user, userProjects: user.projects});
  },

  _switchToCampaign (event) {
    debugger
  },

  _switchToUpdates (event) {
    debugger
  },

  _switchToComments (event) {
    debugger
  },

  _switchToCommunity (event) {
    debugger
  },

  _backProject (event) {
    debugger
  },

  _selectReward (idx, event) {
    let rewardId = this.props.project.rewards[idx].id;
    debugger
    RewardActions.fundProject('show', rewardId);
  },

  render: function() {

    let _rewards = this.props.project.rewards.slice(0,4).map((reward,idx) => {
      return <div onClick={(event) => this._selectReward(idx, event)} className="single-reward-wrapper final" key={idx}>
        <h3>Pledge ${reward.amount} or more</h3>
        <p className="reward-number">Reward #{idx + 1}</p>
        <br></br>
        <h4 className="reward-title">{reward.title}</h4>
        <br></br>
        <p className="reward-description">{reward.description}</p>
        <br></br>
        <p className="reward-availability">{`Available for ${reward.quantity}
          backers`}</p>
      </div>;
    });

    return (
      <div>
        <div className="preview-wrapper">
          <div className="preview-header">
            <h3 className="preview-project-title">{this.props.project.title}</h3>
              <p className="preview-project-name">
                by <b>{this.state.user.full_name || this.state.user.username || "No name"}</b>
              </p>
            <br></br>
          </div>
          <div className="preview-project-image">
            <div>{<img id="default-pic" src={this.props.project.project_img_urls === 'window.pug' ? window.pug : this.props.project_img_urls}></img>}</div>
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
            <div onClick={this._backProject} className="back-project">Back this project</div>
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
            <div className="preview-project-blurb">{this.props.project.blurb}</div>
            <div className="user-info">
              <ul className="user-name-pic">
                <li><p className="user-full-name">{this.state.user.full_name || this.state.user.username || "No name"}</p></li>
                  <li className="profile-pic">{this.state.user.pic_url || 'user pic'}
                  </li>
              </ul>
              <br></br>
              <p className="project-total">{this.state.userProjects.length || 0}
                {this.state.userProjects.length === 1 ? ' project ' :
                  ' projects '} created</p>
                <br></br>
                <a href={`http://${this.state.user.website}`}><p className="user-website final">{this.state.user.website}</p></a>
              <br></br>
              <ul className="user-contact-info final group">
                <li onClick={this._seeBio}>See full bio</li>
                <li onClick={this._contactMe}>Contact me</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="content-divider"></div>
        <div className="preview-bottom-page group">
          <div className="project-content-bar">
            <ul className="project-content-nav-bar final group">
              <li onClick={this._switchToCampaign}>Campaign</li>
              <li onClick={this._switchToUpdates}>Updates</li>
              <li onClick={this._switchToComments}>Comments</li>
              <li onClick={this._switchToCommunity}>Community</li>
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
              <div className="project-risk-content">{this.props.project.risks}</div>
            </div>
            <div className="project-rewards-sidebar">
              {_rewards}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ProjectShow;
