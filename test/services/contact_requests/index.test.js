'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('contact_requests service', function() {
  it('registered the contact_requests service', () => {
    assert.ok(app.service('contact_requests'));
  });
});
