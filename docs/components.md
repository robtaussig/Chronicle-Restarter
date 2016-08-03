## Component Hierarchy

**Bolded** components are associated with routes.

* **App**
  * Navbar
    * Discover
      * Categories
        * Category Index Page
          * Category Index Header
          * Sorted_By Button
          * Various Category Items (project previews)
            * Project Show Page
    * Start a Project
      * Create Form
      * Project Preview Pane
      * Project Show Page
        * Funders
        * Funding Goal
        * Creator show section
        * Total funding
        * Contents
        * Comments
    * About Us
    * Search
    * Log In
    * Sign Up
  * Promotions Bar
    * Various promotions
  * Index Page
    * Project of the Era
    * Categories (for preview pages)
    * Various project preview pages
  * Footer


## Routes

* **component:** `App` **path:** `/`
  * **component** `LoginForm` **path:** /login
  * **component** `SignupForm` **path:** /signup
  * **component:** `ProjectsIndex` **path:** index
  * **component:** `ProjectsIndex` **path:** `projects/`
    * **component:** `ProjectPage` **path:** `projects/:projectId`
      * **component:** `Comments` **path** `projects/:projectId/comments`
      * **component:** `FundersIndex` **path:** `projects/:projectId/funders`
        * **component:** `Funder` **path:** ``projects/:projectId/funders/:funderId`
