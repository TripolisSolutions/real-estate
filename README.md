## Installing

```bash
npm install
```

## Run development using client and server rendering

```bash
npm run dev
```

 - build webpack/server
 - run build/server
 - browsersync builds webpack/client
 - client hot module replacement

## Run production release

```bash
NODE_ENV=production node build/server.js
```

 - NODE_ENV=production
 - build webpack/server
 - build webpack/client

 ## TODO
 - [x] bootstrap
 - [x] integrate featherjs
 - [ ] i18n
 - [ ] server build with hash asset name
 - [ ] production serve compressed assets
 - [ ] add react hot (and hot module replacement)
 - [ ] try awesome typescript loader
 - [ ] typescript server side
 - [ ] cut server.js and client.js to a separate tsx file
 - [ ] client logger (log level) because winston demand nodejs
 - [ ] RxJS for search (kill pending request)
 - [x] setMatchMediaConfig
