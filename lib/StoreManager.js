  'use strict';
  var data = {}
  , StoreManager
  , merge = require('merge-recursive')   
  ;

StoreManager = function StoreManager(modules) {

};

StoreManager.fn = StoreManager.prototype;


StoreManager.fn.process = function (inbound) {

	try {
     var body = inbound.body;
		 merge.recursive(data, body);
  } catch (e){
  	console.log('DEBUG: ' + e);
  }
  
};

StoreManager.fn.get = function () {
  return JSON.stringify(data);
};

module.exports = StoreManager;