// import assertion library
const assert = require('assert');
// import User model
const User = require('../src/user');

describe('Creating records', () => {
  it('saves a user', (done) => {
    // create new instance of User
    const joe = new User({ name: 'Joe' });
    // save newly created user
    joe.save().then(() => {
      // has user been saved successfully?
      assert(!joe.isNew);
      done();
    });
  });
});
