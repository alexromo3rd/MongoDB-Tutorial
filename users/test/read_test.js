const assert = require('assert');
const User = require('../src/user');

describe('Reading users from database', () => {
  let joe;

  beforeEach((done) => {
    // did not use let or const as it will make
    // joe block scoped and we want to use the variable
    // down below
    joe = new User({ name: 'Joe' });
    joe.save().then(() => done());
  });

  it('Finds all users with a name of joe', (done) => {
    // find returns an array of users that meet
    // the provided search criteria
    User.find({ name: 'Joe' }).then((users) => {
      // must convert both _id's to strings
      // otherwise they won't strictly equal
      // each other even though they do in
      // fact have the same object id
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });

  it('Finds a single user with a particular id', (done) => {
    // findOne method returns a single record
    // based on the provided search criteria
    User.findOne({ _id: joe._id }).then((user) => {
      assert(user.name === 'Joe');
      done();
    });
  });
});
