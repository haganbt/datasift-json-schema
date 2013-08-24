(function () {
  'use strict';   
  var StoreManager = require('../StoreManager');

  module.exports = function (modules) {
    var storeManager = new StoreManager;

    return {

      show: function (request, response) {
        var snapshot = storeManager.get(function (err) {        	
          if (err) {
            return response.send(500, err);
          }
        });
			 response.render('index', { data: JSON.stringify(snapshot.parent), count: snapshot.count });
      },

     save: function (request, response) {
     	 storeManager.process(request);
     	 return response.send(200, {"success":true});
     }
       
    };
  };
})();
