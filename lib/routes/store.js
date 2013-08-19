(function () {
  'use strict';   
  var StoreManager = require('../StoreManager');

  module.exports = function (modules) {
    var storeManager = new StoreManager;

    return {

      show: function (request, response) {
        
   			storeManager.process('testy', function (err) {
        });
        
       return response.send(200, 'hello');
      },

      
     create: function (request, response) {
     	 throw new Error("Not implemented");
     }
      
      
    };
  };
})();
