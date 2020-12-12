### Netlify Deployment

Although our Git repo is part of the Chingu organization, Netlify still provided us with a means for deployment through the UI, whereas with Heroku we must use a CLI in order to push.

#### Netlify Deployment Steps

These deploy steps with Netlify require you to have the project pushed to your own Github repository.

1. First created an account or login on [Netlify](https://www.netlify.com/), go to your Team Overview page and click "New site from Git".

![Step 1](https://imgur.com/tl3ekP0)

2. On the next page, you should be greeted with "Create a new site". Under the section, "Continuous Deployment", select "Github".

![Step 2](https://imgur.com/5R6AK6G)

3. This should then prompt you to login on Github if you are not already. This is also where Netlify may ask for permissions to gain access to your repositories.

![Step 3](https://imgur.com/rSRsRoD)

4. Deploy Settings. Based on the image below, let's walk through the sections 1-4.

   1. Select the branch on the Github repo that you want Netlify to deploy. Keep in mind each time you push to this branch, it will trigger a build on Netlify. For openShelf, we went with the "main" branch.

   2. Select the build command that Netlify will run to build your react project. In the case of openShelf, we're building with `npm run build`.

   3. Select the build path. What directory does the build command output its result? For openShare, this will be the `build` directory

   4. Add any required environment variables by clicking on "Show Advanced" and subsequently clicking "New Variable". In our case, to deploy with build warnings, we also need to add a variable `CI` with the value `false`.

![Step 4](https://imgur.com/RI3Sntg)

5. You're almost done! The project will now begin deployment but there's one more thing we need to do.

![Step 5](https://imgur.com/HLLnlZS)

6. As is, the project will not deploy correctly. Since this project is a monorepo, meaning we are pushing both our server and client in one repo, we need to let Netlify know which folder to access in order to build the project!

   First, let's go to the Site Settings.

![Step 6](https://imgur.com/5fA8pBP)

7. Then click on the "Build & deploy" Tab on the lefthand side, followed by "Edit Settings".

![Step 7](https://imgur.com/bklIUCj)

8. Here you are able to specify the base directory you would like to deploy. In our case, we're deploying the `client` directory. After this step, we need to go back and rerun the deploy!

![Step 8](https://imgur.com/y6T4fAK)

9. Now let's go back to the "Deploys" tab in the top left. On this page, we can manually deploy by clicking the drop-down "Trigger Deploy". Just to be safe, let's use the "clear cache and deploy site".

![Step 9](https://imgur.com/9r6RVNP)

Voila! Once the deploy is done building, you'll have a newly deployed site in production on Netlify.

[Back to README](/README.md)
