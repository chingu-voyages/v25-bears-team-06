# openShelf

[![Netlify Status](https://api.netlify.com/api/v1/badges/3e3ade1a-8845-49fd-a776-2f519cfb2322/deploy-status)](https://app.netlify.com/sites/openshelf/deploys)

A web app that allows users to share books with members of their community. Users can upload books they own, check out books made available by others, or join a waitlist.

Chingu Voyage-25 (bears-team-06) (https://chingu.io/)

## Overview:

OpenShelf is a responsive web app for people to share books with one another.

## Demo:

https://openshelf.netlify.app/

## Table of Contents

- [Features](#features)
- [Development](#development)
  - [Architecture](#architecture)
  - [Technologies](#technologies)
  - [Development Style and Git Branches](#development-style-and-git-branches)
  - [Usage](#usage)
  - [Configuration](#configuration)
- [Development Environment](#development-environment)
  - [Server Variables](#server-variables)
  - [Client Variables](#client-variables)
- [Runtime](#runtime)
  - [Netlify Deployment](#netlify-deployment-client)
  - [Heroku Deployment](#heroku-deployment-server)
- [Future Updates](#future-updates)
  - [Feature Ideas](#feature-ideas)
  - [Known Bugs + Planned Fixes](#known-bugs-+-planned-fixes)
- [Authors](#authors)

## Features

- Account Login and Signup via email+password authentication
- Search for books in the OpenShelf Library

Once logged in, users will be able to:

- Upload book titles using the Google Books API
- Manage their inventory by marking books as returned or removing books they no longer want to share
- Check out books that other members have uploaded
- Join a waitlist if a book is already checked out
- Leave a waitlist

## Development

### Architecture

![TBD](imageName.jpg)

### Technologies

The primary libraries and dependencies used in the development of OpenShelf are shown below. For a complete list of dependencies, consult the package.json files inside the `client` and `server` folders.

| Library                                             | Purpose                                          | Client or Server? |
| :-------------------------------------------------- | :----------------------------------------------- | :---------------- |
| [React](https://reactjs.org/)                       | A JavaScript library for building UIs            | Client            |
| [Material-UI](https://material-ui.com/)             | React UI Component Library                       | Client            |
| [Airbnb](https://airbnb.io/javascript/react/)       | React/JavaScript Development Style Guide         | Client            |
| [MongoDB with Mongoose](https://mongoosejs.com/)    | Schema-Based MongoDB Application Data Modeling   | Server            |
| [Express](https://expressjs.com/)                   | Backend Server Framework                         | Server            |
| [GraphQL](https://graphql.org/)                     | API Query Language                               | Server            |
| [DataLoader](https://github.com/graphql/dataloader) | A generic utility for batching and caching data. | Server            |

### Development Style and Git Branches

We developed the project using a source-control branching model called [Trunk Based Development](https://trunkbaseddevelopment.com/) which is used at tech companies like Google and Facebook. The model involves developers collaborating on a single branch known as the trunk, or more commonly known as the Master or Main branch on Github.

In addition, we would create short-lived Git branches, unique to each developer, where we would push small commits and conduct code reviews using pull requests.

### Usage

| (1) Commands (`/`) | Purpose                                                            |
| :----------------- | :----------------------------------------------------------------- |
| `npm run client`   | Run Frontend Dev. Server locally                                   |
| `npm run server`   | Run Backend locally using nodemon                                  |
| `npm run dev`      | Run Frontend and Backend (with nodemon) locally using Concurrently |
|                    |

| (2) Commands (`/client`) | Purpose                          |
| :----------------------- | :------------------------------- |
| `npm start`              | Run Frontend Dev. Server locally |
| `npm run build`          | Build Frontend for Production    |
| `npm run test`           | Run Frontend Tests               |

| (3) Commands (`/server`) | Purpose                    |
| :----------------------- | :------------------------- |
| `npm start`              | Run Backend Server Locally |

### Configuration

| Location             | Purpose                               |
| :------------------- | :------------------------------------ |
| `/client`            | Frontend Directory                    |
| `../public`          | Static Assets                         |
| `../src`             | Source Directory                      |
| `../../components`   | React Components                      |
| `../../screens`      | Pages Directory                       |
| `../../dataservice`  | Data Fetching                         |
| `../../../queries`   | GraphQL Query and Variable Objects    |
| `../../../mutations` | GraphQL Mutation and Variable Objects |
| `/server`            | Backend Source Directory              |
| `../graphql`         | GraphQL Type Definitions              |
| `../../schema`       | GraphQL Schema                        |
| `../../resolvers`    | GraphQL Resolvers                     |
| `../models`          | MongoDB/Mongoose Data Schemas         |

## Development Environment

### Server Variables

Before starting the server in your local development environment, the following environment variables should be defined:

| Variable Name    | Description                                                       |
| :--------------- | :---------------------------------------------------------------- |
| AUTH_SECRET      | A random string of characters used for encrypting JSON Web Tokens |
| MONGODB_USER     | Database username, used in MongoDB Atlas connection string.       |
| MONGODB_PASSWORD | Database password, used in MongoDB Atlas connection string        |
| MONGODB_NAME     | Database name, used in MongoDB Atlas connection string            |

This is accomplished by including the following in the .env file located in the root of the `/server` directory. This .env file must never be pushed to GitHub since it contains application sensitive information such as the database username and password.

The `/server/.env` file must contain the following:

```
AUTH_SECRET = <random-secret-key>
MONGODB_USER = <db_user>
MONGODB_PASSWORD = <db_password>
MONGODB_NAME = <db_name>
```

Note: When running client and server concurrently from the root directory, you will need to have these `.env` variables inside the root folder as well.

### Client Variables

#### Google Books API

You will need a Google account and register your application with the Google API Console.
`https://developers.google.com/books/docs/v1/getting_started`

After registering your API key, store it in the .env file located in the /client directory. Again, never push this .env file to Github as it contains your secret Google Books API key.

The /client/.env file must contain the following:

```
REACT_APP_API_KEY = yourOwnAPIKeyHere
```

Note: When deploying to Netlify, make sure to add this environment variable when adding the project to Netlify. See the [Netlify Deployment Guide](/netlify-deploy-doc.md) for more information on how to do this.

## Runtime

### Netlify Deployment (client)

[Netlify Deploy Guide (with pictures!)](/netlify-deploy-doc.md)

### Heroku Deployment (server)

Due to having both the server and client in a single Github Repo, the server must be deployed using a git command to push a subtree from the root of the repository directory.

As a quick disclaimer, we are deploying the server as it is structured in the repo

#### Heroku Deployment Steps

Before deploying to Heroku, make sure you have created an account with a new project on https://heroku.com

1. After downloading the repository, from the command-line, go to `/server` directory and install dependencies.

```
cd <repo-root-directory>/server

npm install
```

2. Download the Heroku command-line interface.

MacOS

```
brew tap heroku/brew && brew install heroku
```

Ubuntu 16+

```
sudo snap install --classic heroku
```

For Windows, find the download for 64-bit or 32-bit [here](https://devcenter.heroku.com/articles/heroku-cli).

3. Login with Heroku from the command-line

```
heroku login
```

4. Verify heroku has been added to git's remote.

```
git remote -v
```

If you see "heroku" in the list, you can skip step 5.

5. Add Heroku as a remote repository

```
git remote add heroku https://git.heroku.com/<your-heroku-project-name-here>.git.
```

6. Add Config Variables (environment variables) to Heroku. Read more about these needed variables [here](#development-environment). Fill out the variables according to your variables set in `/server/.env`

```
heroku config:set AUTH_SECRET="<your-auth-secret>" --app your-app-name
heroku config:set MONGODB_USER="<db_user>" --app your-app-name
heroku config:set MONGODB_PASSWORD="<db_password>" --app your-app-name
heroku config:set MONGODB_NAME="<db_name>" --app your-app-name
```

7. The Heroku command-line uses git commits to figure out what to push to Heroku.

   Since we are using a mono repo (client and server are in one github repo), then we will create a subtree with git and specify the subdirectory.

   Before we do that, we have to be in the root directory. If you've been following along, at this point you should be inside `/server` and need to go up one level.

```
cd ../
```

8. Then let's make a subtree push to Heroku with the server directory which follows this structure.

```
git subtree push --prefix [subdirectory] [remote] [branch]
--
git subtree push --prefix server heroku master
```

Although this method works, if there is ever a time where the commits made to your remote repository do not match the commits made in Heroku, there will be a conflict and the above command will not let you commit. If a problem ever comes up, the below command is the alternative method of pushing to Heroku.

```
git push heroku $(git subtree split --prefix=server $(git symbolic-ref --short -q HEAD)):master --force
```

That's it! The server is now deployed on Heroku.

## Future Updates

### Feature Ideas

User Data:

- User locations to serve a wider geographical area
- Contact / messaging feature

Book Search:

- Add book search filters i.e. by location radius, availability, etc.

### Known Bugs + Planned Fixes

- TBD

## Authors

- Babak Chehraz [[Portfolio](https://bit.ly/3cecdMs)]
- Andrew Knox
- Michelle Bence
