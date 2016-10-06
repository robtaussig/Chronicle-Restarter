const React = require('react');
const ProjectStore = require('../stores/project_store.js');
const ProjectActions = require('../actions/project_actions.js');
const ProjectCategoryIds = require('../constants/project_category_ids');
const ProjectShow = require('./project_show.jsx');
const ProjectPreview = require('./project_preview.jsx');
import { browserHistory } from 'react-router';

const ProjectIndex = React.createClass({

  getInitialState () {
    return({projects: [], flex: ""});
  },

  componentDidMount () {
    this.listener = ProjectStore.addListener(this._onProjectChange);
    if (this.props.params.projectId) {
      this._showProject();
    } else {
      this._showProjects();
    }
    if (ProjectStore.allProjects().length === 0) {
      ProjectActions.fetchAllProjects('index');
    }
  },

  componentWillUnmount () {
    this.listener.remove();
  },

  shuffle (array) {
    let j, x, i;
    for (i = array.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = array[i - 1];
        array[i - 1] = array[j];
        array[j] = x;
    }
    return array;
  },

  componentWillUpdate () {
  },

  _showProject () {
    this.setState({flex: "", projects: ProjectStore.find(parseInt(this.props.params.projectId))});
  },

  _showProjects (category) {
    if (category === "all") {
      this.setState({flex: "flex", projects: ProjectStore.allProjects()});
    } else {
      this.setState({flex: "flex", projects: ProjectStore.allProjects(category)});
    }
  },

  _handleCategory (event) {
    if (event.target.innerHTML === "All projects") {
      this._showProjects("all");
    } else {
      let categoryId = ProjectCategoryIds.filter(projectCat=>{
        return projectCat.label === event.target.innerHTML;
      })[0].value - 1;
      this._showProjects(categoryId);
    }
  },

  _onProjectChange () {
    this.setState({projects: ProjectStore.filteredProjects()});
  },

  render () {
    let _display;
    if (this.state.projects.length === 1) {
      _display = [
        <ProjectShow key="solo" project={this.state.projects[0]} />];
    } else {
      _display = [
        <ul className="categories-list group">
        <li className="category-item" onClick={this._handleCategory}>All projects</li>
        <li className="category-item" onClick={this._handleCategory}>Before Time</li>
        <li className="category-item" onClick={this._handleCategory}>Stone Age</li>
        <li className="category-item" onClick={this._handleCategory}>Middle Ages</li>
        <li className="category-item" onClick={this._handleCategory}>Present</li>
        </ul>].concat(this.shuffle(
          this.state.projects.concat(
            this.state.projects.concat(
              this.state.projects.concat(
                this.state.projects.concat(
                  this.state.projects.concat(
                    this.state.projects
                  ))))).map((project,idx) => {
          return <ProjectPreview key={idx} project={project} />;
        })));

    }
    return (
      <div className="index-container">
        <div className={`project-index-wrapper group ${this.state.flex}`}>
          {_display}
        </div>
      </div>
    );
  }

});

module.exports = ProjectIndex;
