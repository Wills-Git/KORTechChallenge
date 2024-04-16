## 4/12 - 5 hours | setting up initial commit with test connections between frontend,backend,and db,docker along with research
**assumptions**: 
- There should be a sizable number of users to check ui against, going with 200, should be enough to cause issues to deal with - pagination, loading, layout etc.
- It's okay to use docker to spin up a local dynamodb instance? easiest way to package it afaik - shouldn't need to deal with the AWS CLI

## 4/13 - 6 hours | finished getting dynamodb mock setup, thinking about changing from radix ui library after performance issues

**assumptions**:
- it's okay to use component libraries
- usecase for redux here is mostly presentation level, although there are cases here for performance. Will also be using RTK query.
- tailwind is fine (personally I have more experience with modular css but I've been enjoying tailwind lately. great article that conviced me on it a while ago: [link](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/))

## 4/14 4 hours - Working on frontend, changing my layout idea
I've decided to change from a 'view' based frontend architecture to a single-page with conditional rendering for components.
Going with a side sheet for other user profiles, and converting login sidebar for the current user profile/feed on login. 
User profile card at top with status, account interaction buttons below, post feed below that
Architecture is a bit simpler but page rendering may suffer from the amount of components on screen. 

**assumptions**:
- none to mention at the moment

*recent thoughts*:
- I'm using a single table ddb design and I weighed using a PK: u#userID#Friendlist - SK: #(other users IDs) against what I've ultimately gone with, using PK: u#${userID}#friendstatus - SK: `u#${requestedUserPK}` with a friend status attribute. I believe the operations for updating and deleting the first approach would be more prone to error, harder to consume, and possibly more expensive. I also considered GSIs but decided the current approach is sufficient and flexible.
- Extended the shadcn toast component easily, adding a 'positive' variant. There was some pain in the setup of shadcn but it's a flexible component library, and I like that it uses Radix primitives. 
- I'm using the u#PK of each user as the unique key for react components - I would not do that in production for security reasons, instead would use a uuid, or perhaps hash the PK.

## 4/15 5 hours - Working on presentation, styling

**assumptions**:
- I probably wont get around to implementing posts - if I were to implement posts I would use a schema like PK: u#ID#posts - SK: p(for post)#ID. The post content would be an attribute on PK: p#ID - SK:'info'. There are a couple ways you could model it and it would take me a while to decide what the absolute best access pattern would be. One drawback of dyanmoDB is that you really have to have a good handle on your access patterns before inserting data, as there are esoteric difficulites with normalizing dynamoDB.
- I also probably won't get around to websockets, however that implementation has fewer things to think about (not none). I would use websockets throughout the backend to broadcast to connected users any relevant updates that were made to the database - new post from a friend, friend status changing etc. I might manage a minimal implementation tomorrow if the rest of the frontend goes well.

## 4/16 finish styling frontend, status and friend statuses
