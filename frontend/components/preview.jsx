const React = require('react');
const SavedProjectStore = require('../stores/saved_project_store.js');
const RewardActions = require('../actions/reward_actions.js');
const RewardStore = require('../stores/reward_store.js');
const RewardItem = require('./reward_item.jsx');
const UserStore = require('../stores/user_store.js');
const ProjectCategories = require('../constants/project_category_ids');

const Preview = React.createClass({

  getInitialState () {
    return ({submitted: false, appearance: "entering", rewards: []});
  },

  componentDidMount () {
    RewardActions.saveAllRewards();
    this.project = SavedProjectStore.currentProject();
    this.rewards = RewardStore.currentRewards();
    this.user = UserStore.currentUser();
    window.setTimeout(() => {this.setState({appearance: 'entered'});},100);
  },

  render: function() {

    return (
      <div className={this.state.appearance}>
        <div className="preview-wrapper">
          <div className="preview-header">
            <h3>{this.project.title || ""}</h3>
            <p>by {this.user.full_name || ""}</p>
            <br></br>
          </div>
          <div className="preview-project-image">
            <div>{this.project.project_img_urls || ""}</div>
          </div>
          <div className="preview-project-summary">
            <ul className="funders">
              <li>{this.project.funders || ""}</li>
              <li>backers</li>
            </ul>
            <ul className="funded">
              <li>{this.project.funded || ""}</li>
              <li>pledged of ${this.project.goal || 0} goal</li>
            </ul>
            <div className="preview-warning">
              <p>THIS PROJECT IS NOT LIVE</p>
              <br></br>
              <p>This is only a draft that the creator has chosen to share.</p>
              <br></br>
            </div>
            <div><b>Era:</b> {ProjectCategories[this.project.category_id].label}</div>
          </div>
          <div className="preview-sub-info">
            <div>
              <ul className="social-links">
                <li>Share: </li>
                <li>[Tweet]</li>
                <li>[Facebook]</li>
                <li>[Embed]</li>
                <li>[Email]</li>
              </ul>
            </div>
            <div className="user-info">
              <p className="user-full-name">{this.user.full_name || ""}</p>
              <br></br>
              <p>{this.user.project_total || 0} {this.user.project_total === 1 ? project : projects} created</p>
              <br></br>
              <ul className="user-contact-info">
                <li>See full bio</li>
                <li>Contact me</li>
                <li>{this.user.pic_url || ""}</li>
              </ul>
            </div>
          </div>
          <div className="project-content-bar">
            <ul className="project-content-nav-bar">
              <li>[Campaign]</li>
              <li>[Updates]</li>
              <li>[Comments]</li>
              <li>[Community]</li>
            </ul>
          </div>
          <div className="project-content-field">
            <h3>About this project</h3>
            <div className="project-content">{this.project.content || ""}</div>
            <br></br>
            <h4>Risks</h4>
            <div className="project-risks">{this.project.risks || ""}</div>
          </div>
          <div className="project-rewards-sidebar">
            {this.rewards.length}
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
3) Handle project and user pictures
4) Create a project_count attribute

*/
