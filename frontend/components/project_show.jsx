const React = require('react');
const ProjectCategories = require('../constants/project_category_ids.js');

const ProjectShow = React.createClass({

  render: function() {

    let _rewards = [];

    return (
      <div>
        <div className="preview-wrapper">
          <div className="preview-header">
            <h3 className="preview-project-title">{this.props.project.title}</h3>
              <p className="preview-project-name">
                by <b>{this.props.project.author_full_name}</b>
              </p>
            <br></br>
          </div>
          <div className="preview-project-image">
            <div>{<img id="default-pic" src={this.props.project.project_img_urls === 'window.pug' ? window.pug : this.props.project_img_urls}></img>}</div>
          </div>
          <div className="preview-project-summary">
            <ul className="funders group">
              <li className="funders-num">{this.props.project_funders || 0}</li>
              <li className="funders-text">backers</li>
            </ul>
            <ul className="funded group">
              <li className="funded-num">${this.props.project_funded || 0}</li>
              <li className="funded-goal">
                pledged of ${this.props.project.goal} goal
              </li>
            </ul>
            <div className="preview-project-duration">
              {this.props.project.duration}
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
                <li><p className="user-full-name">{this.props.project.author_full_name}</p></li>
                  <li className="profile-pic">{this.props.user_pic_url || 'user pic'}
                  </li>
              </ul>
              <br></br>
              <p className="project-total">{this.props.user_project_total || 0}
                {this.props.user_project_total === 1 ? ' project ' :
                  ' projects '} created</p>
                <br></br>
                <p className="user-website">{this.props.project.website}</p>
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
