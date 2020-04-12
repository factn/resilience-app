# Contributing

We love pull requests from everyone. By participating in this project, you
agree to abide by the [code of conduct].

[code of conduct]: /CODE_OF_CONDUCT.md

## Feature Branch Workflow 

We follow the **feature branch workflow** 

The super short version is:
- Clone this  repo to your local machine
```
git clone git@github.com:factn/resilience-app.git
```
- Set up your dev environment as described on the [README](https://github.com/factn/resilience-app/blob/master/README.md)
- Make a branch where you are going to do your coding. See [branch naming conventions](#branch-naming-conventions)
- Make your change and test it works
- Commit your changes
- [Join our slack],  visit the #resilience-app channel and request to be given write access to this repo.
- Push your changes to a branch on this repo and [submit a pull request](#submitting-a-pr).

At this point you're waiting on us to comment and approve your Pull Request (aka 'PR'). Things are moving pretty fast and we are working to get to all the PRs as fast as possible. We should get back to you in a couple of days but very often much sooner.

Some things that will increase the chance that your pull request is accepted:

* Write clean code 
* Build a feature we need
* Write a [good commit message][commit]
* Come [join our slack] and talk to us about it there - in the #frontend channel.

The feature branch workflow is explained in more detail [by Atlassian here].

[commit]: http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
[pr]: https://github.com/factn/resilience-app/compare
[by Atlassian here]: https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow
[readme]: https://github.com/factn/resilience-app/blob/master/README.md
[join our slack]: https://bit.ly/join_mutualaid_slack

## Branch naming conventions

Please use the following format when checking out branches

```
git checkout -b [type]/[id]-[description]
```

- `type` : `[feat, bug, enhancement, docs]`
- `id` : 
    - For `feat` branches use the id corresponding to the feature story in AirTable
    - All other types are presumed to be github issues and should refer to the issue id

## Submitting a PR

If you don't want to wait for us to give you write access you are more than welcome to use the forking workflow for your first PR and just [fork this repo](https://guides.github.com/activities/forking/) and then create a PR that way.
In fact we'd encourage it for the first PR.

If the PR is for a feature please provide a link to that card in AirTable.

For PRs that address github issues please use one of the following keywords followed by the issue `id` so that those can auto close when the PR has been merged.

- close
- closes
- closed
- fix
- fixes
- fixed
- resolve
- resolves
- resolved

example: `closes #123`

## What are the list of tasks that need doing?

For now, please [join our slack] to get a sense of where things are at. You can also [see our roadmap here](https://airtable.com/invite/l?inviteId=invAIFQQVcucfXfWx&inviteToken=a9ca21ad9b07a25b40d520f6c43855b006dd83b61cdccbb38799dcac551a4b0d). 

If you ask on slack, we can give you access to the group on airtable that will let you grab tasks off the backlog and start doing that, but we'd like to get you up to speed on how that works. We're working hard to capture needs directly from mutual aid groups on the ground so wnat to be sure that it works like that.

## Who approves PRs?

At the moment all PRs need to be approved by one of the people [in the resilience-app-committers group](https://github.com/orgs/factn/teams/ resilience-app-committers) before they can land on master.

But let us emphasize you don't need to be in that group to be a valued contributor to our project. Check out the [list of contributors](https://github.com/factn/resilience-app/graphs/contributors) for all the people who have contributed code so far. All much valued and to be forever famous in the halls of wherever awesome open source contributing awesome people go.

However for the record, and so that the process for being able to merge to the master branch is transparent. It is as follows.

1. You have to make at least one PR and have it accepted and merged 
2. Ideally youve been around on the slack chat for a bit and been part of the discussion. Being able to get along and 'play nicely' with others is also important for this role.
3. We need a unanimous consent of all existing committers to add someone to write access. (Exact process is via chat in slack currently).
4. Ideally we would like folks who are reasonably senior in terms of experience to take on this role. We may need to 'move fast and break things' but it would be good if, as we incur technical debt we are also able to recognize that technical debt and understand the architectural level implications of certain changes. 
5. We are working on a process whereby people with commit access can go back to being just regular contributors. Obviously it can be via voluntary choice, but, heads up, an >=80% approval of existing committers is all that is required to remove commit access.
6. We will refine this process over coming days, by consensus, but if it becomes an issue in future, 80% approval is also required to change this process.


## What does success look like?

Just to reiterate from the main project. This is what success looks like..

- Be helpful, on the ground, for real world organisers
- Be easy for new developers to commit code quickly
- Be easy to use
- Be robust and scalable

**No matter your role, your help is very much appreciated!**

