## Follow your followers

This is a tool written in Javascript (Node.js) that automates 
unfollowing all users you follow and following all your followers instead,
using GitHub's API.

⚠ **Following your followers does not work properly.
The function `followAllFollowers()` follows most followers,
but not all of them.**

If you have any idea why this happens,
I would really appreciate your help.

### How to use

Run the following:

```
git clone https://github.com/youssef-attai/gh-follow-followers.git
cd gh-follow-followers
npm install
```

Uncomment the last two lines in `index.js`, then:

```
node index.js
```
