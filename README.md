# GHFollow

For those who are obsessed with their GitHub followers.

### How to use

First, install the package

```
npm i ghfollow
```

Then, make an environment variable named `GH_FOLLOW` and set it's value to your [GitHub personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). **(Make sure you check `user:follow` when generating your token)**

One way of making an environment variable is to add it to a file named `.env` in your project's working directory. Your `.env` file should look something like this:

```
ENVIRONMENT_VARIALE_1=SOME_VALUE
ENVIRONMENT_VARIALE_2=SOME_OTHER_VALUE
GH_FOLLOW=<YOUR_PERSONAL_ACCESS_TOKEN>
```

where `<YOUR_PERSONAL_ACCESS_TOKEN>` is your actual GitHub token.

Now, import the `GHFollow` class using:

```
import { GHFollow } from "ghfollow";
```

or (For CommonJS)

```
const { GHFollow } = require("ghfollow");
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
