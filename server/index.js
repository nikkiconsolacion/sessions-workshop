const path = require('path');
const express = require('express');
const chalk = require('chalk');
const { syncAndSeed, models } = require('./db/index.js');
const User = require('./db/models/User.js');
const expressSession = require('express-session');

const PORT = 3000;

// DONT WORRY ABOUT THIS, ITS TO HELP YA!
// Due to recent bug in nodemon, this will make sure it restarts without errors.
// If you see red text saying the port is already being used...
// lsof -i :3000
// kill ${the pid you see from the last command}
process.on('uncaughtException', e => {
  console.log(chalk.red(e.message));
  process.exit(0);
});

const app = express();

const STATIC_DIR = path.join(__dirname, '../static');

app.use(express.json());
app.use(express.static(STATIC_DIR));

app.use(
  expressSession({
    saveUninitialized: true,
    resave: false,
    secret: 'Skadoosh'
  })
);

// simple logging middleware to view each request in your terminal - this is useful for debugging purposes
app.use((req, res, next) => {
  console.log(`Request to ${req.path} - Body: `, req.body);
  next();
});

app.post('/api/login', (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({
    where: {
      username: username,
      password: password
    }
  })
    .then(user => {
      if (!user) {
        throw new Error({ status: 401, message: 'Log in failed' });
      } else {
        req.session.user = user;
        res.status(200).send(user);
      }
    })
    .catch(err => next(err));
});

app.get('/user', (req, res, next) => {
  if (req.session.user) {
    next();
  }
  res.redirect('/');
});

app.get('/api/logout', (req, res, next) => {
  // TODO: Build this functionality.  -Delete Cookie/Session
  next();
});

app.get('/api/session', (req, res, next) => {
  // TODO: Build this functionality.
  res.send({
    data: req.session
  });
});

app.get('*', (req, res) => res.sendFile(path.join(STATIC_DIR, './index.html')));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message);
});

syncAndSeed().then(() => {
  app.listen(PORT, () => {
    console.log(
      chalk.greenBright(`App now listening on http://localhost:${PORT}`)
    );
  });
});
