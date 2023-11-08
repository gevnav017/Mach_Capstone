# Boilerplate for a React Express App with JavaScript

This repo is based on this blogpost: https://medium.com/@freddiembergener/how-to-build-a-react-express-app-with-typescript-ec300a97afd4

And the associated repository: https://github.com/f-bergener/typescript-react-express-app

However, this version uses JavaScript instead of TypeScript.

In addition, this project includes:
* jest setup
* Prisma client mocked

## Start the App

In development:
```
npm run start:dev
```

For production:
```
npm run start
```

## Test the App
```
npm run test
```

## Prepare a Build for Deployment
```
npm run build
```

Output of the build is a `bundle.js` file which is added in the `public` folder - the folder is checked into the repo, but the `bundle.js` is not, it must be generated with the build.