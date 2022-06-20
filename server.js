/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();
app.use('/', serveStatic(path.join(__dirname, '/dist')));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://home-project-ui.herokuapp.com/');

  // res.header('Access-Control-Allow-Origin', 'https://home-project-ui.herokuapp.com/');
  res.header('Access-Control-Allow-Credentials', true);

  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,Authorization'
  );
  next();
});
app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log('server started' + port);
