  'use strict';
  var data = {
  	parent : {},
  	count: 0,
  	time: 0
  }
  , StoreManager
  , merge 		= require('./merge')
  , strftime 	= require('strftime')
  ;

StoreManager = function StoreManager(modules) {

};

StoreManager.fn = StoreManager.prototype;

// Process the inbound data
StoreManager.fn.process = function (inbound) {

	try {
		data.time = strftime('%F %T', new Date());
		var body = inbound.body;

  	for(var i in body) {
  		if(typeof(body[i]) === 'object'){
  			data.count ++;
  			merge.recursive(data.parent, body[i]);
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