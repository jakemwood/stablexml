module.exports = function() {

	var cb = function(error, results) {};
	
	var sax = require('sax');
	var parser = sax.parser(true);
	
	var parsingObject = []
	var currentObject = parsingObject;
	var parentObject = [parsingObject];
	
	parser.onerror = function(e) {
		cb(e, null);
	}
	
	parser.onopentag = function(node) {
		var newObject = {};
		newObject[node.name] = {};	
		if (Object.keys(node.attributes).length > 0) {
			newObject[node.name].$ = {};
			for (var i in node.attributes) {
				newObject[node.name].$[i] = node.attributes[i];
			}
		}
		newObject[node.name]._ = [];
		parentObject.push(currentObject);
		currentObject.push(newObject);
		currentObject = newObject[node.name]._;
	}
	
	parser.onclosetag = function(node) {
		var deleteUnderscore = false;
		if (currentObject.length == 0) {
			deleteUnderscore = true;
		}
		currentObject = parentObject[parentObject.length - 1];
		if (deleteUnderscore) {
			for (var x in currentObject) {
				var keys = Object.keys(currentObject[x]);
				for (var y in keys) {
					var xo = currentObject[x];
					if (xo[keys[y]]._) {
						if (xo[keys[y]]._.length == 0) {
							delete xo[keys[y]]._;
						}
					}
				}
			}
		}
		parentObject.splice(parentObject.length - 1, 1);
	}
	parser.onend = function () {
		cb(null, parsingObject);
		parsingObject = [];
	};
	
	this.parseXML = function(xml, callback) {
		cb = callback;
		parser.write(xml).close();
	}
}