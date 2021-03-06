  var request 	= require('request')
      , vows 		= require('vows')
      , assert 	= require('assert')
      , fs			= require('fs')
      ;

  vows.describe('JSON schema API').addBatch({
    "When using the API": {
      "testing the push delivery endpoint": {
        "A POST to /data": {
          topic: function () {
            request({
              uri: 'http://localhost:3000/data',
              method: 'POST',
              body: fs.readFileSync('./test/sample_data/interaction.json'),
              headers: {
                'Content-Type': 'application/json'
              }
            }, this.callback)
          },
          "should respond with 200": function (err, res, body) {
            assert.equal(res.statusCode, 200);
          },
          "should respond with success TRUE": function (err, res, body) {
            var result = JSON.parse(body);
            assert.equal(result.success, true);
          }
        }
      },   
      "sumbitting multiple array delimited interactions": {
          topic: function () {
            request({
              uri: 'http://localhost:3000/data',
              method: 'POST',
              body: fs.readFileSync('./test/sample_data/array.delimited.interactions.json'),
              headers: {
                'Content-Type': 'application/json'
              }
            }, this.callback)
          },
          "should respond with 200": function (err, res, body) {
            assert.equal(res.statusCode, 200);
          }
        }
      
      
    }
  }).export(module);