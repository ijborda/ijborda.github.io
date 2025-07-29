+++
author = "Imari Joy C. Borda"
title = "Google Auth and Passport"
date = "2019-07-31"
description = "Brief Guide in Using Google Auth and Passport"
tags = [
    "tech",
    "mongodb",
    "javascript",
    "login",
    "database",
    "authentication",
    "session",
    "cookies"
]
toc = true
draft = true
+++

Special thanks to [Traversy Media](https://www.youtube.com/watch?v=SBvmnHTQIPY&ab_channel=TraversyMedia) for the walkthrough!

## Install Dependencies

1. `express` for setting up the routes
2. `mongoose` for the database
3. `connect-mongo` and `express-session` for storing loggin sessions and cookies
4. `express-handlebars` or `ejs` for templating
5. `dotenv` for storing environment variables
6. `method-override` to allow put and delete requests from templates
7. `moment` to handle dates
8. `morgan` for logs
9. `passport` and `passport-google-oauth20` for authentication and accounts
10. `cross-env` (dev dependency) to set global variable for deployment.

## Create login page

- Create a link for login using `<a></a>` with `href="/auth/google"`. This will be the routh for google logins.s

## Generate Google+ API key

- Go to [Google Cloud Console](https://console.cloud.google.com/getting-started?pli=1).
- Create a project. Go to: `Cloud Overview` > `Dashboard` > `Create Project`.
- Enable Google+ API. Go to: `APIs & Services`. Then click `Enable APIs and Services`. Select `Google+ API` then enable.
- Create a credential. In Google+ API, go to: `Credential` > `Create Credentials` > `OAuth Client ID`.
- Fill out the necessary information. Be sure to set `Authorized redirected URIs` to the callback url. Example: `http://localhost:1111/auth/google/callback`. Be sure to change this during deployment.
- Take note of the generated client ID and client secret. You may save in the `.env` file.

## Configure passport

- Go to [Passport](https://www.passportjs.org/packages/) to select your login strategies. Use this as the guide.
- In server.js, setup passport and express session. Note that the middleware of session should be above the middleware of passport.

  ```js
  const session = require('express-session');
  const passport = require('passport');
  require('./config/passport')(passport);
  app.use(
  	session({
  		secret: 'keyboard cat',
  		resave: false,
  		saveUninitialized: false,
  	})
  );
  app.use(passport.initialize());
  app.use(passport.session());
  ```

- `resave: false` means we do not want to save a session if nothing is initialized.
- `saveUninitialized: false` means do not create a session until something is stored.

## Populate passport.js

- This is where the strategy is configured.
- This is also where the profile data from google is saved to the database.
- Create a file `/config/passport.js`
- Example: [config/passport.js]()

## Create User model

- This is the database schema for users.
- Create a file `/models/User.js`
- Example: [models/User.js]()

## Setup the routes

- This is where the login routes are configured during success or failures.
- Routes for login and logout are configured here.
- Create a file `/routes/auth.js`
- Example: [routes/auth.js]()

## Create logout link

- Create a link for logout using `<a></a>` with `href="/auth/logout"`. This will be the route for google logouts.

## Protect private routes

- This disallow direct typing of private urls. When this is done, the user that is not signedin should be redirected to the login page.
- This also allows redirection to dashboard (rather than the login page) when user is already login.
- Create a file `/middleware/auth.js`
- Example: [middleware/auth.js]()
- Then add `ensureGuest` as middleware when logging in. And dd `ensureAuth` as middleware when going to dashboard.

## Store session in database

- This avoids getting kickout when server restarts
- In server.js, setup `connect-mongo`. Be sure that it is below the `express-session`.

  ```js
  const mongoose = require('mongoose');
  const MongoStore = require('connect-mongo');
  ```

- Modify middleware for session.
  ```js
  app.use(
  	session({
  		secret: 'keyboard cat',
  		resave: false,
  		saveUninitialized: false,
  		store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
  	})
  );
  ```
