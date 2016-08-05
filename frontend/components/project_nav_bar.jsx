const React = require('react');
import { browserHistory } from 'react-router';

const ProjectNavBar = React.createClass({

  getInitialState () {
    return ({selected: ''});
  },

  componentDidMount () {
    this.setState({selected: 'basics'});
  },

  _handleClick (e) {
    this.setState({selected: e.target.id});
    browserHistory.push('/finalizeProject/' + e.target.id);
    // this.props.changePage(e.target.id);
  },

  render () {
    return (
      <div className="project-nav-bar">
        <ul>
          <li><span id='basics' className={this.state.selected}
            onClick={this._handleClick}>Basics</span></li>
          <li><span id='rewards' className={this.state.selected}
            onClick={this._handleClick}>Rewards</span></li>
          <li><span id='story' className={this.state.selected}
            onClick={this._handleClick}>Story</span></li>
          <li><span id='about_you' className={this.state.selected}
            onClick={this._handleClick}>About You</span></li>
          <li className="act-li"><span id='account' className={`act ${this.state.selected}`}
            onClick={this._handleClick}>Account</span></li>
          <li className="prev-li"><span id='preview' className={`prev ${this.state.selected}`}
            onClick={this._handleClick}>Preview</span></li>
          <li className="submit-li"><span id='submit' className="submit-span"
            onClick={this._handleClick}>Submit for review</span></li>
        </ul>
      </div>
    );
  }

});

module.exports = ProjectNavBar;

/* TODO

1) Submit hover color should be red until mandatory fields are complete.




*/
