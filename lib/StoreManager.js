  'use strict';
  var data = {}
  , StoreManager
  , merge = require('./merge')
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
  		if(typeof(body[i]) === 'object'){
  			count ++;
  			merge.recursive(data, body[i]);
  		}
  	}
		
  } catch (e){
  	console.log('DEBUG: ' + e);
  }
  
};

// Show the JSON object
StoreManager.fn.get = function () {
  return data;
};

module.exports = StoreManager;