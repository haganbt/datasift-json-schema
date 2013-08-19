  var request = require('request'),
      vows = require('vows'),
      assert = require('assert');

  vows.describe('your/awesome/api').addBatch({
    "When using your awesome api": {
      "and your awesome resource": {
        "A POST to /": {
          topic: function () {
            request({
              uri: 'http://localhost:3000/',
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
          "should respond with ok": function (err, res, body) {
            var result = JSON.parse(body);
            assert.equal(result.ok, true);
          },
          "should respond with x-test-header": function (err, res, body) {
            assert.include(res.headers, 'x-test-header');
          }
        }
      }
    }
  }).export(module);