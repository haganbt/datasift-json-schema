// vows --spec 

var vows 	= require('vows'),
    assert 	= require('assert'),
    merge 	= require('merge-recursive');

// Load test data
var interaction_parent 									= require('./sample_data/interaction_parent.json');
var interaction_child_item							= require('./sample_data/interaction_child_item.json');
var interaction_second_level_child_item = require('./sample_data/interaction_second_level_child_item.json');



vows.describe('Merge JSON objects recursively').addBatch({
    'Merging a child element': {
         topic: function () { 
	        return merge.recursive(
	        	interaction_parent,
	        	interaction_child_item
					);
         },

        'contains the "link" key and value': function (topic) {
        	assert.deepEqual ({"interaction":{"link":"http://twitter.com/foo/1234"}}, topic);
        }
    },
    'Merging a second level child element': {
         topic: function () { 
	        return merge.recursive(
	        	interaction_parent,
	        	interaction_second_level_child_item
					);
         },

        'contains the "author" key and value': function (topic) {
        	assert.deepEqual ({"interaction":{"link":"http://twitter.com/foo/1234","author":{"username":"syvzwvn"}}}, topic);
        }
    }    
    
}).export(module); // Export the Suite
