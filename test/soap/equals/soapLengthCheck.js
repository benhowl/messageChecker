describe('soap - length check', function() {

  var actualMsg =
    `<soap-env:Envelope xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/">
      <soap-env:Header/>
      <soap-env:Body>
          <elementToCheckLengthOf>thisIs22CharactersLong</elementToCheckLengthOf>
      </soap-env:Body>
    </soap-env:Envelope>`;

  it('should report a match where an element\'s actual length does match the expected length', function () {
    var expectedMessage = [
      {path: 'SOAP-ENV:Body.elementToCheckLengthOf', equals: '{length(22)}'}
    ];

    var result = messageCheckr({
      type: 'soap',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage
    });

    assert.equal(result.allChecksPassed, true);
    assert.deepEqual(result.checks[2], {
      description: 'Check actual value thisIs22CharactersLong has a length equal to 22',
      passedCheck: true
    });
  });

  it('should report a match where an element\'s actual length is less than the given (< expected length)', function () {
    var expectedMessage = [
      {path: 'SOAP-ENV:Body.elementToCheckLengthOf', equals: '{length(<23)}'}
    ];

    var result = messageCheckr({
      type: 'soap',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage
    });

    assert.equal(result.allChecksPassed, true);
    assert.deepEqual(result.checks[2], {
      description: 'Check actual value thisIs22CharactersLong has a length less than 23',
      passedCheck: true
    });
  });


  it('should report a match where an element\'s actual length is greater than the given (> expected length)', function () {
    var expectedMessage = [
      {path: 'SOAP-ENV:Body.elementToCheckLengthOf', equals: '{length(>21)}'}
    ];

    var result = messageCheckr({
      type: 'soap',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage
    });

    assert.equal(result.allChecksPassed, true);
    assert.deepEqual(result.checks[2], {
      description: 'Check actual value thisIs22CharactersLong has a length greater than 21',
      passedCheck: true
    });
  });
});