  'use strict';
  var data = {}
  , StoreManager    
  ;

StoreManager = function StoreManager(modules) {

};

StoreManager.fn = StoreManager.prototype;


StoreManager.fn.process = function () {
  var self = this;
  console.log('storemanager process called' + data);
};

StoreManager.fn.get = function () {
 return data;
};

module.exports = StoreManager;