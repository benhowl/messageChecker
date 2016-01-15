describe('jms - contains string check', function () {

  var actualMsg = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <testRootElement xmlns="http://www.testing.com/integration/event">
        <containsElement>noisehellonoise</containsElement>
      </testRootElement>`;

  it('should report a mismatch where an element\'s actual value does not contain the expected value', function () {
    var expectedMessage = [
      {path: 'containsElement', contains: 'yello'}
    ];

    var result = messageCheckr({
      type: 'jms',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage,
      expectedRootElement: 'testRootElement'
    });

    assert.equal(result.allChecksPassed, false);
    assert.deepEqual(result.checks[2], {
      actual: 'noisehellonoise',
      description: 'Check actual value noisehellonoise contains yello',
      expected: 'contains: yello',
      pass: false,
      path: 'containsElement'
    });
  });

  it('should report a match where the expected value is contained within the element\'s actual value', function () {
    var expectedMessage = [
      {path: 'containsElement', contains: 'hello'}
    ];

    var result = messageCheckr({
      type: 'jms',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage,
      expectedRootElement: 'testRootElement'
    });

    assert.equal(result.allChecksPassed, true);
    assert.deepEqual(result.checks[2], {
      actual: 'noisehellonoise',
      description: 'Check actual value noisehellonoise contains hello',
      expected: 'contains: hello',
      pass: true,
      path: 'containsElement'
    });
  });

  it('should report a match where the expected value is equal to the element\'s actual value', function () {
    var expectedMessage = [
      {path: 'containsElement', contains: 'noisehellonoise'}
    ];

    var result = messageCheckr({
      type: 'jms',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage,
      expectedRootElement: 'testRootElement'
    });

    assert.equal(result.allChecksPassed, true);
    assert.deepEqual(result.checks[2], {
      actual: 'noisehellonoise',
      description: 'Check actual value noisehellonoise contains noisehellonoise',
      expected: 'contains: noisehellonoise',
      pass: true,
      path: 'containsElement'
    });
  });
});