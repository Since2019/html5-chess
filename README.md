# html5-chess


### Instruction

The command for installing dependencies:
```sh
npm install
```

The command for running the App on localhost:
```sh
npm run start:dev
```
Compile to whole project by:
```sh
npm run build
```
Now we adopt webpack, no need to compile the whole project instead when we are working on frontend the webpack can
take care of compilation for us. Never invoke tsc directly and don't commit the compiled js file.

The compiled bundle.js should located in "frontend/", and we only refer to that script in our html
### Project Overwiew

This is a Chinese Chess game project built primarily based on ts/js and html5. Currently only a server is set up.

### Next step

Basic logic of chess board and chess
