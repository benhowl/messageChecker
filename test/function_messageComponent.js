var rewire = require('rewire'),
  messageComponent = rewire('../libs/messageComponent.js'),
  messageComponentType = require('../libs/messageComponentType'),
  xmldoc = require('xmldoc');


describe('messageComponent()', function () {

  describe('validate()', function () {

    var validate = messageComponent.__get__('validate');

    it('should throw an error when the parameter "expectedMessageComponent" is null', function () {
      assert.throw(() => validate(null), 'The following expectedMessageComponent is not valid: null');
    });

    it('should throw an error when the parameter "expectedMessageComponent" is an Array', function () {
      assert.throw(() => {
        validate(['test'])
      }, 'The following expectedMessageComponent is not valid: ["test"]');
    });

    it('should throw an error when the parameter "expectedMessageComponent" is an String', function () {
      assert.throw(() => {
        validate(new String('test'))
      }, 'The following expectedMessageComponent is not valid: "test"');
    });

    it('should throw an error when the parameter "expectedMessageComponent" is an Boolean', function () {
      assert.throw(() => {
        validate(true)
      }, 'The following expectedMessageComponent is not valid: true');
    });

    it('should throw an error when the parameter "expectedMessageComponent" is an Integer', function () {
      assert.throw(() => {
        validate(1)
      }, 'The following expectedMessageComponent is not valid: 1');
    });

    it('should throw an error when the parameter "expectedMessageComponent" is an Object with no keys', function () {
      assert.throw(() => {
        validate({})
      }, 'The following expectedMessageComponent is not valid: {}');
    });

    // STANDARD

    it('should return {type: messageComponentType.STANDARD, expected: {equals: "b"}} when "expectedMessageComponent" is {path: "a", equals: "b"}', function () {
      assert.deepEqual(validate({path: "a", equals: "b"}), {type: messageComponentType.STANDARD, expected: {equals: "b"}});
    });

    it('should return {type: messageComponentType.STANDARD, expected: {equals: "b", dateFormat: "c"}} when "expectedMessageComponent" is {path: "a", equals: "b", dateFormat: "c"}', function () {
      assert.deepEqual(validate({path: "a", equals: "b", dateFormat: "c"}), {type: messageComponentType.STANDARD, expected: {equals: "b", dateFormat: "c"}});
    });

    it('should return {type: messageComponentType.STANDARD, expected: {contains: "b"}} when "expectedMessageComponent" is {path: "a", contains: "b"}', function () {
      assert.deepEqual(validate({path: "a", contains: "b"}), {type: messageComponentType.STANDARD, expected: {contains: "b"}});
    });

    it('should return {type: messageComponentType.STANDARD, expected: {attribute: "b", equals: "c"}} when "expectedMessageComponent" is {path: "a", attribute: "b", equals: "c"}', function () {
      assert.deepEqual(validate({path: "a", attribute: "b", equals: "c"}), {type: messageComponentType.STANDARD, expected: {attribute: "b", equals: "c"}});
    });

    it('should return {type: messageComponentType.STANDARD, expected: {attribute: "b", equals: "c", dateFormat: "d"}} when "expectedMessageComponent" is {path: "a", attribute: "b", equals: "c", dateFormat: "d"}', function () {
      assert.deepEqual(validate({path: "a", attribute: "b", equals: "c", dateFormat: "d"}), {type: messageComponentType.STANDARD, expected: {attribute: "b", equals: "c", dateFormat: "d"}});
    });

    it('should return {type: messageComponentType.STANDARD, expected: {attribute: "b", contains: "c"}} when "expectedMessageComponent" is {path: "a", attribute: "b", contains: "c"}', function () {
      assert.deepEqual(validate({path: "a", attribute: "b", contains: "c"}), {type: messageComponentType.STANDARD, expected: {attribute: "b", contains: "c"}});
    });

    it('should return {type: messageComponentType.STANDARD, expected: {pathShouldNotExist: "b"}} when "expectedMessageComponent" is {path: "a", pathShouldNotExist: "b"}', function () {
      assert.deepEqual(validate({path: "a", pathShouldNotExist: "b"}), {type: messageComponentType.STANDARD, expected: {pathShouldNotExist: "b"}});
    });

    // REPEATING_GROUP

    it('should return {type: messageComponentType.REPEATING_GROUP, expected: {equals: "e"}} when "expectedMessageComponent" is {repeatingGroup: {path: "a", repeater: "b", number: "c"},  path: "d", equals: "e"}', function () {
      assert.deepEqual(validate({repeatingGroup: {path: "a", repeater: "b", number: "c"}, path: "d", equals: "e"}), {type: messageComponentType.REPEATING_GROUP, expected: {equals: "e"}});
    });

    it('should return {type: messageComponentType.REPEATING_GROUP, expected: {equals: "e", dateFormat: "f"}} when "expectedMessageComponent" is {repeatingGroup: {path: "a", repeater: "b", number: "c"},  path: "d", equals: "e", dateFormat: "f"}', function () {
      assert.deepEqual(validate({repeatingGroup: {path: "a", repeater: "b", number: "c"}, path: "d", equals: "e", dateFormat: "f"}), {type: messageComponentType.REPEATING_GROUP, expected: {equals: "e", dateFormat: "f"}});
    });

    it('should return {type: messageComponentType.REPEATING_GROUP, expected: {attribute: "e", equals: "f"}} when "expectedMessageComponent" is {repeatingGroup: {path: "a", repeater: "b", number: "c"},  path: "d", attribute: "e", equals: "f"}', function () {
      assert.deepEqual(validate({repeatingGroup: {path: "a", repeater: "b", number: "c"}, path: "d", attribute: "e", equals: "f"}), {type: messageComponentType.REPEATING_GROUP, expected: {attribute: "e", equals: "f"}});
    });

    it('should return {type: messageComponentType.REPEATING_GROUP, expected: {attribute: "e", equals: "f", dateFormat: "g"}} when "expectedMessageComponent" is {repeatingGroup: {path: "a", repeater: "b", number: "c"},  path: "d", attribute: "e", equals: "f", dateFormat: "g"}', function () {
      assert.deepEqual(validate({repeatingGroup: {path: "a", repeater: "b", number: "c"}, path: "d", attribute: "e", equals: "f", dateFormat: "g"}), {type: messageComponentType.REPEATING_GROUP, expected: {attribute: "e", equals: "f", dateFormat: "g"}});
    });

    it('should return {type: messageComponentType.REPEATING_GROUP, expected: {attribute: "e", contains: "f"}} when "expectedMessageComponent" is {repeatingGroup: {path: "a", repeater: "b", number: "c"},  path: "d", attribute: "e", contains: "f"}', function () {
      assert.deepEqual(validate({repeatingGroup: {path: "a", repeater: "b", number: "c"}, path: "d", attribute: "e", contains: "f"}), {type: messageComponentType.REPEATING_GROUP, expected: {attribute: "e", contains: "f"}});
    });

    it('should return {type: messageComponentType.REPEATING_GROUP, expected: {contains: "e"}}} when "expectedMessageComponent" is {repeatingGroup: {path: "a", repeater: "b", number: "c"},  path: "d", contains: "e"}', function () {
      assert.deepEqual(validate({repeatingGroup: {path: "a", repeater: "b", number: "c"}, path: "d", contains: "e"}), {type: messageComponentType.REPEATING_GROUP, expected: {contains: "e"}});
    });

    it('should return {type: messageComponentType.REPEATING_GROUP, expected: {pathShouldNotExist: "e"}} when "expectedMessageComponent" is {repeatingGroup: {path: "a", repeater: "b", number: "c"},  path: "d", pathShouldNotExist: "e"}', function () {
      assert.deepEqual(validate({repeatingGroup: {path: "a", repeater: "b", number: "c"}, path: "d", pathShouldNotExist: "e"}), {type: messageComponentType.REPEATING_GROUP, expected: {pathShouldNotExist: "e"}});
    });

    // POSITION

    it('should return {type: messageComponentType.POSITION, expected: {equals: "d"}} when "expectedMessageComponent" is {parentPath: "a", element: "b", elementPosition: "c", equals: "d"}', function () {
      assert.deepEqual(validate({parentPath: "a", element: "b", elementPosition: 1, equals: "d"}), {type: messageComponentType.POSITION, expected: {equals: "d"}});
    });

    it('should return {type: messageComponentType.POSITION, expected: {equals: "d", dateFormat: "e"}} when "expectedMessageComponent" is {parentPath: "a", element: "b", elementPosition: "c", equals: "d", dateFormat: "e"}', function () {
      assert.deepEqual(validate({parentPath: "a", element: "b", elementPosition: 1, equals: "d", dateFormat: "e"}), {type: messageComponentType.POSITION, expected: {equals: "d", dateFormat: "e"}});
    });

    it('should return {type: messageComponentType.POSITION, expected: {contains: "d"}} when "expectedMessageComponent" is {parentPath: "a", element: "b", elementPosition: "c", contains: "d"}', function () {
      assert.deepEqual(validate({parentPath: "a", element: "b", elementPosition: 1, contains: "d"}), {type: messageComponentType.POSITION, expected: {contains: "d"}});
    });

    it('should return {type: messageComponentType.POSITION, expected: {attribute: "d", equals: "e"}} when "expectedMessageComponent" is {parentPath: "a", element: "b", elementPosition: "c", attribute: "d", equals: "e"}', function () {
      assert.deepEqual(validate({parentPath: "a", element: "b", elementPosition: 1, attribute: "d", equals: "e"}), {type: messageComponentType.POSITION, expected: {attribute: "d", equals: "e"}});
    });

    it('should return {type: messageComponentType.POSITION, expected: {attribute: "d", equals: "e", dateFormat: "f"}} when "expectedMessageComponent" is {parentPath: "a", element: "b", elementPosition: "c", attribute: "d", equals: "e", dateFormat: "f"}', function () {
      assert.deepEqual(validate({parentPath: "a", element: "b", elementPosition: 1, attribute: "d", equals: "e", dateFormat: "f"}), {type: messageComponentType.POSITION, expected: {attribute: "d", equals: "e", dateFormat: "f"}});
    });

    it('should return {type: messageComponentType.POSITION, expected: {attribute: "d", contains: "e"}} when "expectedMessageComponent" is {parentPath: "a", element: "b", elementPosition: "c", attribute: "d", contains: "e"}', function () {
      assert.deepEqual(validate({parentPath: "a", element: "b", elementPosition: 1, attribute: "d", contains: "e"}), {type: messageComponentType.POSITION, expected: {attribute: "d", contains: "e"}});
    });

    it('should throw an error when "elementPosition" is NAN', function () {
      assert.throw(() => {
        validate({parentPath: "a", element: "b", elementPosition: "string", attribute: "d", contains: "e"})
      }, 'elementPosition should be an integer');
    });

    it('should throw an error when "elementPosition" is 0', function () {
      assert.throw(() => {
        validate({parentPath: "a", element: "b", elementPosition: 0, attribute: "d", contains: "e"})
      }, 'elementPosition should be greater than 0');
    });

    // PATTERN NOT RECOGNISED

    it('should throw an error when "expectedMessageComponent" does not match any expected pattern', function () {
      assert.throw(() => {
        validate({notExpected: "test"})
      }, 'Expected message component does not match any expected patterns. The invalid component is {"notExpected":"test"}');
    });

    it('should throw an error when "expectedMessageComponent" has parentPath but not match any expected pattern', function () {
      assert.throw(() => {
        validate({parentPath: "test"})
      }, 'Expected message component does not match any expected patterns. The invalid component is {"parentPath":"test"}');
    });

    it('should throw an error when "expectedMessageComponent" has correct {repeatingGroup} but does not match any pattern ', function () {
      assert.throw(() => {
        validate({repeatingGroup: {path: "test", repeater: "test", number: "test"}, equals: "test"})
      }, 'Expected message component does not match any expected patterns. The invalid component is {\"repeatingGroup\":{\"path\":\"test\",\"repeater\":\"test\",\"number\":\"test\"},\"equals\":\"test\"}');
    });

    it('should throw an error when "expectedMessageComponent" has {repeatingGroup} without path attribute', function () {
      assert.throw(() => {
        validate({repeatingGroup: {repeater: "test", number: "test"}, path: "test", equals: "test"})
      }, 'Expected message component does not match any expected patterns. The invalid component is {\"repeatingGroup\":{\"repeater\":\"test\",\"number\":\"test\"},\"path\":\"test\",\"equals\":\"test\"}');
    });

    it('should throw an error when "expectedMessageComponent" has {repeatingGroup} without repeater attribute', function () {
      assert.throw(() => {
        validate({repeatingGroup: {path: "test", number: "test"}, path: "test", equals: "test"})
      }, 'Expected message component does not match any expected patterns. The invalid component is {\"repeatingGroup\":{\"path\":\"test\",\"number\":\"test\"},\"path\":\"test\",\"equals\":\"test\"}');
    });

    it('should throw an error when "expectedMessageComponent" has {repeatingGroup} without number attribute', function () {
      assert.throw(() => {
        validate({repeatingGroup: {repeater: "test", path: "test"}, path: "test", equals: "test"})
      }, 'Expected message component does not match any expected patterns. The invalid component is {\"repeatingGroup\":{\"repeater\":\"test\",\"path\":\"test\"},\"path\":\"test\",\"equals\":\"test\"}');
    });
  });

  describe('getPathToElement()', function () {

    var getPathToElement = messageComponent.__get__('getPathToElement');

    describe('type is messageComponentType.STANDARD', function () {

      it('should return an object where pathIsRootElement = true and an "attribute" is supplied and the path/attribute exist', function () {
        var xml =
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <testRootElement xmlns="http://www.testing.com/integration/event">
              <testElement>12345</testElement>
            </testRootElement>`;
        var actualMessageXmlDocument = new xmldoc.XmlDocument(xml);
        assert.isDefined(getPathToElement({path: "testRootElement", attribute: "xmlns", equals: "test"}, 'STANDARD', actualMessageXmlDocument));
      });

      it('should return undefined where pathIsRootElement = true and an "attribute" is supplied and the attribute does NOT exist (other attributes exist)', function () {
        var xml =
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <testRootElement xmlns="http://www.testing.com/integration/event">
              <testElement>12345</testElement>
            </testRootElement>`;
        var actualMessageXmlDocument = new xmldoc.XmlDocument(xml);
        assert.isUndefined(getPathToElement({path: "testRootElement", attribute: "doesNotExist", equals: "test"}, 'STANDARD', actualMessageXmlDocument));
      });

      it('should return undefined where pathIsRootElement = true and an "attribute" is supplied and the attribute does NOT exist (no other attributes exist)', function () {
        var xml =
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <testRootElement>
              <testElement>12345</testElement>
            </testRootElement>`;
        var actualMessageXmlDocument = new xmldoc.XmlDocument(xml);
        assert.isUndefined(getPathToElement({path: "testRootElement", attribute: "doesNotExist", equals: "test"}, 'STANDARD', actualMessageXmlDocument));
      });

      it('should return an object where pathIsRootElement = false and an "attribute" is supplied and the path/attribute exist', function () {
        var xml =
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <testRootElement xmlns="http://www.testing.com/integration/event">
              <testElement testAttribute="test">12345</testElement>
            </testRootElement>`;
        var actualMessageXmlDocument = new xmldoc.XmlDocument(xml);
        assert.isDefined(getPathToElement({path: "testElement", attribute: "testAttribute", equals: "test"}, 'STANDARD', actualMessageXmlDocument));
      });

      it('should return undefined where pathIsRootElement = false and an "attribute" is supplied and the attribute does NOT exist (other attributes exist)', function () {
        var xml =
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <testRootElement xmlns="http://www.testing.com/integration/event">
              <testElement testAttribute="test">12345</testElement>
            </testRootElement>`;
        var actualMessageXmlDocument = new xmldoc.XmlDocument(xml);
        assert.isUndefined(getPathToElement({path: "testElement", attribute: "doesNotExist", equals: "test"}, 'STANDARD', actualMessageXmlDocument));
      });

      it('should return undefined where pathIsRootElement = false and an "attribute" is supplied and the attribute does NOT exist (no other attributes exist)', function () {
        var xml =
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <testRootElement xmlns="http://www.testing.com/integration/event">
              <testElement>12345</testElement>
            </testRootElement>`;
        var actualMessageXmlDocument = new xmldoc.XmlDocument(xml);
        assert.isUndefined(getPathToElement({path: "testElement", attribute: "doesNotExist", equals: "test"}, 'STANDARD', actualMessageXmlDocument));
      });

      it('should return undefined where pathIsRootElement = false and an "attribute" is supplied and the path does NOT exist', function () {
        var xml =
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <testRootElement xmlns="http://www.testing.com/integration/event">
              <testElement testAttribute="test">12345</testElement>
            </testRootElement>`;
        var actualMessageXmlDocument = new xmldoc.XmlDocument(xml);
        assert.isUndefined(getPathToElement({path: "doesNotExist", attribute: "testAttribute", equals: "test"}, 'STANDARD', actualMessageXmlDocument));
      });

      it('should return an object where pathIsRootElement = true and the path exists', function () {
        var xml =
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <testRootElement xmlns="http://www.testing.com/integration/event">
            </testRootElement>`;
        var actualMessageXmlDocument = new xmldoc.XmlDocument(xml);
        assert.isDefined(getPathToElement({path: "testRootElement", equals: "test"}, 'STANDARD', actualMessageXmlDocument));
      });

      it('should return an object where pathIsRootElement = false and the path exists', function () {
        var xml =
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <testRootElement xmlns="http://www.testing.com/integration/event">
              <testElement testAttribute="test">12345</testElement>
            </testRootElement>`;
        var actualMessageXmlDocument = new xmldoc.XmlDocument(xml);
        assert.isDefined(getPathToElement({path: "testElement", equals: "test"}, 'STANDARD', actualMessageXmlDocument));
      });

      it('should return undefined where pathIsRootElement = false and the path does NOT exists', function () {
        var xml =
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <testRootElement xmlns="http://www.testing.com/integration/event">
              <testElement testAttribute="test">12345</testElement>
            </testRootElement>`;
        var actualMessageXmlDocument = new xmldoc.XmlDocument(xml);
        assert.isUndefined(getPathToElement({path: "doesNotExist", equals: "test"}, 'STANDARD', actualMessageXmlDocument));
      });

    });

    describe.only('type is messageComponentType.POSITION', function () {

      it('should return an object where parentPathIsRootElement = true and elementPosition/element match an element (only 1 element exists under parentPath)', function () {
        var xml =
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <testRootElement xmlns="http://www.testing.com/integration/event">
              <testElement testAttribute="test">12345</testElement>
            </testRootElement>`;
        var actualMessageXmlDocument = new xmldoc.XmlDocument(xml);
        assert.isDefined(getPathToElement({parentPath: "testRootElement", elementPosition: 1, element: "testElement", equals: "12345"}, 'POSITION', actualMessageXmlDocument));
      });

      it('should return an object where parentPathIsRootElement = true and elementPosition/element/attribute match an element\'s attribute (only 1 element exists under parentPath)', function () {
        var xml =
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <testRootElement xmlns="http://www.testing.com/integration/event">
              <testElement testAttribute="test">12345</testElement>
            </testRootElement>`;
        var actualMessageXmlDocument = new xmldoc.XmlDocument(xml);
        assert.isDefined(getPathToElement({parentPath: "testRootElement", elementPosition: 1, element: "testElement", attribute: "xmlns", equals: "test"}, 'POSITION', actualMessageXmlDocument));
      });

      it('should return an object where parentPathIsRootElement = true and elementPosition/element match an element (multiple elements exist under parentPath and elementPosition = 1)', function () {
        var xml =
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <testRootElement xmlns="http://www.testing.com/integration/event">
              <testElement testAttribute="test1">1</testElement>
              <testElement testAttribute="test2">2</testElement>
              <testElement testAttribute="test3">3</testElement>
            </testRootElement>`;
        var actualMessageXmlDocument = new xmldoc.XmlDocument(xml);
        assert.isDefined(getPathToElement({parentPath: "testRootElement", elementPosition: 1, element: "testElement", equals: "1"}, 'POSITION', actualMessageXmlDocument));
      });

      it('should return an object where parentPathIsRootElement = true and elementPosition/element match an element (multiple elements exist under parentPath and elementPosition = position of last element)', function () {
        var xml =
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <testRootElement xmlns="http://www.testing.com/integration/event">
              <testElement testAttribute="test1">1</testElement>
              <testElement testAttribute="test2">2</testElement>
              <testElement testAttribute="test3">3</testElement>
            </testRootElement>`;
        var actualMessageXmlDocument = new xmldoc.XmlDocument(xml);
        assert.isDefined(getPathToElement({parentPath: "testRootElement", elementPosition: 3, element: "testElement", equals: "3"}, 'POSITION', actualMessageXmlDocument));
      });

      it('should return undefined where parentPathIsRootElement = true and elementPosition does not match an element', function () {
        var xml =
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <testRootElement xmlns="http://www.testing.com/integration/event">
              <testElement testAttribute="test">12345</testElement>
            </testRootElement>`;
        var actualMessageXmlDocument = new xmldoc.XmlDocument(xml);
        assert.isUndefined(getPathToElement({parentPath: "testRootElement", elementPosition: 2, element: "testElement", equals: "12345"}, 'POSITION', actualMessageXmlDocument));
      });

      it('should return undefined where parentPathIsRootElement = true and element does not match the element at the position specified by elementPosition', function () {
        var xml =
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <testRootElement xmlns="http://www.testing.com/integration/event">
              <testElement testAttribute="test">12345</testElement>
            </testRootElement>`;
        var actualMessageXmlDocument = new xmldoc.XmlDocument(xml);
        assert.isUndefined(getPathToElement({parentPath: "testRootElement", elementPosition: 1, element: "testElement1", equals: "12345"}, 'POSITION', actualMessageXmlDocument));
      });

      it('should return undefined where parentPathIsRootElement = true and no attributes exist for the element matched by elementPosition/element and an attribute is expected', function () {
        var xml =
          `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
            <testRootElement xmlns="http://www.testing.com/integration/event">
              <testElement>12345</testElement>
            </testRootElement>`;
        var actualMessageXmlDocument = new xmldoc.XmlDocument(xml);
        assert.isUndefined(getPathToElement({parentPath: "testRootElement", elementPosition: 1, element: "testElement", attribute: "testAttribute", equals: "12345"}, 'POSITION', actualMessageXmlDocument));
      });

      it.skip('should return undefined where parentPathIsRootElement = true and the expected attribute does not exist for the element matched by elementPosition/element', function () {
      });


      it.skip('should return an object where parentPathIsRootElement = false and elementPosition/element match an element (only 1 element exists under parentPath)', function () {
      });

      it.skip('should return an object where parentPathIsRootElement = false and elementPosition/element/attribute match an element\'s attribute (only 1 element exists under parentPath)', function () {
      });

      it.skip('should return an object where parentPathIsRootElement = false and elementPosition/element match an element (multiple elements exist under parentPath and elementPosition = 1)', function () {
      });

      it.skip('should return an object where parentPathIsRootElement = false and elementPosition/element match an element (multiple elements exist under parentPath and elementPosition = position of last element)', function () {
      });

      it.skip('should return undefined where parentPathIsRootElement = false and elementPosition does not match an element', function () {
      });

      it.skip('should return undefined where parentPathIsRootElement = false and element does not match the element at the position specified by elementPosition', function () {
      });

      it.skip('should return undefined where parentPathIsRootElement = false and no attributes exist for the element matched by elementPosition/element and an attribute is expected', function () {
      });

      it.skip('should return undefined where parentPathIsRootElement = false and the expected attribute does not exist for the element matched by elementPosition/element', function () {
      });

    });
  });
});

