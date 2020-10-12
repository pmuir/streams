### streams

Provides frontend for table of Kafka streams. Has an action item to load `jupyter/notebook` in a drawer.
Part of UMS's 2nd POC.

http://streams-ums-poc.apps.uxd.n2z6.p1.openshiftapps.com/

#### Developing
```sh
yarn install
```

```sh
yarn develop`
```

#### Building
Change package.json to `"port": 8080` and add webpack url suffix for cluster you're deploying to.

```sh
yarn nodeshift-deploy
```

We've setup the project to work with NPM so it can be built + served using s2i.
