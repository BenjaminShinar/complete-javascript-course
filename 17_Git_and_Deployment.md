<!--
//cspell::ignore forkify
 -->

## Git And Deployment

<details>
<summary>
Deploying the project on a live server.
</summary>

deploying uses netlify, learning the foundations of git, and using github pages.

### Simple Deployment with Netlify

<details>
<summary>
Manually deploying (I WON'T DO THIS NOW)
</summary>

before we can deploy the project, we need to build it to a release state, lets delete the .dist and the cache folders,we can also specify where the code will be built to inside the package.json scripts.
we also need to change the 'main' to 'default'

```json
   //"default": "index.html",
  "scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html --dist-dir ./dist"
  },
```

we are now ready to build

```build
npm run build
```

we can see that the code is now compressed. we are ready to deploy on [Netlify](https://www.netlify.com/).\
We could also use [Surge](https://surge.sh/)\
netlify provides free hosting for static pages (html,css, JavaScript, no database or server side code).

to deploy, we simply drag and drop the distribution folder. we can change the site name.

netlify has a number of features like securing the page with https protocol. all of our site content was also deployed, and is spread out on many server (sharding for speed).

</details>

### Git Version Control

<details>
<summary>
Git and github repositories.
</summary>

the '.gitignore' file.

using git in the command line

git commands:

- add -A : add all files to the staging area
- commit -m "msg": add a commit (a snapshot of the code) to the repository
- log - see log
- status - see status
- reset (--hard) #sha - ???
- branch - see branches
- branch -v - see branches verbose
- branch "new branch name" - create branch
- checkout "branch-name" - move to branch
- merge "branch-name" - merge from that branch to current.
- remote add "origin-remote name" "url" - add remote origin
- remote -v - see remote repositories
- push "remote name" "branch name" - push local repo to the remote

the README.md file.

</details>

### Setting up Continues Integration with Netlify

<details>
<summary>
Integrating Netlify with github.
</summary>

Back to the netlify dashboard.

Link site to git (or new site from git).\

continuos integration/continues deployment means that when we change the git source, netlify redeploys the website with the changes we've made. we can set the branch (in this case, we need a master and feature branch).

but now, the code that we deploy is in the dist folder, which isn't on git (it's git-ignored). we can telly Netlify to run a build command and set the publish directory.

</details>
</details>
