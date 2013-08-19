(function () {
  'use strict';   
  var StoreManager = require('../StoreManager');

  module.exports = function (modules) {
    var storeManager = new StoreManager;

    return {

      show: function (request, response) {
        
        var snapshot = storeManager.get(function (err) {
          if (err === null) {
            return response.send(200, snapshot);  
          }
          
          // unexpected error
          return response.send(500, err);
        });
      },

     save: function (request, response) {
     	
     	   return response.send(200, {"success":true});
     }
      
      
    };
  };
})();
