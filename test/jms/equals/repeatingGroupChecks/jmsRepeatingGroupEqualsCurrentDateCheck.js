var moment = require('moment');

describe('jms - repeating group current date check', function() {
  var currentDateTimeLocal, currentDateTimeUtc;
  currentDateTimeLocal = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  currentDateTimeUtc = moment().utc().format('DD-MM-YYYYTHH:mm:ss.SSSZ');

  var actualMsg = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <testRootElement xmlns="http://www.testing.com/integration/event">
    <thingContainingRepeatingGroups>
        <RepeatingGroup>
            <fieldOneOfRepeatingGroup>`+currentDateTimeLocal+`</fieldOneOfRepeatingGroup>
        </RepeatingGroup>
        <RepeatingGroup>
            <fieldOneOfRepeatingGroup>`+currentDateTimeUtc+`</fieldOneOfRepeatingGroup>
        </RepeatingGroup>
    </thingContainingRepeatingGroups>
  </testRootElement>`;

  it('should report a musmatch where the actual repeating group element value does not match the expected value', function() {
    var currentLocalDateRegexPattern = /local-timezoneT\d\d:\d\d:\d\d\.\d\d\d\+\d\d:\d\d/;
    var currentUtcDateRegexPattern  = /utc-timezoneT\d\d:\d\d:\d\d\.\d\d\d\+\d\d:\d\d/;
    var currentLocalDate = moment().format('YYYY MM DD');
    var currentUtcDate = moment().format('DD MM YYYY');

    var expectedMessage = [
      {repeatingGroup: {path: 'thingContainingRepeatingGroups', repeater: 'RepeatingGroup', number: 1}, path: 'fieldOneOfRepeatingGroup', equals: currentLocalDateRegexPattern, dateFormat: 'YYYY MM DD'},
      {repeatingGroup: {path: 'thingContainingRepeatingGroups', repeater: 'RepeatingGroup', number: 2}, path: 'fieldOneOfRepeatingGroup', equals: currentUtcDateRegexPattern, dateFormat: 'DD MM YYYY'},
    ];

    var result = messageCheckr({
      type: 'jms',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage,
      expectedRootElement: 'testRootElement'
    });

    assert.equal(result.allChecksPassed, false);
    assert.deepEqual(result.checks[2], {
      actual: currentDateTimeLocal,
      description: "Check actual value " + currentDateTimeLocal + " matches date/regex pattern " + currentLocalDateRegexPattern.toString().replace('local-timezone', currentLocalDate),
      expected: currentLocalDateRegexPattern + ' where local-timezone has the date format YYYY MM DD',
      pass: false,
      path: 'thingContainingRepeatingGroups.RepeatingGroup.fieldOneOfRepeatingGroup number: 1'
    });

    assert.deepEqual(result.checks[4], {
      actual: currentDateTimeUtc,
      description: "Check actual value " + currentDateTimeUtc + " matches date/regex pattern " + currentUtcDateRegexPattern.toString().replace('utc-timezone', currentUtcDate),
      expected: currentUtcDateRegexPattern + ' where utc-timezone has the date format DD MM YYYY',
      pass: false,
      path: 'thingContainingRepeatingGroups.RepeatingGroup.fieldOneOfRepeatingGroup number: 2'
    });
  });

  it('should report a match where the actual repeating group element value does match the expected value', function() {
    var currentLocalDateRegexPattern = /local-timezoneT\d\d:\d\d:\d\d\.\d\d\d\+\d\d:\d\d/;
    var currentUtcDateRegexPattern  = /utc-timezoneT\d\d:\d\d:\d\d\.\d\d\d\+\d\d:\d\d/;
    var currentLocalDate = moment().format('YYYY-MM-DD');
    var currentUtcDate = moment().format('DD-MM-YYYY');

    var expectedMessage = [
      {repeatingGroup: {path: 'thingContainingRepeatingGroups', repeater: 'RepeatingGroup', number: 1}, path: 'fieldOneOfRepeatingGroup', equals: currentLocalDateRegexPattern, dateFormat: 'YYYY-MM-DD'},
      {repeatingGroup: {path: 'thingContainingRepeatingGroups', repeater: 'RepeatingGroup', number: 2}, path: 'fieldOneOfRepeatingGroup', equals: currentUtcDateRegexPattern, dateFormat: 'DD-MM-YYYY'},
    ];

    var result = messageCheckr({
      type: 'jms',
      actualMsg: actualMsg,
      expectedMsg: expectedMessage,
      expectedRootElement: 'testRootElement'
    });

    assert.equal(result.allChecksPassed, true);
    assert.deepEqual(result.checks[2], {
      actual: currentDateTimeLocal,
      description: "Check actual value " + currentDateTimeLocal + " matches date/regex pattern " + currentLocalDateRegexPattern.toString().replace('local-timezone', currentLocalDate),
      expected: currentLocalDateRegexPattern + ' where local-timezone has the date format YYYY-MM-DD',
      pass: true,
      path: 'thingContainingRepeatingGroups.RepeatingGroup.fieldOneOfRepeatingGroup number: 1'
    });

    assert.deepEqual(result.checks[4], {
      actual: currentDateTimeUtc,
      description: "Check actual value " + currentDateTimeUtc + " matches date/regex pattern " + currentUtcDateRegexPattern.toString().replace('utc-timezone', currentUtcDate),
      expected: currentUtcDateRegexPattern + ' where utc-timezone has the date format DD-MM-YYYY',
      pass: true,
      path: 'thingContainingRepeatingGroups.RepeatingGroup.fieldOneOfRepeatingGroup number: 2'
    });
  });
});