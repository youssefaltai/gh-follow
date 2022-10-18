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
touch .env
```
Edit the `.env` file to have the following content:

```
TOKEN=<YOUR_PERSONAL_ACCESS_TOKEN>
```

*Replace <YOUR_PERSONAL_ACCESS_TOKEN> with your acutal personal access token*

Uncomment the last two lines in `index.js`, then run:

```
node index.js
```

⚠  **Running `unfollowAll()` will make you unfollow all the users you are following.**