const User = require('./models/User.js');
const db = require('./db.js');

const syncAndSeed = () =>
  db
    .sync({ force: true })
    .then(async () => {
      // TODO: Seed...

      const users = [
        { username: 'moe' },
        { username: 'larry' },
        { username: 'lucy' },
        { username: 'ethyl' }
      ];
      await Promise.all(
        users.map(user =>
          User.create({
            username: user.username,
            password: user.username.toUpperCase()
          })
        )
      );
      return true;
    })
    .catch(e => {
      console.error(e);
    });

module.exports = {
  models: {
    User
  },
  db,
  syncAndSeed
};
