# Chronicle ReStarter

[Live][heroku]

[Live]: http://www.chronicle-restarter.com

## Minimum Viable Product

Chronicle ReStarter is a tongue-in-cheek adaptation of Kickstarter that will be built using Ruby on Rails and React.js. The hypothetical user is offered the opportunity to crowd-fund historically significant events, ranging from the creation of the wheel to the creation of this project. The features will include:

- [ ] Hosting on Heroku
- [ ] Account creation, signing in/logging out, anonymous guest accounts
- [ ] A production README
- [ ] Discover a project
  - Discover page displays all projects filtered by user-selected categories (era, project type, minimum pledge amount, etc).
  - Will also handle individual project show pages, and will be seeded with enough projects to provide a compelling experience.
  - Individual projects can be funded by user, and back-end keeps track of a project's funders. Funds are credited back if project fails to fully fund by due date.
  - Adequate CSS Styling to reflect, as much as possible, the same design philosophies present in Kickstarter (this shall apply to the entire app).
- [ ] Start a project
  - Requires log-in to create a project/fund a project.
  - A fully customizable project creation page, with the following features:
    - Picture uploading (up to a certain number).
    - A feature to save (but not publish) the project, to be completed later.
    - Projects will be compared and validated based on:
      - That a similar idea hasn't already been completed in a previous era.
      - That the requested funding amount is 'realistic' for the chosen era.
      - Various other back-end and front-end driven criteria.
- [ ] Recommended projects based on browsing history
  - A user's browsing history will be analyzed based on hashHistory, projects that user has funded, and previous sessions. This page will produce results tailored to that user based on these considerations. For demonstration purposes, the user will be informed of how the displayed projects were decided on (e.g. "Based on your recent view of 'Project A' and your funding history of 'Project C, D, and G', we thought the following projects might be of interest to you").
- [ ] Root Page
  - The root page will include select projects, divided by popularity and a subset of recommended projects (such as you would find under the Recommended feature).
- [ ] Infinite Scroll for Discover
  - Projects will re-render as the user scrolls down to simulate this effect.

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: docs/views.md
[components]: docs/components.md
[flux-cycles]: docs/flux-cycles.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md

## Implementation Timeline

### [Phase 1: Backend setup and Front End User Authentication (2 days, W1 W 6pm)][phase-one]

**Objective:** Functioning rails project with front-end Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication backend setup
- [ ] create `StaticPages` controller and root view
- [ ] set up webpack & flux scaffold with skeleton files
- [ ] setup `APIUtil` to interact with the API
- [ ] set up flux cycle for frontend auth
- [ ] user signup/signin components
- [ ] blank landing component after signin
- [ ] style signin/signup components
- [ ] seed users

### [Phase 2: Projects Model, API, and components (2 days, W1 F 6pm)][phase-two]

**Objective:** Projects can be created, read, edited and destroyed through the API.

- [ ] create `Project` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for projects (`ProjectsController`)
- [ ] jBuilder views for projects
- [ ] test out API interaction in the console.
- implement each project component, building out the flux loop as needed.
  - [ ] `ProjectsIndex`
  - [ ] `ProjectIndexItem`
  - [ ] `ProjectForm`
- [ ] save Projects to the DB when the form loses focus or is left idle after editing.
- [ ] style projects components
- [ ] seed projects

### [Phase 3: Categories (2 day, W2 Tu 6pm)][phase-three]

**Objective:** Projects belong to Categories, and can be viewed by category.

- [ ] create `Category` model
- build out API, Flux loop, and components for:
  - [ ] Category CRUD
  - [ ] adding projects requires a category
  - [ ] moving projects to a different category
  - [ ] viewing projects by category
- [ ] Use CSS to style new components
- [ ] Seed Categories

Phase 3 adds organization to the Projects. Projects belong to a Category, which has its own `Index` view.

### [Phase 4: Tags and Funders (1 day, W2 W 6pm)][phase-four]

**Objective:** Projects can be tagged with multiple tags, and tags are searchable. Projects can also be funded by users, but if not fully funded by due date, funds are remitted back to user.

- [ ] create `Tag` model and join table
- build out API, Flux loop, and components for:
  - [ ] fetching tags for category
  - [ ] adding tags to category
  - [ ] creating tags while adding to categories
  - [ ] searching categories by tag
- [ ] Users sign up with an amount of disposable funds determined by them.
  - Funds are debited upon pledge, and credited back if project is not funded by due date.
- [ ] Style new elements
- [ ] Seed tags and tag the seeded Categories

### [Phase 5: Pagination / infinite scroll for Projects Index (1 day, W2 Th 6pm)][phase-five]

**objective:** Add infinite scroll to Projects Index

- [ ] Paginate Projects Index API to send 20 results at a time
- [ ] Append next set of results when user scrolls and is near bottom
- [ ] Make sure styling still looks good

### Phase 6: - Polish site, finish features (1 day, W2 F 6pm)

**objective:** Finish styling/polish components.

- [ ] Make sure styling looks good throughout
- [ ] Bug fixing
- [ ] Review previous phases to ensure all MVP features have been implemented

### Bonus Features (TBD)
- [ ] Time simulator:
  - User can click on a button that simulates the passage of time, resulting in current projects getting funded, and renders the result.
- [ ] Improve search experience to render projects during input
- [ ] Multiple sessions
- [ ] A project's edit page will render a preview pane in real-time.

[phase-one]: docs/phases/phase1.md
[phase-two]: docs/phases/phase2.md
[phase-three]: docs/phases/phase3.md
[phase-four]: docs/phases/phase4.md
[phase-five]: docs/phases/phase5.md
