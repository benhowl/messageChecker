describe('jms - attribute length check', function () {
  var actualMsg = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <testRootElement xmlns="http://www.testing.com/integration/event"></testRootElement>`;

  it('should report a mismatch where an attribute\'s actual length does not match the expected length', function () {
    var expectedMessage = [
      {path: 'testRootElement', attribute: 'xmlns', equals: '{length(41)}'}
    ];

    var result = messageCheckr({
      type: 'jms',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage,
      expectedRootElement: 'testRootElement'
    });

    assert.equal(result.allChecksPassed, false);
    assert.deepEqual(result.checks[2], {
      description: 'Check actual value http://www.testing.com/integration/event has a length equal to 41',
      passedCheck: false
    });
  });

  it('should report a match where an attribute\'s actual length does match the expected length', function () {
    var expectedMessage = [
      {path: 'testRootElement', attribute: 'xmlns', equals: '{length(40)}'}
    ];

    var result = messageCheckr({
      type: 'jms',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage,
      expectedRootElement: 'testRootElement'
    });

    assert.equal(result.allChecksPassed, true);
    assert.deepEqual(result.checks[2], {
      description: 'Check actual value http://www.testing.com/integration/event has a length equal to 40',
      passedCheck: true
    });
  });

  it('should report a mismatch where an attribute\'s actual length is not less than the given < expected length', function () {
    var expectedMessage = [
      {path: 'testRootElement', attribute: 'xmlns', equals: '{length(<40)}'}
    ];

    var result = messageCheckr({
      type: 'jms',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage,
      expectedRootElement: 'testRootElement'
    });

    assert.equal(result.allChecksPassed, false);
    assert.deepEqual(result.checks[2], {
      description: 'Check actual value http://www.testing.com/integration/event has a length less than 40',
      passedCheck: false
    });
  });

  it('should report a match where an attribute\'s actual length is less than the given (< expected length)', function () {
    var expectedMessage = [
      {path: 'testRootElement', attribute: 'xmlns', equals: '{length(<41)}'}
    ];

    var result = messageCheckr({
      type: 'jms',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage,
      expectedRootElement: 'testRootElement'
    });

    assert.equal(result.allChecksPassed, true);
    assert.deepEqual(result.checks[2], {
      description: 'Check actual value http://www.testing.com/integration/event has a length less than 41',
      passedCheck: true
    });
  });

  it('should report a mismatch where an attribute\'s actual length is not greater than the given > expected length', function () {
    var expectedMessage = [
      {path: 'testRootElement', attribute: 'xmlns', equals: '{length(>40)}'}
    ];

    var result = messageCheckr({
      type: 'jms',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage,
      expectedRootElement: 'testRootElement'
    });

    assert.equal(result.allChecksPassed, false);
    assert.deepEqual(result.checks[2], {
      description: 'Check actual value http://www.testing.com/integration/event has a length greater than 40',
      passedCheck: false
    });
  });

  it('should report a match where an attribute\'s actual length is greater than the given (> expected length)', function () {
    var expectedMessage = [
      {path: 'testRootElement', attribute: 'xmlns', equals: '{length(>39)}'}
    ];

    var result = messageCheckr({
      type: 'jms',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage,
      expectedRootElement: 'testRootElement'
    });

    assert.equal(result.allChecksPassed, true);
    assert.deepEqual(result.checks[2], {
      description: 'Check actual value http://www.testing.com/integration/event has a length greater than 39',
      passedCheck: true
    });
  });
});