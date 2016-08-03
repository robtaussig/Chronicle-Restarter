# Phase 3: Categories (2 day, W2 Tu 6pm)

## Rails
### Models
* Category
* Tag
* Tagging

### Controllers
* Api::CategoriesController (create, destroy, index, show, update)

### Views
* notebooks/index.json.jbuilder
* notebooks/show.json.jbuilder

## Flux
### Views (React Components)
* CategoriesIndex
  - CategoryIndexItem
* CategoryForm

### Stores
* Category

### Actions
* `ApiActions.receiveAllCategories`
* `ApiActions.receiveSingleCategory`
* `ApiActions.deleteCategory`
* `CategoryActions.fetchAllCategories`
* `CategoryActions.fetchSingleCategory`
* `CategoryActions.createCategory`
* `CategoryActions.editCategory`
* `CategoryActions.destroyCategory`

### ApiUtil
* `ApiUtil.fetchAllCategories`
* `ApiUtil.fetchSingleCategory`
* `ApiUtil.createCategory`
* `ApiUtil.editCategory`
* `ApiUtil.destroyCategory`

## Gems/Libraries
