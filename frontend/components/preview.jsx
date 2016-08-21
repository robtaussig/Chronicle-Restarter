const React = require('react');
const SavedProjectStore = require('../stores/saved_project_store.js');
const RewardActions = require('../actions/reward_actions.js');
const RewardStore = require('../stores/reward_store.js');
const RewardItem = require('./reward_item.jsx');
const UserStore = require('../stores/user_store.js');
const SessionStore = require('../stores/session_store.js');
const UserActions = require('../actions/user_actions.js');
const SavedProjectActions = require('../actions/saved_project_actions.js');
const ProjectCategories = require('../constants/project_category_ids');

const Preview = React.createClass({

  getInitialState () {
    return ({
      appearance: "entering",
      rewards: [],
      project_title: "",
      full_name: "",
      image: "",
      project_funders: 0,
      project_funded: 0,
      project_duration: 0,
      project_goal: 0,
      project_location: "",
      project_blurb: "",
      project_category_id: 0,
      user_project_total: 0,
      user_pic_url: "",
      user_website: "",
      user_id: window.myApp.id || SessionStore.currentUser().id,
      project_content: "",
      project_risks: ""
    });
  },

  componentDidMount () {
    this._populate();
    this.rewardListener = RewardStore.addListener(this._onChange);
    this.projectListener = SavedProjectStore.addListener(this._onProjectChange);
    this.userListener = UserStore.addListener(this._onUserChange);
    SavedProjectActions.fetchAllSavedProjects ('preview', this.state.user_id);
    window.setTimeout(() => {this.setState({appearance: 'entered'});},100);
  },

  componentWillUnmount () {
    this.rewardListener.remove();
    this.projectListener.remove();
    this.userListener.remove();
  },

  _onProjectChange () {
    this.setState({user_project_total: SavedProjectStore.allCurrentProjects().length});
  },

  _populate () {
    let project = SavedProjectStore.currentProject();
    let rewards = RewardStore.currentRewards();
    let user = UserStore.currentUser().hasOwnProperty('id') ? UserStore.currentUser() : window.myApp;

    this.setState({
      rewards: rewards,
      project_title: project.title || "Title was left empty",
      author_full_name: user.full_name || user.username,
      user_website: user.website || "",
      image: project.image || "",
      project_funders: project.funders || 0,
      project_funded: project.funded || 0,
      project_goal: project.goal || 0,
      project_location: project.location || "",
      project_duration: project.duration || 0,
      project_blurb: project.blurb || "",
      project_category_id: project.category_id || 0,
      user_project_total: user.project_totals || 0,
      user_pic_url: user.pic_url || <img id="prof-pic" src={window.profile_pic}></img>,
      project_content: project.content || "",
      project_risks: project.risks || ""
    });
  },

  render: function() {

    let _rewards = this.state.rewards.map((reward,idx) => {
      return <div className="single-reward-wrapper" key={idx}>
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
      <div className={this.state.appearance}>
        <div className="preview-wrapper">
          <div className="preview-header">
            <h3 className="preview-project-title">{this.state.project_title}</h3>
              <p className="preview-project-name">
                by <b>{this.state.author_full_name}</b>
              </p>
            <br></br>
          </div>
          <div className="preview-project-image">
            <div>{<img id="default-pic"
              src={this.state.image === "" ? window.default_pic : this.state.image}></img>}</div>
          </div>
          <div className="preview-project-summary">
            <ul className="funders group">
              <li className="funders-num">{this.state.project_funders}</li>
              <li className="funders-text">backers</li>
            </ul>
            <ul className="funded group">
              <li className="funded-num">${this.state.project_funded}</li>
              <li className="funded-goal">
                pledged of ${this.state.project_goal} goal
              </li>
            </ul>
            <div className="preview-project-duration">
              {this.state.project_duration}
            </div>
            <div className="preview-project-remaining">
              days to go
            </div>
            <div className="preview-warning">
              <p>THIS PROJECT IS NOT LIVE</p>
              <br></br>
              <p>This is only a draft that the creator has chosen to share</p>
              <br></br>
            </div>
          </div>
          <div id="era-wrapper" className="era-field"><b>{'Era: '}</b>
            {ProjectCategories[this.state.project_category_id].label}</div>
          <div className="project-location">{this.state.project_location}</div>
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
            <div className="preview-project-blurb">{this.state.project_blurb}</div>
            <div className="user-info">
              <ul className="user-name-pic">
                <li><p className="user-full-name">{this.state.author_full_name}</p></li>
                  <li className="profile-pic">{this.state.user_pic_url}
                  </li>
              </ul>
              <br></br>
              <p className="project-total">{this.state.user_project_total}
                {this.state.user_project_total === 1 ? ' project ' :
                  ' projects '} created</p>
                <br></br>
                <p className="user-website">{this.state.user_website}</p>
              <br></br>
              <ul className="user-contact-info group">
                <li>See full bio</li>
                <li>Contact me</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="content-divider"></div>
        <div className="preview-bottom-page group">
          <div className="project-content-bar">
            <ul className="project-content-nav-bar group">
              <li>Campaign</li>
              <li>Updates</li>
              <li>Comments</li>
              <li>Community</li>
            </ul>
          </div>
          <div className="project-content-field">
            <h3 className="preview-about-field">About this project</h3>
            <div className="project-content">
              <h4>Background</h4>
              {this.state.project_content || "Test Text"}</div>
            <br></br>
            <div className="project-risks">
              <h4>Risks</h4>
              <div className="project-risk-content">{this.state.project_risks}</div>
            </div>
            <div className="project-rewards-sidebar group">
              {_rewards}
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Preview;
