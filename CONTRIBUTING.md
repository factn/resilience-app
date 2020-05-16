# Contributing

We love pull requests from everyone. By participating in this project, you
agree to abide by the [code of conduct].

[code of conduct]: /CODE_OF_CONDUCT.md

## Feature Branch aka Forking Workflow

We follow the **feature branch** workflow with a preference for the 'forking' workflow.

We suggest you use the forking workflow to start with but you may also submit feature branches once you have been given 'contributor' status/ 

- Set up your dev environment as described on the [README](https://github.com/factn/resilience-app/blob/master/README.md)
- Create your feature branch following our [branch naming conventions](#branch-naming-conventions)
- Get your work done
- Test and format your code. 
- See especially the [formating guidelines](#formatting-guidelines). (If code doesn't pass the formatting lint it cannot be merged.)
- Commit your changes
- Push your changes to a branch on this repo or to a branch on your own repo and [submit a pull request](#submitting-a-pr).

At this point you're waiting on us to comment and approve your Pull Request (aka 'PR'). As I write this we're still working hard to get to all PRs as fast as possible. We should get back to you in a couple of days but very often sooner. To speed things along come join our slack and post a message. We'd love to hear from you anyway!

Some things that will increase the chance that your pull request is accepted:

- Write clean code
- Format your code `npm run format`
- Build a feature we need
- Write a [good commit message][commit]
- Come [join our slack] and talk to us about it there - in the #frontend channel.

The feature branch workflow is explained in more detail [by Atlassian here].

[commit]: http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
[pr]: https://github.com/factn/resilience-app/compare
[by atlassian here]: https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow
[readme]: https://github.com/factn/resilience-app/blob/master/README.md
[join our slack]: https://rebrand.ly/mutualaid_slack

## Branch naming conventions

Please use the following format when checking out branches

```
git checkout -b [type]/[id]-[description]
```

- `type` : `[feat, bug, enhancement, docs]`
- `id` :
  - For `feat` branches use the id corresponding to the feature story in AirTable
  - All other types are presumed to be github issues and should refer to the issue id

## Formatting Guidelines

This project is setup with the basic [Prettier](https://prettier.io) settings with a couple settings using [ESLint](https://eslint.org/).
Our ESLint configs can be found under `eslintConfig.rules` in [package.json](https://github.com/factn/resilience-app/blob/master/package.json).

To format your code according to these rules, before you send a pull request simply run:

```
npm run format
```

Commit your new formatted changes

To check for formatting errors, you can run:

```
npm run format:check
```

## Submitting a PR

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

## Becoming a contributor 

If you don't want to wait for us to give you write access you are more than welcome to use the forking workflow and just [fork this repo](https://guides.github.com/activities/forking/), create a PR and go ahead. We'd encourage that.

However, if you visit the #resilience-app channel and request to be given 'contributor' access to this repo it's a very easy process to give you that access. This will allow you to create branches *within* this repo and also grant you access to some of our project management tools..

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
