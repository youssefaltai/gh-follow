const axios = require("axios");
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

        this.allFollowing = [];
        this.allFollowers = [];
    }

    init = async () => {
        this.allFollowing = await this.getAllFollowing();
        this.allFollowers = await this.getAllFollowers();
    };

    doTheyFollowMe = async (username) => {
        let responseStatus;
        try {
            responseStatus = await this.githubUsers.get(`${username}/following/${this.me}`);
            responseStatus = responseStatus.status;
        } catch (err) {
            responseStatus = err.response.status;
        }
        const res = responseStatus === 204;
        if (res) console.log(`${username} follows you`);
        else console.log(`${username} does NOT follow you`);
        return res;
    };

    doIFollowThem = async (username) => {
        let responseStatus;
        try {
            responseStatus = await this.githubUsers.get(`${this.me}/following/${username}`);
            responseStatus = responseStatus.status;
        } catch (err) {
            responseStatus = err.response.status;
        }
        const res = responseStatus === 204;
        if (res) console.log(`You are following ${username}`);
        else console.log(`You are NOT following ${username}`);
        return res;
    };

    followers = async (page) => {
        const {data} = await this.githubUser.get("/followers", {
            params: {page},
        });
        return data.map((user) => user.login);
    };

    following = async (page) => {
        const {data} = await this.githubUser.get("/following", {
            params: {page},
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
        for (let i = 0; i < this.allFollowing.length; i++)
            if (!this.allFollowers.includes(this.allFollowing[i]))
                await this.unfollow(this.allFollowing[i]);
    };

    followFollowers = async () => {
        for (let i = 0; i < this.allFollowers.length; i++)
            if (!this.allFollowing.includes(this.allFollowers[i]))
                await this.follow(this.allFollowers[i]);
    };

    update = async () => {
        for (let i = 0; i < this.allFollowing.length; i++)
            if (!this.allFollowers.includes(this.allFollowing[i]))
                await this.unfollow(this.allFollowing[i]);

        for (let i = 0; i < this.allFollowers.length; i++)
            if (!this.allFollowing.includes(this.allFollowers[i]))
                await this.follow(this.allFollowers[i]);
    };
};
