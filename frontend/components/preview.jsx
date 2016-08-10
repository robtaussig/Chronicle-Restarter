const React = require('react');
const SavedProjectStore = require('../stores/saved_project_store.js');
const RewardActions = require('../actions/reward_actions.js');
const RewardStore = require('../stores/reward_store.js');
const RewardItem = require('./reward_item.jsx');
const UserStore = require('../stores/user_store.js');
const ProjectCategories = require('../constants/project_category_ids');

const Preview = React.createClass({

  getInitialState () {
    return ({
      appearance: "entering",
      rewards: [],
      project_title: "",
      full_name: "",
      project_img_urls: "",
      project_funders: 0,
      project_funded: 0,
      project_goal: 0,
      project_category_id: 0,
      user_project_total: 0,
      user_pic_url: "",
      project_content: "",
      project_risks: ""
    });
  },

  componentDidMount () {
    RewardActions.saveAllRewards();
    this._populate();
    this.rewardListener = RewardStore.addListener(this._onChange);
    this.projectListener = SavedProjectStore.addListener(this._onChange);
    this.userListener = UserStore.addListener(this._onChange);
    window.setTimeout(() => {this.setState({appearance: 'entered'});},100);
  },

  componentWillUnmount () {
    this.rewardListener.remove();
    this.projectListener.remove();
    this.userListener.remove();
  },

  _populate () {
    let project = SavedProjectStore.currentProject();
    let rewards = RewardStore.currentRewards();
    let user = UserStore.currentUser();
    console.log(project);
    console.log(rewards);
    console.log(user);

    this.setState({
      rewards: rewards,
      project_title: project.title,
      user_full_name: user.full_name,
      project_img_urls: project.project_img_urls || "",
      project_funders: project.funders || 0,
      project_funded: project.funded || 0,
      project_goal: project.goal || 0,
      project_category_id: project.category_id || 0,
      user_project_total: user.project_totals || 0,
      user_pic_url: user.pic_url || "",
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
            <h3>{this.state.project_title || "Test Text"}</h3>
            <p>by {this.state.user_full_name || "Test Text"}</p>
            <br></br>
          </div>
          <div className="preview-project-image">
            <div>{this.state.project_img_urls || "Project image will go here"}</div>
          </div>
          <div className="preview-project-summary">
            <ul className="funders group">
              <li>{this.state.project_funders || 0}</li>
              <li>backers</li>
            </ul>
            <ul className="funded group">
              <li>{this.state.project_funded || 0}</li>
              <li>pledged of ${this.state.project_goal || 0} goal</li>
            </ul>
            <div className="preview-warning">
              <p>THIS PROJECT IS NOT LIVE</p>
              <br></br>
              <p>This is only a draft that the creator has chosen to share</p>
              <br></br>
            </div>
          </div>
          <div id="era-wrapper" className="era-field"><b>{'Era: '}</b>
            {ProjectCategories[this.state.project_category_id].label}</div>
          <div className="preview-sub-info">
            <div className="social-links-wrapper">
              <ul className="social-links group">
                <li>Share: </li>
                <li>[Tweet]</li>
                <li>[Facebook]</li>
                <li>[Embed]</li>
                <li>[Email]</li>
              </ul>
            </div>
            <div className="user-info">
              <ul className="user-name-pic">
                <li><p className="user-full-name">{this.state.user_full_name ||
                    "Test Text"}</p></li>
                <li>{this.state.user_pic_url || "Test Text"}</li>
              </ul>
              <br></br>
              <p className="project-total">{this.state.user_project_total || 0}
                {this.state.user_project_total === 1 ? ' project ' :
                  ' projects '} created</p>
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
              <li>[Campaign]</li>
              <li>[Updates]</li>
              <li>[Comments]</li>
              <li>[Community]</li>
            </ul>
          </div>
          <div className="project-content-field">
            <h3>About this project</h3>
            <div className="project-content">
              <h4>Background</h4>
              {this.state.project_content || "Test Text"}</div>
            <br></br>
            <div className="project-risks">
              <h4>Risks</h4>
              <div className="project-risk-content">{this.state.project_risks ||
                "Test Text"}</div>
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

module.exports = Preview;

// <ul className="reward-sidebar">{_rewards}</ul>
// let _rewards = this.rewards.map((reward,idx)=> {
//   return <RewardItem key={idx} reward={reward} />;
// });

/* TODO

1) Handle funders
2) Count current funding amount
3) Handle project and user pictures (user pic next to name in user info)
4) Create a project_count attribute
5) Display website below name on social links (or replace test text)
6) Look into flex box for subpage so it moves with preview page
*/
