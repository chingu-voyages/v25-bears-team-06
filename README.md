# openShelf

A web app that allows users to share books with members of their community. Users can upload books they own, check out books made available by others, or join a waitlist.

Chingu Voyage-25 (bears-team-06) (https://chingu.io/)

## Overview:

OpenShelf is a responsive web app for people to share books with one another. T

## Demo:

url here

## Table of Contents

- [Features](#features)
- [Development](#development)
  - [Architecture](#architecture)
  - [Technologies](#technologies)
  - [Development Style and Git Branches](#development-style-and-git-branches)
  - [Useage](#usage)
  - [Configuration](#configuration)
- [Development Environment](#development-environment)
- [Runtime](#runtime)
  - [X-DeploymentPlatform Deployment](#X-DeploymentPlatform-deployment)
    - [X-DeploymentPlatform Deployment Steps](#X-DeploymentPlatform-deployment-steps)
  - [Heroku Deployment](#heroku-deployment)
    - [Heroku Deployment Steps](#heroku-deployment-steps)
- [Future Updates](#future-updates)
  - [Known Bugs + Planned Fixes](#known-bugs-+-planned-fixes)
- [Authors](#authors)

## Features

- Account Login and Register via email+password authentication

Once authenticated, users are able to...

- Upload book titles using Google Books API
- Check out books that other users have uploaded
- Join a waitlist if a book is already checked out by someone else
- Remove books they no longer want to share or leave a waitlist

## Development

### Architecture

![TBD](imageName.jpg)

### Technologies

The primary libraries and dependencies used in the development of openShelf are shown below. For a complete list of dependencies, consult the package.json files inside `client` and `server` folders.

| Library                                                            | Purpose                                                                                                    | Client or Server? |
| :----------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------- | :---------------- |
| [React](https://reactjs.org/)                                      | A JavaScript library for building UIs                                                                      | Client            |
| [Material-UI](https://material-ui.com/)                            | React UI Component Library                                                                                 | Client            |
| [Apollo Client](https://www.apollographql.com/docs/react/)         | State management library for JavaScript that enables you to manage both local and remote data with GraphQL | Client            |
| [Airbnb](https://airbnb.io/javascript/react/)                      | React/JavaScript dev. Style Guide                                                                          | Client            |
| [GraphQL](https://graphql.org/)                                    | API Query Language                                                                                         | Both              |
| [Apollo Server](https://www.apollographql.com/docs/apollo-server/) | GraphQL Server                                                                                             | Server            |
| [MongoDB with Mongoose](https://mongoosejs.com/)                   | Schema-Based MongoDB Application Data Modeling                                                             | Server            |
| [Express](https://expressjs.com/)                                  | Backend Server Framework                                                                                   | Server            |

### Development Style and Git Branches

We developed the project using a source-control branching model called [Trunk Based Development](https://trunkbaseddevelopment.com/) which is used at tech companies like Google and Facebook. The model involves developers collobrating on a single branch known as the trunk, or more commonly known as the Master branch on Github.

In addition, we would create short-lived Git branches, unique to each developer, where we would push small commits and conduct code reviews using pull requests.

### Usage

| (1) Commands (`/`) | Purpose                                             |
| :----------------- | :-------------------------------------------------- |
| `npm run client`   | Run Frontend Dev. Server locally                    |
| `npm run server`   | Run Backend locally using Nodemon                   |
| `npm run dev`      | Run Frontend and Backend locally using Concurrently |
|  |

| (2) Commands (`/server`) | Purpose                           |
| :----------------------- | :-------------------------------- |
| `npm start`              | Run Backend Server                |
| `npm run devStart`       | Run Backend locally using Nodemon |
| `npm run test`           | Run Backend Tests                 |

### Configuration

| Location          | Purpose                                                            |
| :---------------- | :----------------------------------------------------------------- |
| `/client`         | Frontend source directory                                          |
| `../components`   | App Components (React)                                             |
| `../pages`        | Nextjs Pages directory                                             |
| `../public`       | Static Assets                                                      |
| `../theme`        | Global Styles directory                                            |
| `../utils`        | Frontend Helper Methods                                            |
| `../../graphql`   | GraphQL Server Queries, Mutations, Variables used in Apollo Client |
| `/server`         | Backend source directory                                           |
| `../graphql`      | GraphQL Resolvers, Type Definitions, and Schema                    |
| `../../utils`     | GraphQL Helper Methods                                             |
| `../../resolvers` | GraphQL Resolvers                                                  |
| `../models`       | MongoDB/Mongoose Data Models and Schemas                           |
| `../tests`        | Backend Tests                                                      |
| `../utils`        | Backend Helper Methods                                             |

## Development Environment

Before starting the server in your local dev. environment,the following environment variables should be defined:

| Variable Name           | Description                                                                                     |
| :---------------------- | :---------------------------------------------------------------------------------------------- |
| MONGO_CONNECTION_STRING | MongoDB Atlas connection string (e.g. `mongodb+srv://MONGO_USER:MONGO_PASSWORD@cluster...`)     |
| PORT                    | Server Port (5000 by default for local deploy). In production Heroku will provide its own port. |

This is accomplished by including the following in the .env file located in the root of the `/server` directory. This .env file must never be pushed to GitHub since it contains application sensitive information such as the database username and password.

The `/server/.env` file must contain the following:

```
MONGO_CONNECTION_STRING="mongodb+srv://..."
SESSION_SECRET="random character string"
REDIS_URL="127.0.0.1:6379"
PORT=5000
```

Google Books API

You will need a Google account and register your application with the Google API Console.
`https://developers.google.com/books/docs/v1/getting_started`

After registering your API key, store it in the .env file located in the /client directory. Again, never push this .env file to Github as it contains your secret Google Books API key.

```
REACT_APP_API_KEY = yourOwnAPIKeyHere
```

## Runtime

### X-DeploymentPlatform Deployment

#### X-DeploymentPlatform Deployment Steps

1. After downloading the repository, navigate to the `/client` directory in your command line and install dependencies:

```
cd local-repo-root-directory/client

npm install
```

2. install the X-DeploymentPlatform command-line interface using npm:

```
// tbd
```

3. Initialize X-DeploymentPlatform by running this command and following the prompts from your command line:

```
// tbd
```

4. Deploy. By default the deploy command deploys to a preview URL and requires the `--prod` flag to deploy to production

```
// tbd
-- or --

// tbd
```

Your client is now deployed on X-DeploymentPlatform!

### Heroku Deployment

Due to having both the server and client in a single Github Repo, the server must be deployed to Heroku using a git command to push a subtree from the root of the repository directory.

#### Heroku Deployment Steps

Before deploying to Heroku, make sure you have created an account with a new project on https://heroku.com

**\*Disclaimer**: In order to deploy with Heroku with Redis, you must have a verified Heroku account which means adding a credit card to your account.\*

1. After downloading the repository, from the command line, go to `/server` directory and install dependencies.

```
cd local-repo-root-directory/server

npm install
```

2. Download the Heroku command line interface.

MacOS

```
brew tap heroku/brew && brew install heroku
```

Ubuntu 16+

```
sudo snap install --classic heroku
```

For Windows, find the download for 64-bit or 32-bit [here](https://devcenter.heroku.com/articles/heroku-cli).

3. Login with Heroku from the command line

```
heroku login
```

4. Check to see if your project already has a redis instance

```
heroku addons | grep heroku-redis
```

5. If you don't have a redis instance, add one now using the free hobby-dev tier. Make sure to replace 'your-app-name' with your project name in Heroku.

This will automatically add the REDIS_URL env variable to your Heroku project settings.

```
heroku addons:create heroku-redis:hobby-dev -a your-app-name
```

6. Add Config Variables to Heroku (environment variables). Read more about these needed variables [here](#development-environment). Fill out the variables according to your variables set in `/server/.env`

```
heroku config:set MONGO_CONNECTION_STRING="mongodb+srv://..." --app your-app-name
heroku config:set ORIGIN="your_Netlify_deployment_url" --app your-app-name
heroku config:set SESSION_SECRET="your session secret from .env folder goes here" --app your-app-name
```

7. the Heroku command line uses git commits to figure out what to push to Heroku. If you have not pushed your project to your own remote branch on Github or if you have previously made changes in the code, make sure you run the following:

```
git add .
git commit -m "my commit message"
```

8. Since we want to push the `/server` directory to Heroku only, we must use a subtree. This is how we do it:

Before we do that, we need to go back one level in the directory since the last place we left off was inside the `/server` directory.

```
cd ../
```

```
git subtree push --prefix server heroku master
```

Although this method works, if there is ever a time where the commits made to your remote repository do not match the commits made in Heroku, there will be a conflict and the above command will not let you commit. If a problem ever comes up, the below command is the alternative method of pushing to Heroku.

```
git push heroku $(git subtree split --prefix=server $(git symbolic-ref --short -q HEAD)):master --force
```

That's it! You're now deployed on Heroku using the Redis add-on.

## Future Updates

User Data:

- Add user location to serve wider geographical area
- Add contact / messaging feature

### Known Bugs + Planned Fixes

- TBD

## Authors

- Babak Chehraz
- Andrew Knox
- Michelle Bence
