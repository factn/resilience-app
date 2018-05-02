# Welcome to [Lion](https://lion-frontend-uat.herokuapp.com/)!

## Repo setup

  - Clone the repository on your machine

```
git clone git clone git@bitbucket.org:rabidtech/lion-frontend.git [folder name]
cd [folder name]
```

[Or you can use the HTTPS link, though SSH is prefered]

```
git clone git clone git clone [Your user link]/rabidtech/lion-frontend.git [folder name]
cd [folder name]
```

  - Inside the repository, install the necessary packages

```
npm install
```

  - Start the local server

```
npm start
```

  - As you work in the repository, your changes will publish and refresh your local server on the fly.
  - To stop the server, use the terminal command `Ctrl. + C`

**All commands in one clipboard:**

```
git clone git clone git@bitbucket.org:rabidtech/lion-frontend.git [folder name]
cd [folder name]
npm i
npm start
```


## Heroku Deployment

  - Login into Heroku with Email and Password:

```
heroku login
```

  - Add the Heroku branch to your local machine:

```
heroku git:remote -a lion-frontend-uat
```

  - Develop as per normal, branching and merging to master.
  - Once you are happy with master, push the changes into the Heroku branch:

```
git push heroku master
```

  - This also runs all of the build and deployment commands, so it may take a moment, but once it's complete, the live link should be updated.