const mongoose = require('mongoose');
const config = require('../config/db.config');

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

/*
// initialize roles
const initial = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'user'
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: 'admin'
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
};


mongoose
  .connect(`mongodb://${config.HOST}:${config.PORT}/${config.DB}`, connectionOptions)
  .then(() => {
    console.log('Successfully connect to MongoDB.');
    // initial();
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });
mongoose.Promise = global.Promise;

module.exports = {
  User: require('../users/user.model')
};

*/
