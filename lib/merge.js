/*
 * Original merge code based on merge-recursive by James Brumond
 *  - github.com/UmbraEngineering/node-merge-recursive
 */

// Flat merge
module.exports = exports = function(host) {
	var donors = slice(arguments, 1);
	donors.forEach(function(donor) {
		Object.keys(donor).forEach(function(key) {
			host[key] = donor[key];
		});
	});
	return host;
};

// Recursive merge
exports.recursive = function(host) {
	var donors = slice(arguments, 1);
	donors.forEach(function(donor) {
		Object.keys(donor).forEach(recurser(host, donor));
	});
	return host;
};


// Helpers

function slice(arr, i) {
	return Array.prototype.slice.call(arr, i);
}

function isObj(value) {
	return !! (typeof value === 'object' && value);
}

function getType(value) {
	return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

function recurser(host, donor) {
	return function(key) {
		
		if (isObj(donor[key])) {

			// Detect new properties
			if(isNaN(key) === true && !host[key]){
				console.log("New property detected: " + key );
			}
			
			if (isObj(host[key])) {
				exports.recursive(host[key], donor[key]);
			} else {

			// Handle links.hops - array of arrays
			if(isNaN(key) === false && parseInt(key) > 2){
				return;
			}	
				
			var base = Array.isArray(donor[key]) ? [ ] : { };
			host[key] = exports.recursive(base, donor[key]);
			//console.log("\n" + key + " : " + typeof(key) + " : " + JSON.stringify(base));				
			}
		} else {
			
			// Handle array items
			if(isNaN(key) === false && parseInt(key) > 2){
				return;
			}

			host[key] = donor[key];	
			
		}
	};
}