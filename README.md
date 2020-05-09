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
    <a href="https://github.com/factn/resilience-app">View Demo</a>
    ·
    <a href="https://github.com/factn/resilience-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/factn/resilience-app/issues">Request Feature</a>

  </p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
- [Repo setup](#repo-setup)
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

## Getting Started

Here are a few steps to help get set up for local development.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Npm](https://www.npmjs.com/get-npm) (Comes with Node.js)
- [Java](https://www.oracle.com/java/technologies/javase-jdk8-downloads.html) (optional)

## Repo setup

1. Fork this repo
2. Clone the repo

   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```

3. Install NPM packages

   ```sh
   npm install
   ```

4. Create a local environment file from the sample `.env.sample` in the project root. From your project root run:

   ```sh
   cp .env.sample .env.development
   ```

5. Find the appropriate keys in in the `#resilience-app` channel under `Pinned Items` and fill in your `.env.development`

6. Start your local development server with

   ```sh
   npm run dev
   ```

## Formatting your code

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
