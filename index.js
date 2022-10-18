import fetch from "node-fetch";

const token = process.env.TOKEN;

async function unfollow(username) {
  const response = await fetch(
    `https://api.github.com/user/following/${username}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(`Unfollowed ${username}`);
}

async function getFollowing() {
  const response = await fetch("https://api.github.com/user/following", {
    method: "GET",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
    },
  });

  const following = await response.json();
  console.log(`Following: ${following}`);

  return following;
}

async function unfollowAll() {
  const following = await getFollowing();
  following.forEach(async (user) => {
    await unfollow(user.login);
  });
}

async function getFollowers() {
  const response = await fetch("https://api.github.com/user/followers", {
    method: "GET",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
    },
  });
  const followers = await response.json();
  console.log(`Followers: ${followers}`);

  return followers;
}

async function follow(username) {
  const response = await fetch(
    `https://api.github.com/user/following/${username}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(`Followed ${username}`);
}

async function followAllFollowers() {
  const followers = await getFollowers();
  followers.forEach(async (user) => {
    await follow(user.login);
  });
}


// await unfollowAll();
// await followAllFollowers();
