const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save().then(() => done());
  });

  // Model instance
  // remove

  it('model instance remove', (done) => {
    // remove and then call findOne to
    // verify that the remove was successful
    joe
      .remove()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  // Model class
  // remove -> deleteMany
  // findOneAndRemove
  // findByIdAndRemove

  // it('class method remove', (done) => {
  //   // Remove a bunch of records with a given criteria
  //   User.remove({ name: 'Joe' })
  //     .then(() => User.findOne({ name: 'Joe' }))
  //     .then((user) => {
  //       assert(user === null);
  //       done();
  //     });
  // });

  it('class method deleteMany', (done) => {
    // works just like remove and is
    // the preferred method
    User.deleteMany({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findOneAndRemove', (done) => {
    User.findOneAndRemove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});
