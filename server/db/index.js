const User = require('./models/User.js');
const db = require('./db.js');

const syncAndSeed = () => db
  .sync({ force: true })
  .then(async() => {
    // TODO: Seed...

  const users = [
    { name: 'moe' },
    { name: 'larry' },
    { name: 'lucy' },
    { name: 'ethyl' }
  ];
  await Promise.all(
    users.map(user =>
      User.create({
        name: user.name,
        password: user.name.toUpperCase()
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
    User,
  },
  db,
  syncAndSeed,
};
