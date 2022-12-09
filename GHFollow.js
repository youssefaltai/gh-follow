const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const GH_FOLLOW = process.env.GH_FOLLOW;

exports.GHFollow = class GHFollow {
  constructor(me) {
    this.me = me;

    this.githubUser = axios.create({
      baseURL: "https://api.github.com/user",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${GH_FOLLOW}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    this.githubUsers = axios.create({
      baseURL: "https://api.github.com/users",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${GH_FOLLOW}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
  }

  doTheyFollowMe = async (username) => {
    let s;
    try {
      s = await this.githubUsers.get(`${username}/following/${this.me}`);
      s = s.status;
    } catch (err) {
      s = err.response.status;
    }
    const res = s === 204;
    if (res) console.log(`${username} follows you`);
    else console.log(`${username} does NOT follow you`);
    return res;
  };

  doIFollowThem = async (username) => {
    let s;
    try {
      s = await this.githubUsers.get(`${this.me}/following/${username}`);
      s = s.status;
    } catch (err) {
      s = err.response.status;
    }
    const res = s === 204;
    if (res) console.log(`You are following ${username}`);
    else console.log(`You are NOT following ${username}`);
    return res;
  };

  followers = async (page) => {
    const { data } = await this.githubUser.get("/followers", {
      params: { page },
    });
    return data.map((user) => user.login);
  };

  following = async (page) => {
    const { data } = await this.githubUser.get("/following", {
      params: { page },
    });
    return data.map((user) => user.login);
  };

  getAll = async (func) => {
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

  getAllFollowers = async () => {
    console.log("Getting all those who follow you...");
    return await this.getAll(this.followers);
  };

  getAllFollowing = async () => {
    console.log("Getting all those you follow...");
    return await this.getAll(this.following);
  };

  unfollow = async (username) => {
    try {
      await this.githubUser.delete(`/following/${username}`);
      console.log(`Unfollowed ${username}`);
    } catch (err) {
      console.log(err);
    }
  };

  follow = async (username) => {
    try {
      await this.githubUser.put(`/following/${username}`);
      console.log(`Followed ${username}`);
    } catch (err) {
      console.log(err);
    }
  };

  unfollowNonFollowers = async () => {
    const allFollowing = await this.getAll(this.following);

    for (let i = 0; i < allFollowing.length; i++) {
      if (!(await this.doTheyFollowMe(allFollowing[i]))) {
        await this.unfollow(allFollowing[i]);
      }
    }
  };

  followFollowers = async () => {
    const allFollowers = await this.getAll(this.followers);

    for (let i = 0; i < allFollowers.length; i++) {
      await this.follow(allFollowers[i]);
    }
  };

  writeJson = (filename, data) => {
    fs.writeFileSync(`${filename}.json`, JSON.stringify(data));
  };

  readJson = (filename) => {
    return JSON.parse(fs.readFileSync(`${filename}.json`));
  };

  update = async () => {
    const currentFollowers = await this.getAllFollowers();
    const previousFollowers = this.readJson("followers");
  
    for (const previousFollower of previousFollowers) {
      if (!currentFollowers.includes(previousFollower)) {
        console.log(`${previousFollower} unfollowed you`);
        await this.unfollow(previousFollower);
      }
    }
  
    for (const currentFollower of currentFollowers) {
      if (!previousFollowers.includes(currentFollower)) {
        console.log(`${currentFollower} started following you`);
        await this.follow(currentFollower);
      }
    }
  
    this.writeJson("followers", currentFollowers);
  };
};
