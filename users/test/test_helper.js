// import mongoose
const mongoose = require('mongoose');

// global.Promise is a reference to es6
// promises inside nodejs
// this makes mongoose use es6 promises
// rather than default mongoose promise library
// mongoose.Promise = global.Promise;

// hook executed one time before running tests
// not beforeEach test is run like the beforeEach
// hook down below
before((done) => {
  // connect to specified database
  mongoose.connect('mongodb://localhost/users_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  // once/on event handlers
  // verify connection was successful
  // if not, console log warning and error
  mongoose.connection
    .once('open', () => {
      // allows time to connect to mongoose before
      done();
    })
    .on('error', (error) => console.warn('Warning', error));
});

// hook to clear testing db
beforeEach((done) => {
  // drop accepts a callback function that runs
  // once it's done dropping collection of users
  mongoose.connection.collections.users.drop(() => {
    // This only executes after users collection is dropped
    // Ready to run the next test!
    done();
  });
});
