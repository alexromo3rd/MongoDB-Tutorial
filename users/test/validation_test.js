const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('requires a name', () => {
    const user = new User({ name: undefined });
    // similar to validate except it is synchronous
    // validate requires a callback function to run
    // asynchronous code
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name is required.');
  });

  it('requires a name longer than two characters', () => {
    const user = new User({ name: 'Al' });
    // similar to validate except it is synchronous
    // validate requires a callback function to run
    // asynchronous code
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name must be longer than two characters.');
  });

  it('disallows invalid records from being save', (done) => {
    const user = new User({ name: 'Al' });
    user.save().catch((validationResult) => {
      const { message } = validationResult.errors.name;
      assert(message === 'Name must be longer than two characters.');
      done();
    });
  });
});
