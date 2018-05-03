# Welcome to [Lion](https://lion-frontend-uat.herokuapp.com/)!

---

## Repo setup

* Clone the repository on your machine

```
git clone git clone git@bitbucket.org:rabidtech/lion-frontend.git [folder name]
cd [folder name]
```

[Or you can use the HTTPS link, though SSH is prefered]

```
git clone git clone git clone [Your user link]/rabidtech/lion-frontend.git [folder name]
cd [folder name]
```

* Inside the repository, install the necessary packages

```
npm install
```

* Start the local server

```
npm start
```

* As you work in the repository, your changes will publish and refresh your local server on the fly.
* To stop the server, use the terminal command `Ctrl. + C`

**All commands in one clipboard:**

```
git clone git clone git@bitbucket.org:rabidtech/lion-frontend.git [folder name]
cd [folder name]
npm i
npm start
```

## Heroku Deployment

* Login into Heroku with Email and Password:

```
heroku login
```

* Add the Heroku branch to your local machine:

```
heroku git:remote -a lion-frontend-uat
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
| [config/](https://bitbucket.org/rabidtech/lion-frontend/src/master/config/)                                           |    This is used to build out the webpack. In most cases, this won't need to be edited unless we decide to change our build in some way.    |     N |
| [node_modules/](https://bitbucket.org/rabidtech/lion-frontend/src/master/node_modules/)                               |               The folder for all of the modules pulled in by Node. Good folder to see what FontAwesome icons are available.                |     N |
| [public/](https://bitbucket.org/rabidtech/lion-frontend/src/master/public/)                                           | Don't edit this. Anything you put in here will get replaced as this folder is the output of the build and what is viewed by the front end. |     N |
| [scripts/](https://bitbucket.org/rabidtech/lion-frontend/src/master/scripts/)                                         |              These are the node scripts. Again, unless we are changing the way the build works, this shouldn't need to change              |     N |
| [src/](https://bitbucket.org/rabidtech/lion-frontend/src/master/src/)                                                 |                                                     This is where the editing happens.                                                     |     Y |
| [src/fonts/](https://bitbucket.org/rabidtech/lion-frontend/src/master/src/fonts/)                                     |                                                                Local fonts.                                                                |     Y |
| [src/img/](https://bitbucket.org/rabidtech/lion-frontend/src/master/src/img/)                                         |                                          Local image assets for things like the logo and map pins                                          |     Y |
| [src/js/](https://bitbucket.org/rabidtech/lion-frontend/src/master/src/js/)                                           |                                                          All JavaScript and JSX.                                                           |     Y |
| [src/js/components/](https://bitbucket.org/rabidtech/lion-frontend/src/master/src/js/components/)                     |                                              JSX components that are used on different pages                                               |     Y |
| [src/js/components/inputs/](https://bitbucket.org/rabidtech/lion-frontend/src/master/src/js/components/inputs/)       |     JSX components that are also used as input, select, and textarea elements so that the HTML is standardized with much less typing.      |     Y |
| [src/js/pages/](https://bitbucket.org/rabidtech/lion-frontend/src/master/src/js/pages/)                               |                    This folder is for all of the JSX components that wrap full pages and are used as Routes in `App.js`                    |     Y |
| [src/js/resources/](https://bitbucket.org/rabidtech/lion-frontend/src/master/src/js/resources/)                       |                            This is general JavaScript that helps the rest of this code do what it needs to do.                             |     Y |
| [src/scss/](https://bitbucket.org/rabidtech/lion-frontend/src/master/)                                                |                                                             All Sass partials                                                              |     Y |
| [src/scss/global/](https://bitbucket.org/rabidtech/lion-frontend/src/master/src/scss/)                                |                                Initial tag settings, set globally before use. Similar to standardized CSS.                                 |     Y |
| [src/scss/layout/](https://bitbucket.org/rabidtech/lion-frontend/src/master/src/scss/layout/)                         |         This puts the general block elements on the page where they belong and dictate the structure of pages in a general sense.          |     Y |
| [src/scss/object/](https://bitbucket.org/rabidtech/lion-frontend/src/master/src/scss/object/)                         |                                This is for objects that are rendered on multiple pages in multiple contexts                                |     Y |
| [src/scss/pages/](https://bitbucket.org/rabidtech/lion-frontend/src/master/src/scss/pages/)                           |                                          This is for the styles specific to one page on the site                                           |     Y |
| [src/scss/presets/](https://bitbucket.org/rabidtech/lion-frontend/src/master/src/scss/presets/)                       |                  These have variables, mixins, and other presets for how the CSS is written so that it's faster to build.                  |     Y |
| [src/App.js](https://bitbucket.org/rabidtech/lion-frontend/src/master/src/App.js)                                     |                       This is the base file that sets up the routes and holds the default state of the application.                        |     Y |
| [src/App.scss](https://bitbucket.org/rabidtech/lion-frontend/src/master/src/App.scss)                                 |                                            This imports all of the style partials from `/scss`                                             |     Y |
| [src/App.test.js](https://bitbucket.org/rabidtech/lion-frontend/src/master/src/App.test.js)                           |                                      This tests the current connection for `registerServiceWorker.js`                                      |     Y |
| [src/index.js](https://bitbucket.org/rabidtech/lion-frontend/src/master/src/index.js)                                 |                            This is the true entry point for the application, but is also used to set up Redux.                             |     Y |
| [src/registerServiceWorker.js](https://bitbucket.org/rabidtech/lion-frontend/src/master/src/registerServiceWorker.js) |                                   This informs how the server needs to build the page based on context.                                    |     N |
| [.gitignore](https://bitbucket.org/rabidtech/lion-frontend/src/master/.gitignore)                                     |                                                 Git settings for what to ignore on commit                                                  |     Y |
| [package-lock.json](https://bitbucket.org/rabidtech/lion-frontend/src/master/package-lock.json)                       |                                                         JSON file for NPM settings                                                         |     N |
| [package.json](https://bitbucket.org/rabidtech/lion-frontend/src/master/package.json)                                 |                                                        JSON file for Yarn settings                                                         |     N |
| [README.md](https://bitbucket.org/rabidtech/lion-frontend/src/master/README.md)                                       |                                                                 This file                                                                  |     Y |
