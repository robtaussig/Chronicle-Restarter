# Flux Cycles

## Auth Cycles

### Session API Request Actions

* `signUp`
  0. invoked from `SignupForm` `onSubmit`
  0. `POST /api/users` is called.
  0. `receiveCurrentUser` is set as the success callback.
* `logIn`
  0. invoked from `Navbar` `onSubmit`
  0. `POST /api/session` is called.
  0. `receiveCurrentUser` is set as the callback.
* `logOut`
  0. invoked from `Navbar` `onClick`
  0. `DELETE /api/session` is called.
  0. `removeCurrentUser` is set as the success callback.
* `fetchCurrentUser`
  0. invoked from `App` in `didMount`
  0. `GET /api/session` is called.
  0. `receiveCurrentUser` is set as the success callback.

### Session API Response Actions

* `receiveCurrentUser`
  0. invoked from an API callback
  0. stores in `_currentUser` in `CurrentUserStore`
* `removeCurrentUser`
  0. invoked from an API callback
  0. removes `_currentUser` in `CurrentUserStore`

## Error Cycles

### Error API Response Actions
* `setErrors`
  0. invoked from API callbacks on error for actions that generate POST requests
  0. sets `form` and `_errors` in the `ErrorStore`
* `removeErrors`
  0. invoked from API callbacks on success for actions that generate POST requests
  0. removes `_errors` for a given `form` in the `ErrorStore`

## Project Cycles

### Projects API Request Actions

* `fetchAllProjects`
  0. invoked from `ProjectsIndex` `didMount`
  0. `GET /api/projects` is called.
  0. `receiveAllProjects` is set as the success callback.

* `createProject`
  0. invoked from new project button `onClick`
  0. `POST /api/projects` is called.
  0. `receiveSingleProject` is set as the success callback.

* `fetchSingleProject`
  0. invoked from `ProjectDetail` `didMount`/`willReceiveProps`
  0. `GET /api/projects/:id` is called.
  0. `receiveSingleProject` is set as the success callback.

* `updateProject`
  0. invoked from `ProjectForm` `onSubmit`
  0. `POST /api/projects` is called.
  0. `receiveSingleProject` is set as the success callback.

* `destroyProject`
  0. invoked from delete project button `onClick`
  0. `DELETE /api/projects/:id` is called.
  0. `removeProject` is set as the success callback.

### Projects API Response Actions

* `receiveAllProjects`
  0. invoked from an API callback.
  0. `Project` store updates `_projects` and emits change.

* `receiveSingleProject`
  0. invoked from an API callback.
  0. `Project` store updates `_projects[id]` and emits change.

* `removeProject`
  0. invoked from an API callback.
  0. `Project` store removes `_projects[id]` and emits change.

### Store Listeners

* `ProjectsIndex` component listens to `Project` store.
* `ProjectDetail` component listens to `Project` store.

## Reward Cycles

### Rewards API Request Actions

* `fetchAllRewards`
  0. invoked from `RewardsIndex` `didMount`
  0. `GET /api/rewards` is called.
  0. `receiveAllRewards` is set as the success callback.

* `createReward`
  0. invoked from new reward button `onClick`
  0. `POST /api/rewards` is called.
  0. `receiveSingleReward` is set as the success callback.

* `fetchSingleReward`
  0. invoked from `RewardDetail` `didMount`/`willReceiveProps`
  0. `GET /api/rewards/:id` is called.
  0. `receiveSingleReward` is set as the success callback.

* `updateReward`
  0. invoked from `RewardForm` `onSubmit`
  0. `POST /api/rewards` is called.
  0. `receiveSingleReward` is set as the success callback.

* `destroyReward`
  0. invoked from delete reward button `onClick`
  0. `DELETE /api/rewards/:id` is called.
  0. `removeReward` is set as the success callback.

### Rewards API Response Actions

* `receiveAllRewards`
  0. invoked from an API callback.
  0. `Reward` store updates `_rewards` and emits change.

* `receiveSingleReward`
  0. invoked from an API callback.
  0. `Reward` store updates `_rewards[id]` and emits change.

* `removeReward`
  0. invoked from an API callback.
  0. `Reward` store removes `_rewards[id]` and emits change.

## Comment Cycles

### Comments API Request Actions

* `fetchAllComments`
  0. invoked from `CommentsIndex` `didMount`
  0. `GET /api/comments` is called.
  0. `receiveAllComments` is set as the success callback.

* `createComment`
  0. invoked from new comment button `onClick`
  0. `POST /api/comments` is called.
  0. `receiveSingleComment` is set as the success callback.

* `fetchSingleComment`
  0. invoked from `CommentDetail` `didMount`/`willReceiveProps`
  0. `GET /api/comments/:id` is called.
  0. `receiveSingleComment` is set as the success callback.

* `updateComment`
  0. invoked from `CommentForm` `onSubmit`
  0. `POST /api/comments` is called.
  0. `receiveSingleComment` is set as the success callback.

* `destroyComment`
  0. invoked from delete comment button `onClick`
  0. `DELETE /api/comments/:id` is called.
  0. `removeComment` is set as the success callback.

### Comments API Response Actions

* `receiveAllComments`
  0. invoked from an API callback.
  0. `Comment` store updates `_comments` and emits change.

* `receiveSingleComment`
  0. invoked from an API callback.
  0. `Comment` store updates `_comments[id]` and emits change.

* `removeComment`
  0. invoked from an API callback.
  0. `Comment` store removes `_comments[id]` and emits change.

## Project Categories Cycles

### Project Categories API Request Actions

* `fetchAllProjects`
  0. invoked from `ProjectsIndex` `didMount`/`willReceiveProps`
  0. `GET /api/projects` is called.
  0. `receiveAllProjects` is set as the success callback.

* `createProject`
  0. invoked from new project button `onClick`
  0. `POST /api/projects` is called.
  0. `receiveSingleProject` is set as the callback.

* `fetchSingleProject`
  0. invoked from `ProjectDetail` `didMount`/`willReceiveProps`
  0. `GET /api/projects/:id` is called.
  0. `receiveSingleProject` is set as the success callback.

* `updateProject`
  0. invoked from `ProjectForm` `onSubmit`
  0. `POST /api/projects` is called.
  0. `receiveSingleProject` is set as the success callback.

* `destroyProject`
  0. invoked from delete project button `onClick`
  0. `DELETE /api/projects/:id` is called.
  0. `removeProject` is set as the success callback.

### Projects API Response Actions

* `receiveAllProjects`
  0. invoked from an API callback.
  0. `Project` store updates `_projects` and emits change.

* `receiveSingleProject`
  0. invoked from an API callback.
  0. `Project` store updates `_projects[id]` and emits change.

* `removeProject`
  0. invoked from an API callback.
  0. `Project` store removes `_projects[id]` and emits change.

### Store Listeners

* `ProjectsIndex` component listens to `Project` store.


## SearchSuggestion Cycles

* `fetchSearchSuggestions`
  0. invoked from `ProjectSearchBar` `onChange` when there is text
  0. `GET /api/projects` is called with `text` param.
  0. `receiveSearchSuggestions` is set as the success callback.

* `receiveSearchSuggestions`
  0. invoked from an API callback.
  0. `SearchSuggestion` store updates `_suggestions` and emits change.

* `removeSearchSuggestions`
  0. invoked from `ProjectSearchBar` `onChange` when empty
  0. `SearchSuggestion` store resets `_suggestions` and emits change.

### Store Listeners

* `SearchBarSuggestions` component listens to `SearchSuggestion` store.
