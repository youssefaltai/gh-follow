# GHFollow

An automation tool for people obsessed with their GitHub followers.

### Examples of what you can do

- Get the usernames of your followers

```
const allFollowers = await getAll(followers);
```

- Get the usernames of those who you follow

```
const allFollowing = await getAll(following);
```

- Follow a user

```
await follow(username);
```

- Unfollow a user

```
await unfollow(username);
```

- Check if you follow a user

```
await doIFollowThem(username);
```

- Check if a user follows you

```
await doTheyFollowMe(username);
```

- Unfollow those who are not following you

```
await unfollowNonFollowers();
```

- Follow all your followers

```
await followFollowers();
```
