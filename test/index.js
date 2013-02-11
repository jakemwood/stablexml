var assert = require("assert");
suite('StableXML', function() {

	var XMLParser = require("../index");
	var parser;
		
	setup(function() {
		parser = new XMLParser();
	});
	
	suite("#parseXML()", function() {
		test("should produce <test />", function() {
			parser.parseXML("<test />", function(err, results) {
				assert.deepEqual(results, [{ test:{} }]);
			});
		});
		test('should produce <test foo="bar" />', function() {
			parser.parseXML('<test foo="bar" />', function(err, results) {
				assert.deepEqual(results, [
					{
						test: {
							$: {
								foo: "bar"
							}
						}
					}
				]);
			});
		});
		test('should produce <test><foo /></test>', function() {
			parser.parseXML('<test><foo /></test>', function(err, results) {
				assert.deepEqual(results, [
					{
						test: {
							_: [
								{
									foo: {}
								}
							]
						}
					}
				]);
				
			});
		});
	});
	
});