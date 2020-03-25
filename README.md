# MutualAid.World App

See demo [here](https://mutualaidworld-frontend.herokuapp.com/)!

Please also check out [CONTRIBUTING.md](/CONTRIBUTING.md)

---

## Repo setup

* Clone the repository on your machine

```
git clone <GIT REPOS HERE> [folder name]
cd [folder name]
```

* Inside the repository, install the necessary packages

```
npm ci
# as opposed to npm install, which modifies package-lock.json
```

* Start the local server

```
npm start
```

* As you work in the repository, your changes will publish and refresh your local server on the fly.
* To stop the server, use the terminal command `Ctrl. + C`

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

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run storybook`
Run the storybook where we can showcase the components in the system
[write a story](https://storybook.js.org/docs/basics/writing-stories/)

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size


## Code change process

* Checkout a new branch by choosing a simple name that expresses the individual issue you're addressing

```
git checkout -b my-feature-28
```

* Do your work in the branch
* Check that your changes are present by checking the status

```
git status
```

* Add your changes to the branch

```
git add .
```

* Add a commit message that explains the work that's complete, the way you did it, and any other notes you might want to leave for code reviewers

```
git commit -m "My feature is now working on the front page. I noticed that there might be a typo in a public function. You'll see the code comment."
```

* Push your work into the branch origin

```
git push -u origin my-feature-28
```

* Create a pull request and assign <reviewer goes here> as reviewer
* Once all issues are addressed and you have at least two approvals, merge your changes to master and deploy.

**All commands in one clipboard:**

```
git checkout -b [branch name]
git status
git add .
git commit -m "[commit message]"
git push -u origin [branch name]
```

### Accessibility

Using react-axe as a library to find accessibilty warnings and errors. Please check the console for warnings or errors from react-axt before committing.

## Heroku Deployment

* Login into Heroku with Email and Password:

```
heroku login
```

* Add the Heroku branch to your local machine:

```
heroku git:remote -a <heroku app name>
```

* Develop as per normal, branching and merging to master.
* Once you are happy with master, push the changes into the Heroku branch:

```
git push heroku master
```

* This also runs all of the build and deployment commands, so it may take a moment, but once it's complete, the live link should be updated.

## File structure

| File                                                                                                                  |                                                                Description                                                                 | Edit? |
| --------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------: | ----: |
| [config/](<GIT REPOS URL>src/master/config/)                                           |    This is used to build out the webpack. In most cases, this won't need to be edited unless we decide to change our build in some way.    |     N |
| [node_modules/](<GIT REPOS URL>src/master/node_modules/)                               |               The folder for all of the modules pulled in by Node. Good folder to see what FontAwesome icons are available.                |     N |
| [public/](<GIT REPOS URL>src/master/public/)                                           | Don't edit this. Anything you put in here will get replaced as this folder is the output of the build and what is viewed by the front end. |     N |
| [scripts/](<GIT REPOS URL>src/master/scripts/)                                         |              These are the node scripts. Again, unless we are changing the way the build works, this shouldn't need to change              |     N |
| [src/](<GIT REPOS URL>src/master/src/)                                                 |                                                     This is where the editing happens.                                                     |     Y |
| [src/fonts/](<GIT REPOS URL>src/master/src/fonts/)                                     |                                                                Local fonts.                                                                |     Y |
| [src/img/](<GIT REPOS URL>src/master/src/img/)                                         |                                          Local image assets for things like the logo and map pins                                          |     Y |
| [src/js/](<GIT REPOS URL>src/master/src/js/)                                           |                                                          All JavaScript and JSX.                                                           |     Y |
| [src/js/components/](<GIT REPOS URL>src/master/src/js/components/)                     |                                              JSX components that are used on different pages                                               |     Y |
| [src/js/components/inputs/](<GIT REPOS URL>src/master/src/js/components/inputs/)       |     JSX components that are also used as input, select, and textarea elements so that the HTML is standardized with much less typing.      |     Y |
| [src/js/pages/](<GIT REPOS URL>src/master/src/js/pages/)                               |                    This folder is for all of the JSX components that wrap full pages and are used as Routes in `App.js`                    |     Y |
| [src/js/resources/](<GIT REPOS URL>src/master/src/js/resources/)                       |                            This is general JavaScript that helps the rest of this code do what it needs to do.                             |     Y |
| [src/scss/](<GIT REPOS URL>src/master/)                                                |                                                             All Sass partials                                                              |     Y |
| [src/scss/global/](<GIT REPOS URL>src/master/src/scss/)                                |                                Initial tag settings, set globally before use. Similar to standardized CSS.                                 |     Y |
| [src/scss/layout/](<GIT REPOS URL>src/master/src/scss/layout/)                         |         This puts the general block elements on the page where they belong and dictate the structure of pages in a general sense.          |     Y |
| [src/scss/object/](<GIT REPOS URL>src/master/src/scss/object/)                         |                                This is for objects that are rendered on multiple pages in multiple contexts                                |     Y |
| [src/scss/pages/](<GIT REPOS URL>src/master/src/scss/pages/)                           |                                          This is for the styles specific to one page on the site                                           |     Y |
| [src/scss/presets/](<GIT REPOS URL>src/master/src/scss/presets/)                       |                  These have variables, mixins, and other presets for how the CSS is written so that it's faster to build.                  |     Y |
| [src/App.js](<GIT REPOS URL>src/master/src/App.js)                                     |                       This is the base file that sets up the routes and holds the default state of the application.                        |     Y |
| [src/App.scss](<GIT REPOS URL>src/master/src/App.scss)                                 |                                            This imports all of the style partials from `/scss`                                             |     Y |
| [src/App.test.js](<GIT REPOS URL>src/master/src/App.test.js)                           |                                      This tests the current connection for `registerServiceWorker.js`                                      |     Y |
| [src/index.js](<GIT REPOS URL>src/master/src/index.js)                                 |                            This is the true entry point for the application, but is also used to set up Redux.                             |     Y |
| [src/registerServiceWorker.js](<GIT REPOS URL>src/master/src/registerServiceWorker.js) |                                   This informs how the server needs to build the page based on context.                                    |     N |
| [.gitignore](<GIT REPOS URL>src/master/.gitignore)                                     |                                                 Git settings for what to ignore on commit                                                  |     Y |
| [package-lock.json](<GIT REPOS URL>src/master/package-lock.json)                       |                                                         JSON file for NPM settings                                                         |     N |
| [package.json](<GIT REPOS URL>src/master/package.json)                                 |                                                        JSON file for Yarn settings                                                         |     N |
| [README.md](<GIT REPOS URL>src/master/README.md)                                       |                                                                 This file                                                                  |     Y |
