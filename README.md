# Chronicle Restarter

[Live][Live]

[Live]: http://www.chronicle-restarter.com

[Original proposal][Proposal]

[Proposal]: docs/PROPOSAL.md

Chronicle Restarter is a tongue-in-cheek adaptation of Kickstarter built in React.js and Rails, where the rhetorical user is given the opportunity to crowd-fund historically significant events.

### Front page

<kbd>![Front page]</kbd>
[Front page]: docs/readme/front_page.png

### Discover page

<kbd>![Discover page]</kbd>
[Discover page]: docs/readme/discover.png

### Project Show page

<kbd>![Show page]</kbd>
[Show page]: docs/readme/show.png

### Project Create page

<kbd>![Create page]</kbd>
[Create page]: docs/readme/create.png

### Signup page

<kbd>![Signup page]</kbd>
[Signup page]: docs/readme/sign_up.png

## Overview

Users of Chronicle Restarter can launch, delete, browse, search for, and back projects.

### Features

- Reusable, hand-rolled CSS transitions driven by a series of event listeners and asynchronous callbacks.

![StartProject]
[StartProject]: docs/readme/saveProjectGif.gif

- The client-side retrieves projects and fundings through a single query by utilizing ActiveRecord associations on the server-side, streamlining the user experience with instantaneous search and indexing, while minimizing the load on the server by reducing overall number of queries.

![Search]
[Search]: docs/readme/search.gif

- Authentication process remembers where the user was redirected from after prompted to sign in.

![Auth]
[Auth]: docs/readme/auth.gif

- Backing a project instantaneously records the funding on the server-side while updating the client-side, all without having to refresh the page.

![Funding]
[Funding]: docs/readme/funding.gif

#### Other features

- Each project's funding progress bar is rendered through CSS and inline styling, taking the ratio of current funding to the funding goal, multiplying the result by the max width of the bar, and then setting that as the width to a green div.

- The Discover page utilizes the CSS flexbox property so that the number of projects per line increases and decreases depending on the current width of the user's window, providing a much more responsive experience.

- File upload handled through the Cloudinary API, combined with the gon gem to keep the api key private on the server-side.

- Full authentication process built from the ground up, utilizing BCrypt to hash and salt passwords.

### Technology

**React.js** is a powerful frontend tool used to create single-page web applications that can update the DOM in response to both client-side and server-side changes, all without the need to ever refresh the page. It achieves this by maintaining a virtual DOM through which it makes all changes initially, and then algorithmically compares the virtual DOM with the actual DOM to determine the most efficient way to reconcile the differences.

**Flux** is the application architecture/pattern used by Facebook to complement React. The purpose of Flux is to maintain a unidirectional data flow, and thus reduce the overall complexity of the web application, making it more scalable and more easily maintained. Flux applications come in four parts: the action creator, the dispatcher, the store, and the views. Views (with which the user interacts) sends information to the actions creator, which will either pass along the information (along with a callback) to an API controller, or it will pass the information right along to the dispatcher. The dispatcher will then send the 'payload' out to all stores, which are responsible for determining which store the payload is intended for. Finally, the appropriate store will store the data and emit a change which is received by all components that have added an event listener to that particular store. Upon the emitChange event, the (mounted) components will call whatever method it passed as a callback to the event listener, usually something that involves fetching the store's data.

**ActiveRecord** is the model to Rails' model-view-controller architecture. Among many other useful qualities, ActiveRecord maps the relationships between objects held in different tables of the Rails database.

#### How Chronicle Restarter uses this technology

Chronicle Restarter utilizes the Flux cycle at every level: user sessions, projects, saved projects, rewards, and fundings are all created and retrieved through the flux cycle. Notable implementations of React and ActiveRecord include:

- *Saved Projects into Published Projects:* When the user initially picks the era for his or her project, a saved project is immediately created with a foreign key pointing to that user. At every step of the creation process, the saved project is updated whenever a component unmounts, and for additional security (against losing progress), the user can specifically save (or clear) changes via buttons that become available when applicable (after a change is made). Saved projects are available from the same screen that the user begins a project, and upon selecting a saved project, its information will automatically prepopulate applicable fields in the series of FinalizeProject pages. When the user is ready to publish a project, the information from the currentSavedProject (from the SavedProjectStore) is used to create a project, with the published project holding the foreign key to the saved project.

- *Rewards:* When a user creates rewards for the saved project, the rewards are saved under a separate table with a foreign key pointing to the saved project. When the saved project is eventually published, rewards are accessed through the ActiveRecord association between Projects and Rewards through Saved Projects which has an association with both.

- *Fundings:* A project is funded when a user makes a pledge that corresponds with an offered reward. Each reward is of a certain value, and so a project's total funding can be measured quite easily as the product of a reward's value and the amount of "pledges" for that reward (and, where a project has multiple rewards, along with the sum of other rewards multiplied by their amount of pledges). Fundings are thus handled as a join table between users and rewards, holding a foreign key to both, which with the help of jbuilder allows the frontend to get both funding and project information from the backend in a single query.

![Jbuilder]
[Jbuilder]: docs/readme/jbuilder.png
