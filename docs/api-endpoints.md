# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

## JSON API

### Users

- `POST /api/users`
- `GET /api/users/:id`
- `PATCH /api/users`
- `DELETE /api/users/:id`

### Comments


- `POST /api/projects/:projectId/comments`
- `GET /api/projects/:projectId/comments/:id`
- `PATCH /api/projects/:projectId/comments/:id`
- `DELETE /api/projects/:projectId/comments/:id`

### Session

- `POST /api/session`
- `DELETE /api/session`
- `GET /api/session`

### Projects

- `GET /api/projects`
  - Projects index/search
  - accepts `tag_name` query param to list projects by tag
  - accepts pagination params (if I get there)
- `POST /api/projects`
- `GET /api/projects/:id`
- `PATCH /api/projects/:id`
- `DELETE /api/projects/:id`

### Project Categories

- `GET /api/categories`
- `GET /api/categories/:id`
- `GET /api/categories/:id/projects`
  - index of all projects for a category
  - accepts pagination params (if I get there)

### Funders

- `GET /api/funders`
- `POST /api/funders`
- `GET /api/funders/:id`
- `DELETE /api/projects/:id`

### Tags

- A project's tags will be included in the project show template
- `GET /api/tags`
  - includes query param for typeahead suggestions
- `POST /api/projects/:project_id/tags`: add tag to project by name
  - if project doesn't already exist, it will be created
- `DELETE /api/projects/:project_id/tags/:tag_name`: remove tag from project by
  name
