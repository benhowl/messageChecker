describe('element by position / jms - equals value check', function () {

  var actualMsg = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <testRootElement xmlns="http://www.testing.com/integration/event">
    <checkJustTheValue>hello</checkJustTheValue>
    <emptyElement></emptyElement>
  </testRootElement>`;

  it('should report a mismatch where an element\'s actual value does not match the expected value', function () {
    var expectedMessage = [
      {parentPath: 'testRootElement', element: 'checkJustTheValue', elementPosition: 1, equals: 'helloo'}
    ];

    var result = messageCheckr({
      type: 'jms',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage,
      expectedRootElement: 'testRootElement'
    });

    assert.equal(result.allChecksPassed, false);
    assert.deepEqual(result.checks[2], {
      actual: 'hello',
      expected: 'helloo',
      description: 'Check actual value hello is equal to helloo',
      pass: false,
      path: 'testRootElement.checkJustTheValue (element position: 1)'
    });
  });

  it('should report a mismatch where an element\'s actual value does not match the expected value (actual value is blank)', function () {
    var expectedMessage = [
      {parentPath: 'testRootElement', element: 'emptyElement', elementPosition: 2, equals: 'something'}
    ];

    var result = messageCheckr({
      type: 'jms',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage,
      expectedRootElement: 'testRootElement'
    });

    assert.equal(result.allChecksPassed, false);
    assert.deepEqual(result.checks[2], {
      actual: '',
      expected: 'something',
      description: 'Check actual value  is equal to something',
      pass: false,
      path: 'testRootElement.emptyElement (element position: 2)'
    });
  });

  it('should report a match where an attribute\'s actual value matches the expected value', function () {
    var expectedMessage = [
      {parentPath: 'testRootElement', element: 'checkJustTheValue', elementPosition: 1, equals: 'hello'}
    ];

    var result = messageCheckr({
      type: 'jms',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage,
      expectedRootElement: 'testRootElement'
    });

    assert.equal(result.allChecksPassed, true);
    assert.deepEqual(result.checks[2], {
      actual: 'hello',
      expected: 'hello',
      description: 'Check actual value hello is equal to hello',
      pass: true,
      path: 'testRootElement.checkJustTheValue (element position: 1)'
    });
  });

  it('should report a match where an attribute\'s actual value matches the expected value (actual value is blank)', function () {
    var expectedMessage = [
      {parentPath: 'testRootElement', element: 'emptyElement', elementPosition: 2, equals: ''}
    ];

    var result = messageCheckr({
      type: 'jms',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage,
      expectedRootElement: 'testRootElement'
    });

    assert.equal(result.allChecksPassed, true);
    assert.deepEqual(result.checks[2], {
      actual: '',
      expected: '',
      description: 'Check actual value  is equal to ',
      pass: true,
      path: 'testRootElement.emptyElement (element position: 2)'
    });
  });
});