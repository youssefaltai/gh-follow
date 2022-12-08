import { GHFollow } from "./GHFollow.js";

const ghf = new GHFollow("youssef-attai");

await ghf.unfollowNonFollowers();
await ghf.followFollowers();
