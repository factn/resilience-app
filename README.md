# MutualAid.World App

See demo [here](https://resilience-app.herokuapp.com)!

Please also check out [CONTRIBUTING.md](/CONTRIBUTING.md)

---

## Repo setup

- Clone the repository on your machine

```
git clone <GIT REPOS HERE> [folder name]
cd [folder name]
```

- Inside the repository, install the necessary packages

```
npm ci
# as opposed to npm install, which modifies package-lock.json
```

- Create your local `.env` folder at the root of your resilience-app folder

Create the `.env.development` file at the root of the resilience-app folder as well and copy the content under `below go into env.development` into this file. The content is pinned to the side of #resilience-app slack channel.


- Start the local server

```
npm start
```

- As you work in the repository, your changes will publish and refresh your local server on the fly.
- To stop the server, use the terminal command `Ctrl. + C`

## Test Data

When running the app locally, you can test the phone verification sign-up flow by entering any of the phone number / verification code combinations listed below (the leading "1" should be filled in for you):

| Phone Number | Verification Code |
| ------------ | ----------------- |
| 7777777777   | 123456            |
| 2223334444   | 123456            |

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run storybook`

{DONT THINK WE ARE MAINTAINING THIS CURRENTLY}

Run the storybook where we can showcase the components in the system
[write a story](https://storybook.js.org/docs/basics/writing-stories/)

### `npm run docs`

Run this to generate docs in `docs/` folder (made with JSDocs).
[For more info](https://jsdoc.app/)

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

## Code change process

- See [Contributing.MD](/CONTRIBUTING.md) but... Checkout a new branch by choosing a simple name that expresses the individual issue you're addressing

```
git checkout -b my-feature-28
```

- Do your work in the branch
- Check that your changes are present by checking the status

```
git status
```

- Add your changes to the branch

```
git add .
```

- Add a commit message that explains the work that's complete, the way you did it, and any other notes you might want to leave for code reviewers

```
git commit -m "My feature is now working on the front page. I noticed that there might be a typo in a public function. You'll see the code comment."
```

- Push your work into the branch origin

```
git push -u origin my-feature-28
```

- Create a pull request and assign <reviewer goes here> as reviewer
- Once all issues are addressed and you have at least two approvals, merge your changes to master and deploy.

**All commands in one clipboard:**

```
git checkout -b [branch name]
git status
git add .
git commit -m "[commit message]"
git push -u origin [branch name]
```

### Accessibility

Using react-axe as a library to find accessibilty warnings and errors. Please check the console for warnings or errors from react-axe before committing.

## Heroku Deployment

- Login into Heroku with Email and Password:

```
heroku login
```

- Add the Heroku branch to your local machine:

```
heroku git:remote -a <heroku app name>
```

- Develop as per normal, branching and merging to master.
- Once you are happy with master, push the changes into the Heroku branch:

```
git push heroku master
```

- This also runs all of the build and deployment commands, so it may take a moment, but once it's complete, the live link should be updated.

## File structure

| File                                                                                                             |                                                                Description                                                                 | Edit? |
| ---------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------: | ----: |
| [config/](https://github.com/factn/resilience-app/tree/master/src/config/)                                       |    This is used to build out the webpack. In most cases, this won't need to be edited unless we decide to change our build in some way.    |     N |
| [node_modules/](https://github.com/factn/resilience-app/tree/master/node_modules/)                               |               The folder for all of the modules pulled in by Node. Good folder to see what FontAwesome icons are available.                |     N |
| [public/](https://github.com/factn/resilience-app/tree/master/public/)                                           | Don't edit this. Anything you put in here will get replaced as this folder is the output of the build and what is viewed by the front end. |     N |
| [scripts/](https://github.com/factn/resilience-app/tree/master/scripts/)                                         |              These are the node scripts. Again, unless we are changing the way the build works, this shouldn't need to change              |     N |
| [src/](https://github.com/factn/resilience-app/tree/master/src/)                                                 |                                                     This is where the editing happens.                                                     |     Y |
| [src/fonts/](https://github.com/factn/resilience-app/tree/master/src/fonts/)                                     |                                                                Local fonts.                                                                |     Y |
| [src/img/](https://github.com/factn/resilience-app/tree/master/src/img/)                                         |                                          Local image assets for things like the logo and map pins                                          |     Y |
| [src/js/](https://github.com/factn/resilience-app/tree/master/src/js/)                                           |                                                          All JavaScript and JSX.                                                           |     Y |
| [src/js/components/](https://github.com/factn/resilience-app/tree/master/src/js/components/)                     |                                              JSX components that are used on different pages                                               |     Y |
| [src/js/components/inputs/](https://github.com/factn/resilience-app/tree/master/src/js/components/inputs/)       |     JSX components that are also used as input, select, and textarea elements so that the HTML is standardized with much less typing.      |     Y |
| [src/js/pages/](https://github.com/factn/resilience-app/tree/master/src/js/pages/)                               |                    This folder is for all of the JSX components that wrap full pages and are used as Routes in `App.jsx`                    |     Y |
| [src/js/resources/](https://github.com/factn/resilience-app/tree/master/src/js/resources/)                       |                            This is general JavaScript that helps the rest of this code do what it needs to do.                             |     Y |
| [src/scss/](https://github.com/factn/resilience-app/tree/master/)                                                |                                                             All Sass partials                                                              |     Y |
| [src/scss/global/](https://github.com/factn/resilience-app/tree/master/src/scss/)                                |                                Initial tag settings, set globally before use. Similar to standardized CSS.                                 |     Y |
| [src/scss/layout/](https://github.com/factn/resilience-app/tree/master/src/scss/layout/)                         |         This puts the general block elements on the page where they belong and dictate the structure of pages in a general sense.          |     Y |
| [src/scss/object/](https://github.com/factn/resilience-app/tree/master/src/scss/object/)                         |                                This is for objects that are rendered on multiple pages in multiple contexts                                |     Y |
| [src/scss/pages/](https://github.com/factn/resilience-app/tree/master/src/scss/pages/)                           |                                          This is for the styles specific to one page on the site                                           |     Y |
| [src/scss/presets/](https://github.com/factn/resilience-app/tree/master/src/scss/presets/)                       |                  These have variables, mixins, and other presets for how the CSS is written so that it's faster to build.                  |     Y |
| [src/App.jsx](https://github.com/factn/resilience-app/tree/master/src/App.jsx)                                     |                       This is the base file that sets up the routes and holds the default state of the application.                        |     Y |
| [src/App.scss](https://github.com/factn/resilience-app/tree/master/src/App.scss)                                 |                                            This imports all of the style partials from `/scss`                                             |     Y |
| [src/App.test.js](https://github.com/factn/resilience-app/tree/master/src/App.test.js)                           |                                      This tests the current connection for `registerServiceWorker.js`                                      |     Y |
| [src/index.js](https://github.com/factn/resilience-app/tree/master/src/index.js)                                 |                            This is the true entry point for the application, but is also used to set up Redux.                             |     Y |
| [src/registerServiceWorker.js](https://github.com/factn/resilience-app/tree/master/src/registerServiceWorker.js) |                                   This informs how the server needs to build the page based on context.                                    |     N |
| [.gitignore](https://github.com/factn/resilience-app/tree/master/.gitignore)                                     |                                                 Git settings for what to ignore on commit                                                  |     Y |
| [package-lock.json](https://github.com/factn/resilience-app/tree/master/package-lock.json)                       |                                                         JSON file for NPM settings                                                         |     N |
| [package.json](https://github.com/factn/resilience-app/tree/master/package.json)                                 |                                                        JSON file for Yarn settings                                                         |     N |
| [README.md](https://github.com/factn/resilience-app/tree/master/README.md)                                       |                                                                 This file                                                                  |     Y |
