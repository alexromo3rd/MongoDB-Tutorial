const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', postCount: 0 });
    joe.save().then(() => done());
  });

  // helper function
  function assertName(operation, done) {
    operation.then(() => {
      User.find({}).then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
    });
  }

  // Model instance
  // 'set' and 'save'
  // update
  it('instance type using set and save', (done) => {
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
  });

  // Model instance update has been deprecated
  // use updateOne, updateMany, or bulkwrite
  it('A model instance can updateOne', (done) => {
    assertName(joe.updateOne({ name: 'Alex' }), done);
  });

  // Model class
  // update
  // findOneAndUpdate
  // findByIdAndUpdate

  // Model class update has been deprecated
  // use updateOne, updateMany, or bulkwrite
  // it('A model class can update', (done) => {
  //   assertName(User.update({ name: 'Joe' }, { name: 'Alex' }), done);
  // });

  it('A model class can updateMany', (done) => {
    assertName(User.updateMany({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('A model class can update one record', (done) => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('A model class can find a record with an ID and update', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }), done);
  });

  // update operators - $inc to increment
  // all users posts by one
  it('A user can have their post count incremented by one', (done) => {
    User.updateMany({}, { $inc: { postCount: 1 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.postCount === 1);
        done();
      });
  });
});
