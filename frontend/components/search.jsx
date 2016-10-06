const React = require('react');
const Link = require('react-router').Link;
const ProjectStore = require('../stores/project_store.js');
const ProjectActions = require('../actions/project_actions.js');
import { browserHistory } from 'react-router';

const Search = React.createClass({

  getInitialState () {
    return ({searchParams: "", searchBar: false});
  },

  toggleSearch () {
    if (window.location.pathname !=="/projects/") {
      browserHistory.push("/projects");
    }
    if (this.state.searchBar) {
      this.setState({searchBar: false});
    } else {
      this.setState({searchBar: true});
    }
  },

  _search (e) {
    this.setState({searchParams: e.target.value});
    ProjectActions.filterBy(this.state.searchParams);
  },

  render () {
    let _display = this.state.searchBar ? [<ul key="88"><li className="x-icon">
      <img onClick={this.toggleSearch} id="search-icon" src={window.x_mark}/>
      </li>,<li><input type="text" className="search"
      onChange={this._search} value={this.state.params}/></li></ul>] :
      [<img key="99" onClick={this.toggleSearch} id="search-icon" src={window.search}/>];
    return (
      <div className="search">
        {_display}
      </div>
    );
  }

});

module.exports = Search;
