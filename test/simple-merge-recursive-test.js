// ./node_modules/vows/bin/vows --spec 

var vows 	= require('vows'),
    assert 	= require('assert'),
    merge 	= require('merge-recursive');


vows.describe('Merge JSON objects recursively').addBatch({
    'Merging two simple objects': {
         topic: function () { 
	        return merge.recursive(
			    { o: { a: 'a', b: 'b' } },
			    { o: { b: 'c', c: 'd' } }
			);
         },

        'contains all parent keys and associated values': function (topic) {
            //assert.isObject(topic);
            assert.deepEqual ({ o: { a: 'a', b: 'c', c: 'd' } }, topic);
        }
    }
}).export(module); // Export the Suite
