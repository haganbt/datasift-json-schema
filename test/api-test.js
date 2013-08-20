  var request = require('request'),
      vows = require('vows'),
      assert = require('assert');

  vows.describe('JSON schema API').addBatch({
    "When using the API": {
      "testing the push delivery endpoint": {
        "A POST to /data": {
          topic: function () {
            request({
              uri: 'http://localhost:3000/data',
              method: 'POST',
              body: JSON.stringify({ test: 'data' }),
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
      }
    }
  }).export(module);