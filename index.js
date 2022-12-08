import axios from "axios";
import fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();

const GH_FOLLOW = process.env.GH_FOLLOW;
const ME = process.env.ME;

const githubUser = axios.create({
  baseURL: "https://api.github.com/user",
  headers: {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${GH_FOLLOW}`,
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

const githubUsers = axios.create({
  baseURL: "https://api.github.com/users",
  headers: {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${GH_FOLLOW}`,
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

const doTheyFollowMe = async (username) => {
  let s;
  try {
    s = await githubUsers.get(`${username}/following/${ME}`);
    s = s.status;
  } catch (err) {
    s = err.response.status;
  }
  return s === 204;
};

const doIFollowThem = async (username) => {
  let s;
  try {
    s = await githubUsers.get(`${ME}/following/${username}`);
    s = s.status;
  } catch (err) {
    s = err.response.status;
  }
  return s === 204;
};

const followers = async (page) => {
  const { data } = await githubUser.get("/followers", { params: { page } });
  return data.map((user) => user.login);
};

const following = async (page) => {
  const { data } = await githubUser.get("/following", { params: { page } });
  return data.map((user) => user.login);
};

const getAll = async (func) => {
  let page = 1;
  const allData = [];

  let data = await func(page);
  allData.push(...data);
  page++;

  while (data.length !== 0) {
    data = await func(page);
    allData.push(...data);
    page++;
  }
  return allData;
};

const unfollow = async (username) => {
  try {
    await githubUser.delete(`/following/${username}`);
    console.log(`Unfollowed ${username}`);
  } catch (err) {
    console.log(err);
  }
};

const follow = async (username) => {
  try {
    await githubUser.put(`/following/${username}`);
    console.log(`Followed ${username}`);
  } catch (err) {
    console.log(err);
  }
};

const writeJson = (filename, data) => {
  fs.writeFileSync(`${filename}.json`, JSON.stringify(data));
};

const readJson = (filename) => {
  return JSON.parse(fs.readFileSync(`${filename}.json`));
};

const unfollowNonFollowers = async () => {
  const allFollowing = await getAll(following);

  for (let i = 0; i < allFollowing.length; i++) {
    if (!(await doTheyFollowMe(allFollowing[i]))) {
      await unfollow(allFollowing[i]);
    }
  }
};

const followFollowers = async () => {
  const allFollowers = await getAll(followers);

  for (let i = 0; i < allFollowers.length; i++) {
    await follow(allFollowers[i]);
  }
};

console.log(
  `Linus Torvalds ${
    (await doTheyFollowMe("torvalds")) ? "follows" : "does NOT follow"
  } you`
);
