const React = require('react');
import { browserHistory } from 'react-router';

const ProjectNavBar = React.createClass({

  getInitialState () {
    return ({selected: '', enabled: ['basics', 'rewards'], finished: []});
  },

  componentDidMount () {
    this.setState({selected: window.location.pathname.split('/')[2] || 'basics'});
    this.nextOption = {
      'basics': 'rewards',
      'rewards': 'story',
      'story': 'about_you',
      'about_you': 'account',
      'account': 'preview',
      'preview': 'submit'
    };
  },

  _handleClick (e) {
    let target = e.target.id;
    if (this.state.enabled.includes(target)) {
      let newEnabled = this.state.enabled;
      newEnabled.push(this.nextOption[target]);
      this.setState({enabled: newEnabled});
      let prevIdx = this.state.enabled.indexOf(target) - 1;
      prevIdx = prevIdx === - 1 ? 0 : prevIdx;
      let completed = this.state.finished;
      completed.push(this.state.enabled[prevIdx]);
      this.setState({finished: completed});
      this.props.changePage(target);
      this.setState({selected: target});
      browserHistory.push('/finalizeProject/' + target);
    }
  },

  render () {
    return (
      <div className="project-nav-bar">
        <ul>
          <li><span id="basics" className={
            `${this.state.selected} ${this.state.finished.includes('basics') ?
            'finished' : ''} ${this.state.enabled.includes('basics') ?
            '' : 'disabled'}`} onClick={this._handleClick}>Basics</span></li>
          <li><span id="rewards" className={
            `${this.state.selected} ${this.state.finished.includes('rewards') ?
            'finished' : ''} ${this.state.enabled.includes('rewards') ?
            '' : 'disabled'}`} onClick={this._handleClick}>Rewards</span></li>
          <li><span id="story" className={
            `${this.state.selected} ${this.state.finished.includes('story') ?
            'finished' : ''} ${this.state.enabled.includes('story') ?
            '' : 'disabled'}`} onClick={this._handleClick}>Story</span></li>
          <li><span id="about_you" className={
            `${this.state.selected} ${this.state.finished.includes('about_you') ?
            'finished' : ''} ${this.state.enabled.includes('about_you') ?
            '' : 'disabled'}`} onClick={this._handleClick}>About You</span></li>
          <li className="act-li"><span id="account" className={
            `act ${this.state.selected} ${this.state.finished.includes('account') ?
            'finished' : ''} ${this.state.enabled.includes('account') ?
            '' : 'disabled'}`} onClick={this._handleClick}>Account</span></li>
          <li className="prev-li"><span id="preview" className={
            `prev ${this.state.selected} ${this.state.finished.includes('preview') ?
            'finished' : ''} ${this.state.enabled.includes('preview') ?
            '' : 'disabled'}`} onClick={this._handleClick}>Preview</span></li>
          <li className="submit-li"><span id="submit" className={
            `submit-span ${this.state.finished.includes('submit') ?
            'finished' : ''} ${this.state.enabled.includes('submit') ?
            '' : 'disabled'}`}
            onClick={this._handleClick}>Submit for review</span></li>
        </ul>
      </div>
    );
  }

});

module.exports = ProjectNavBar;
