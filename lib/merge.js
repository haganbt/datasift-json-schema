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
/*
// Flat, selective merge
exports.selective = function(keys, host) {
	var donors = slice(arguments, 1);
	donors.forEach(function(donor) {
		keys.forEach(function(key) {
			host[key] = donor[key];
		});
	});
	return host;
};
*/
// Recursive merge
exports.recursive = function(host) {
	var donors = slice(arguments, 1);
	
	//console.log("\n*****" + typeof(slice(donors, 0)));
	
	//console.log("\n*****donors" + JSON.stringify(donors));
	//console.log("\n*****");	
	
	//Object.keys(options)
	
	
	donors.forEach(function(donor) {
		Object.keys(donor).forEach(recurser(host, donor));
	});
	return host;
};

/*
// Recursive, selective merge
exports.selective.recursive = function(keys, host) {
	var donors = slice(arguments, 1);
	donors.forEach(function(donor) {
		keys.forEach(recurser(host, donor));
	});
	return host;
};
*/
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
			if (isObj(host[key])) {
				exports.recursive(host[key], donor[key]);
			} else {
				var base = Array.isArray(donor[key]) ? [ ] : { };
				host[key] = exports.recursive(base, donor[key]);
			}
		} else {
			// Not a number so store it
			if(isNaN(key) === true){
				host[key] = donor[key];	
				//console.log("\n" + key + " : " + typeof(key) + " : " + JSON.stringify(donor[key]));
				//console.log("\n" + key + " : " + typeof(donor[key]));
				
				// Key is a number so is array, only keep 3 values			
			} else if(parseInt(key) <=2){
				host[key] = donor[key];	
			}
		}
	};
}