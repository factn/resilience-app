<p align="center">
    <img src="https://github.com/factn/resilience-app/blob/master/src/img/logo.png?raw=true" />
    <h1 align="center">MutualAid.World App<h1>
</p>

<p align="center">
    <a href="https://github.com/factn/resilience-app/actions?query=workflow%3A%22resilience-app+CI%22">
        <img alt="Github CI Status" src="https://github.com/factn/resilience-app/workflows/resilience-app%20CI/badge.svg" />
    </a>
    <a href="resilience-app.herokuapp.com">
        <img alt="Heroku deploy status" src="https://heroku-badge.herokuapp.com/?app=resilience-app&style=" />
    </a>
    <a href="https://lgtm.com/projects/g/factn/resilience-app/alerts/"><img alt="Total alerts" src="https://img.shields.io/lgtm/alerts/g/factn/resilience-app.svg?logo=lgtm&logoWidth=18"/></a>
</p>

<hr />

Learn more about us at [MutualAid.world](https://mutualaid.world)

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

Create the `.env` file at the root of the resilience-app folder as well and copy the content under `below go into .env` into this file. The content is pinned to the side of #resilience-app slack channel.

- Start the local server

```
npm start
```

- As you work in the repository, your changes will publish and refresh your local server on the fly.
- To stop the server, use the terminal command `Ctrl. + C`

```
npm run dev
```

- This will use a emulator of database instead, we recommend doing this because using `npm start` will connect you to stage database

Download and install Java
https://www.oracle.com/java/technologies/javase-jdk8-downloads.html

## Test Data

When running the app locally, you can test the phone verification sign-up flow by entering any of the phone number / verification code combinations listed below (the leading "1" should be filled in for you):

| Phone Number | Verification Code |
| ------------ | ----------------- |
| 7777777777   | 123456            |
| 2223334444   | 123456            |

For testing payments like donations or buying a foodbox you can use the following paypal credentials
(alternativly if you need to see the invoices sent and recieved you can create your own sandbox account [here](https://developer.paypal.com/))
| Email | Password |
| ------------ | ----------------- |
| sb-lo7o91424981@personal.example.com| 5XqcCb)u |

Regarding the data schema and how to generate test data, go to [scheme/README.md](./scheme/README.md)

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
