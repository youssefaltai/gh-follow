# GHFollow

For those who are obsessed with their GitHub followers.

### How to use

First, install the package

```
npm i ghfollow
```

Then, import the `GHFollow` class using:

```
import { GHFollow } from "ghfollow";
```

or (For CommonJS)

```
const { GHFollow } = require("./GHFollow.js");
```

Then, create an instance of `GHFollow`, and pass it your GitHub username

```
const ghf = new GHFollow("youssef-attai");
```

Now, here is a list of what you can do

- Get the usernames of your followers

```
await ghf.getAllFollowers();
```

- Get the usernames of those who you follow

```
await ghf.getAllFollowing();
```

- Follow a user

```
await ghf.follow(username);
```

- Unfollow a user

```
await ghf.unfollow(username);
```

- Check if you follow a user

```
await ghf.doIFollowThem(username);
```

- Check if a user follows you

```
await ghf.doTheyFollowMe(username);
```

- Unfollow those who are not following you

```
await ghf.unfollowNonFollowers();
```

- Follow all your followers

```
await ghf.followFollowers();
```