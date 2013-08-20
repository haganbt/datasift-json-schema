  'use strict';
  var data = {}
  , StoreManager
  , merge = require('merge-recursive')
  , count = 0
  ;

StoreManager = function StoreManager(modules) {

};

StoreManager.fn = StoreManager.prototype;

// Process the inbound data
StoreManager.fn.process = function (inbound) {

	try {

		var body = inbound.body;

  	for(var i in body) {
  		count ++;
  		if(typeof(body[i]) === 'string'){
  			console.log(body[i]);
  		}
  		merge.recursive(data, body[i]);
  	}
		
  } catch (e){
  	console.log('DEBUG: ' + e);
  }
  
};

// Show the JSON object
StoreManager.fn.get = function () {
  return "Interactions Processed: " + count + "<br /><br />" + JSON.stringify(data);
};

module.exports = StoreManager;