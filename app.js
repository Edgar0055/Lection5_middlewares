const http = require('http');
const App = require('./lib/App');
const app = new App();
const server = http.createServer((req, res) => app.handle(req, res));

app.use((req, res, next) => {
  console.log('middleware 1 start');
  req.test = 'hello from middleware 1';
  next();
  console.log('middleware 1 end');
});

app.use((req, res, next) => {
  console.log('middleware 2');
  console.log(req.test);
  next();
});

app.use((req, res, next) => {
  console.log('middleware 3');
  res.end('Hello');
});

server.listen(3000);