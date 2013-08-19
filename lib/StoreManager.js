'use strict';

var StoreManager;

StoreManager = function StoreManager(modules) {

};

StoreManager.fn = StoreManager.prototype;


StoreManager.fn.process = function () {
  var self = this;
  console.log('storemanager process called');
};


module.exports = StoreManager;