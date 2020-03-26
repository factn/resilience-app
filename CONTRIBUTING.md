# Contributing

We love pull requests from everyone. By participating in this project, you
agree to abide by the [code of conduct].

[code of conduct]: /CODE_OF_CONDUCT.md

## Forking workflow 

Anyone can get started and start coding without having to ask for permission because we follow the **forking workflow** 

The super short version is:
- [Fork] this repo
- Clone your  repo to your local machine
```
git clone git@github.com:your-username/mutualaidworld_frontend.git
```
- Set up your dev environment as described on the [README](https://github.com/factn/mutualaidworld_frontend/blob/master/README.md)
- Make your change and test it works
- Commit your changes
- Push to your fork and [submit a pull request][pr].

At this point you're waiting on us to comment and approve your Pull Request (aka 'PR'). Things are moving very fast and we are working to get to all the PRs as fast as possible but we should get back to you in a couple of days at most (usually within a few hours at the moment).

Some things that will increase the chance that your pull request is accepted:

* Write clean code 
* Build a feature we need
* Write a [good commit message][commit]
* Come [join our slack] and talk to us about it there - in the #frontend channel.

This process is explained in more detail [by Github here] and [by Atlassian here].

[commit]: http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
[pr]: https://github.com/factn/mutualaidworld_frontend/compare
[by Atlassian here]: https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow
[fork]: https://guides.github.com/activities/forking/
[readme]: https://github.com/factn/mutualaidworld_frontend/blob/master/README.md
[join our slack]: https://join.slack.com/t/coronadonor/shared_invite/zt-cwm4b79c-12NHPqGWbzZ1aR5geyME1g

## How do I keep my own code up to date with the main repo, easily?

A potential issue. Here's what we recommend. 

This assumes you have already set up your local development environment to sync with your own copy of the repo on github, per the above. That is, when you type `git remote -v` it should look like this, 
``` 
$ git remote -v
origin  git@github.com:your_username/mutualaidworld_frontend.git (fetch)
origin  git@github.com:your_username/mutualaidworld_frontend.git (push)
```

**Step 1: Add a seccond 'remote' to your local git repository**

 add a second remote called `upstream` which will let us track changes on the main repository

```
$ git remote add origin  https://github.com/factn/mutualaidworld_frontend.git
```

Now we should have two remotes.
```
$ git remote -v
origin  git@github.com:your_username/mutualaidworld_frontend.git (fetch)
origin  git@github.com:your_username/mutualaidworld_frontend.git (push)
upstream        https://github.com/factn/mutualaidworld_frontend.git (fetch)
upstream        https://github.com/factn/mutualaidworld_frontend.git (push)
```

**Step 2: Do your work on a feature branch**

This is going to work a lot easier if you do your code on a feature_branch.. so we'll explain it that way. 

So, let's assume that you've been doing your coding on a 'feature branch' and pushing to origin (your repo on github) like this..
```
git checkout -b feature_branch
... code code code ..
git commit -a -m "your commit message"
git push --set-upstream origin feature_branch
... code code code ..
git commit -a -m "your second commit message"
git push 
... etc ..
```

**Step 3: Merge your feature branch with latest from the main repo**

Here's where, you may have been coding for a while, and you want to pull in the latest code from the main repo, so that your code is ready to go (rebased) on top of that. 

First, make sure everything in your branch is committed. 

Pull the upstream master -> your local master 
```
git checkout master
git pull --rebase upstream master
```
(if you have been keeping the master branch untouched this should be an easy merge)

Rebase your feature branch on the master branch 
```
git checkout feature_branch
git rebase master
```

Merging with the master branch may require some manual intervention, but all the code is in your local repo so hopefully you can use whatever tools you prefer to do this. If necessary you can do a `git merge`, but we prefer a `git rebase` if possible just to keep the history easier to navigate (and make later rebasing easier) ;-)

Once you have everything merged in, sorted and working locally you can push to your origin feature_branch
```
git push origin feature_branch
```
(If you did a `git push --set-upstream origin feature_branch` earlier this is the same as just `git push`)

**Step 4: Create another PR **

Go into github and create a PR to merge directly from `yourepo/feature_branch -> main_repo/master`

Let us know how you go with this workflow. If it's driving everyone bonkers we will try to find ways to make it simpler!

## What are the list of tasks that need doing?

For now, please [join our slack] to get a sense of where things are at, but we are working on a roadmap and a list of user stories as well as bunch of designs. All these things are happening at the same time, so stay tuned for those links. We're working hard to capture needs directly from mutual aid groups on the ground. 

## Who approves PRs?

At the moment all PRs need to be approved by one of the people with commit/write access to the core repository.

You can see [who is currently in that group](https://github.com/orgs/factn/teams/mutualaid_frontend_committers)

We'd like to emphasize that you really don't need to be a core committer in order to commit to our project. Check out the [list of contributors](https://github.com/factn/mutualaidworld_frontend/graphs/contributors)

However the process for becoming a committer (and vice versa) is also transparent:

1. You have to make at least one PR and have it accepted and merged 
2. Ideally youve been around on the slack chat for a bit and been part of the discussion. Being able to get along and 'play nicely' with others is also important for this role.
3. We need a unanimous consent of all existing committers to add someone to write access. (Exact process is via chat in slack currently).
4. Ideally we would like folks who are reasonably senior in terms of experience to take on this role. We may need to 'move fast and break things' but it would be good if, as we incur technical debt we are also able to recognize that technical debt and understand the architectural level implications of certain changes. 
5. We are working on a process whereby people with commit access can go back to being just regular contributors. Obviously it can be via voluntary choice, but, heads up, an >=80% approval of existing committers is all that is required to remove commit access.
6. We will refine this process over coming days, by consensus, but if it becomes an issue in future, 80% approval is also required to change this process.



## What does success look like?

Just to reiterate from the main project 

- Be helpful, on the ground, for real world organisers
- Be easy for new developers to commit code quickly
- Be easy to use
- Be robust and scalable

**No matter your role, your help is very much appreciated!**

