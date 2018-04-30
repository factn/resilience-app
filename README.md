Welcome to Lion!

## Heroku Deployment

Login into Heroku with Email and Password:

`heroku login`

Then add the heroku branch to your local machine:

`heroku git:remote -a lion-frontend-uat`

Develop as per normal, branching and merging to master and branching and swearing and merging to master again. Once you are happy with master, push the changes into the heroku branch:

`git push heroku master`
