# Tech Blog

Create a full-stack tech blog using MVC architecture.

---

Created by: Robert Bishop

This project is intended as a homework assignment for class.  Questions, comments, suggestions and constructive criticism are always welcome.

<a href="mailto: rbishop85@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white"></a>
<a href="https://github.com/rbishop85" target="_blank"><img src="	https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a>
<a href="https://www.linkedin.com/in/robert-m-bishop/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>

---

## Contents:
* [Demo](#demo)
* [Live Page Link](#live-page-link)
* [Usage](#usage)
* [Skills/Concepts Used](#skillsconcepts-used)
* [Steps Taken](#steps-taken)
* [Thoughts/Future Ideas](#thoughtsfuture-ideas)
* [Links](#links)
* [License](#license)

---

## Demo:

> Video demoing tech blog in action.

https://user-images.githubusercontent.com/103389448/192459366-988c1cad-8fad-4966-aa0d-834da197766b.mp4

---

## Live Page Link:

[https://rb-hw14-tech-blog.herokuapp.com/](https://rb-hw14-tech-blog.herokuapp.com/)

---

## Usage:

Upon first loading the page, user can see a list of available blog posts, as well as buttons to login or register a user.  If they click the "Read More" button under a blog post, they'll be taken to the page for that blog post that includes comments (If there are any) and a message telling the user to log in if they wish to leave a comment.

After clicking the login link, the user will be presented with a login form as well as a link to the registration page if they wish to register a user instead.  On the registration page the user will be presented with a registration form as well as a link to the login page if they wish to login to an existing user instead.  If the user tries to register a user that already exists, they'll see a popup notifying them of such.  Whether the user chooses to login or register, they will then be relocated back to the homepage.

After being logged in the navbar now features a link to the user's dashboard as well as a button to logout.  If the user now clicks on a blog post's read more button they'll see a form on the blog post for submitting a comment. If the user fills out the form and hits submit then the page will reload to show their new comment on the post.  If there are any existing comments by the current user, they'll see a button to delete that comment.  If the user presses the delete button they'll see a popup modal asking them to confirm that they wish to delete the comment.  If they confirm then the page will reload to show that the comment is gone.  If they cancel then the modal disappears.

Upon clicking the dashboard button the user will be taken to a page that shows their personal blog posts as well as a button to create a new blog post.  If they click the new blog post button they'll be redirected to a form for submitting new blog posts.  If they fill out the form and click the post button they'll be redirected to their dashboard where they can see the new post listed.  From their dashboard they can click an edit button under each post to be redirected to a page where they can edit an existing blog post. After making changes the user can submit their blog edit to be taken back to the dashboard.  Or if the user prefers they can click delete and once again be presented with the confirmation modal for them to verify if they wish to delete the post.  If the user does decide to delete the post they'll be redirected to their dashboard to see the post is now gone.

If the user clicks the logout button their current session will be terminated, logging them out and redirecting them back to the home page.

---

## Skills/Concepts Used:

* Javascript
  - Node.js
  - Express
  - Express Handlebars
  - Express Session
  - MySQL
  - BCrypt
  - Sequelize
  - C.R.U.D. (Create, Read, Update, Delete)

* HTML
  - Bootstrap

---

## Steps Taken:

- [x] Setup initial folder structure, copied in boiler plate server code.
- [x] Setup Models and Seed files.
- [x] Copied in boiler plate user routes and utils with updates to match current project.
- [x] Started working on html routes, user routes and route indexes.
- [x] Setup app on Heroku.
- [x] Worked on homepage layout and loading posts.
- [x] Setup Login and Registration pages.
- [x] Setup dashboard page and html route as well as new blog post page.
- [x] Setup ability to add, edit and delete posts.
- [x] Performed several styling updates on all pages.
- [x] Revamped delete buttons to call a confirmation modal.
- [x] Created helper function for handlebars that acts as an if statement but allows comparing of two values, used this helper to load delete button on a comment if it belongs to the current user.
- [x] Setup comment delete confirmation modal to dynamically adjust based on which comment the delete button was pressed from.
- [x] Final format and cleanup, along with adding notes and creating README.

---

## Thoughts/Future Ideas:

Given more time I'd like to add in more functions for editing items already in the tables.  Also I had wanted to work on some checks to make sure people don't accidentally remove data.

---

## Links:

<a href="https://nodejs.org/en/" target="_blank">Node.js</a>

<a href="https://www.npmjs.com/package/mysql2" target="_blank">MySQL 2</a>

<a href="https://www.npmjs.com/package/sequelize" target="_blank">Sequelize</a>

<a href="https://www.npmjs.com/package/express" target="_blank">Express</a>

<a href="https://www.npmjs.com/package/express-handlebars" target="_blank">Express Handlebars</a>

<a href="https://getbootstrap.com/" target="_blank">Bootstrap</a>

---

## License:


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

[Top of Page](#employee-tracker)
