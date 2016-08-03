# Phase 2: Flux Architecture and Project CRUD (2 days, W1 F 6pm)

## Rails
### Models
* Project

### Controllers
* Api::ProjectsController (create, destroy, index, show, update)

### Views
* notes/index.json.jbuilder
* notes/show.json.jbuilder

## Flux
### Views (React Components)
* ProjectsIndex
  - ProjectsIndexItem
* ProjectForm

### Stores
* Project

### Actions
* `ApiActions.receiveAllProjects`
* `ApiActions.receiveSingleProject`
* `ApiActions.deleteProject`
* `ProjectActions.fetchAllProjects`
* `ProjectActions.fetchSingleProject`
* `ProjectActions.createProject`
* `ProjectActions.editProject`
* `ProjectActions.destroyProject`

### ApiUtil
* `ApiUtil.fetchAllProjects`
* `ApiUtil.fetchSingleProject`
* `ApiUtil.createProject`
* `ApiUtil.editProject`
* `ApiUtil.destroyProject`

## Gems/Libraries
