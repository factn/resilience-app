<p align="center">
    <img src="https://github.com/factn/resilience-app/blob/master/src/img/logo.png?raw=true" />
    <h1 align="center">MutualAid.World App</h1>
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

<p align="center">
    MutualAid.world is a grassroots crisis response project. We’re a global community of developers, designers, project managers, lawyers, data scientists, strategists, writers, and translators creating apps to help people help each other.
    <br />
    <br />
    Learn more about us at <a href="https://mutualaid.world">MutualAid.world</a>
    <br />
    <a href="https://app.gitbook.com/@mutualaidworld/s/docs/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/factn/resilience-app/issues">Report Bug</a>
    ·
    <a href="https://forms.gle/sDiRLpbEh1GHTqAc7">Request Feature</a>

  </p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About the Project](#about-the-project)
	- [Built With](#built-with)
- [Local Development](#local-development)
	- [Prerequisites](#prerequisites)
	- [Repo setup](#repo-setup)
	- [Adding Routes to the App](#adding-routes-to-the-app)
- [Contributing your code, and getting involved](#contributing-your-code-and-getting-involved)
	- [Formatting your code](#formatting-your-code)
- [Test Data](#test-data)
- [Accessibility](#accessibility)
- [Deployment](#deployment)

## About the Project

We're making it safe and easy for communities to provide mutual aid.

MutualAid.world is a global community of contributors making small acts of kindness seamless. We build software to meet the direct needs of local organizers, making it safe and easy for people to help each other during times of crisis.

### Built With

- [React.js](https://reactjs.org)
- [Material UI](https://material-ui.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/)

## Local Development

Here are a few geting started steps to help get set up for local development.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Npm](https://www.npmjs.com/get-npm) (Comes with Node.js)
- [Java](https://www.oracle.com/java/technologies/javase-jdk8-downloads.html)

### Repo setup

1. [Fork](https://guides.github.com/activities/forking/) this repo
2. Clone the repo

    ```sh
    git clone https://github.com/your_username_/resilience-app.git
    ```

3. Install NPM packages

    ```sh
    npm install
    ```

4. Create a local environment file from the sample `.env.sample` in the project root. From your project root run:

    ```sh
    cp .env.sample .env
    ```

5. Find the appropriate keys in in the `#resilience-app` channel under `Pinned Items` and fill in your `.env` file according to that.

6. Install firebase-tools and set up your local environment 

    ```sh
    npm install -g firebase-tools
    ```

    This should install the latest version of firebase cli add `firebase` to your path.

    ```sh
    firebase login
    ```
    This will pop up your browser and allow you to login. Login using a google handle.

    ```sh
    firebase use default
    ```
    This is needed to ensure that the project-id is set in your environment.


7. Start your local development server with

   ```sh
   npm run dev
   ```


### Adding Routes to the App

1. Decide what URL the new app route is and put it in [src/app/routing/routes.ts](.src/app/routing/routes.ts). Please try to use meaningful variable names for the route, they don't need to be exactly the same as the URL.

2. Define the React routes in [src/App.jsx](./src/App.jsx) using our `<AppRoute />` component. It's a wrapper for the React `<Route />` component, but it is aware of authentication and authorization concepts.

3. Set appropriate permissions for that new route in [src/app/routing/RoutePermissions.ts](./src/app/routing/RoutePermissions.ts). The set of permissions we have defined so far are here: [src/app/model/permissions/Permissions.ts](./src/app/model/permissions/Permissions.ts). 

If you're not sure or if you don't see something that matches your usecase of your new route, please bring it up for discussion in Slack (**#resilience-app** or **#resilience-dev** channel). It's not always clear what should be a permission and what should not be, however, the rule of thumb is that we focus on [CRUD operations](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete).

_Note:_ A route will be **inaccessible** (404 Page Not Found) if you:
- don't define the route in [src/app/routing/routes.ts](.src/app/routing/routes.ts)
- don't define any permissions for the route in [src/app/routing/RoutePermissions.ts](./src/app/routing/RoutePermissions.ts). We consider the route as not ready because it hasn't been configured.

## Contributing your code, and getting involved

See [CONTRIBUTING.md](https://github.com/factn/resilience-app/blob/master/CONTRIBUTING.md) for more details on how to get involved.

### Formatting your code

This project uses [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) to handle all opinionated formatting. Install your favorite editor ESLint and Prettier plugin to set up any auto formatting in your own editor.

To format this project, simply run

```sh
npm run format
```

Our CI checks will not pass if any of our ESLint rules; formatting checks can be easily passed with a commit containing the changes made by `npm run format`

<hr />

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

## Accessibility

Using react-axe as a library to find accessibilty warnings and errors. Please check the console for warnings or errors from react-axe before committing.

## Deployment

For deployments we're using firebase hosting which allows us to deploy to multiple different environments.

Each of the commands below will require access to the respective firebase project for an authorized deployment.

For deploying to our staging environment:

```bash
$ npm run deploy:staging
```

and for production:

```bash
$ npm run deploy:production
```
