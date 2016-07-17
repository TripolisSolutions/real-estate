## Installing

## prerequisite

NoteJS >= 6.2.x

```bash
npm install
```

## Run development using client and server rendering

```bash
npm run dev
```

## Run production release

Build the projects into the `/build` folder 

```bash
NODE_ENV=production npm run release
```

Run the server (at port 8999)

```bash
NODE_ENV=production npm start
```

 ## TODO
 - [ ] i18n
 - [ ] server build with hash asset name
 - [ ] add react hot (and hot module replacement)
 - [ ] try awesome typescript loader
 - [ ] typescript server side
 - [ ] cut server.js and client.js to a separate tsx file
 - [ ] client logger (log level) because winston demand nodejs
 - [ ] RxJS for search (kill pending request)
 - [x] setMatchMediaConfig
 - [ ] eslint, tslint
 - [ ] chrome audit - cache resources
 - [ ] best practices on deployment <http://expressjs.com/en/advanced/best-practice-performance.html>