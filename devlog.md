## 4/12 - 5 hours | setting up initial commit with test connections between frontend,backend,and db,docker along with research
**assumptions**: 
- There should be a sizable number of users to check ui against, going with 200, should be enough to cause issues to deal with - pagination, loading, layout etc.
- It's okay to use docker to spin up a local dynamodb instance? easiest way to package it afaik - shouldn't need to deal with the AWS CLI

## 4/13 - 6 hours | finished getting dynamodb mock setup, thinking about changing from radix ui library after performance issues

**assumptions**:
- it's okay to use component libraries
- usecase for redux here is mostly presentation level, although there are cases here for performance. Will also be using RTK query.
- tailwind is fine (personally I have more experience with modular css but I've been enjoying tailwind lately. great article that conviced me on it a while ago: [link](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/))

## 4/14 - Working on frontend, changing my layout idea
I've decided to change from a 'view' based frontend architecture to a single-page with conditional rendering for components