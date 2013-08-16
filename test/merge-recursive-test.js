// vows --spec 

var   vows 		= require('vows')
    , assert 	= require('assert')
    , merge 	= require('merge-recursive')
    , fs			= require('fs')
    ;

// Test data

var interaction 								= JSON.parse(fs.readFileSync('./test/sample_data/interaction.json')),
		interaction_link						= JSON.parse(fs.readFileSync('./test/sample_data/interaction.link.json')),
		interaction_author_username = JSON.parse(fs.readFileSync('./test/sample_data/interaction.author.username.json'))
		;



vows.describe('Merge JSON objects recursively').addBatch({
    'Merging a child element': {
         topic: function () { 
	        return merge.recursive(
	        	interaction,
	        	interaction_link
					);
         },

        'contains the interaction.link key and value': function (topic) {
        	assert.deepEqual ({"interaction":{"link":"http://twitter.com/foo/1234"}}, topic);
        }
   },
    'Merging a second level child element': {
         topic: function () { 
	        return merge.recursive(
	        	interaction,
	        	interaction_author_username
					);
         },

        'contains the interaction.author.username key and value': function (topic) {
        	assert.deepEqual ({"interaction":{"author":{"username":"syvzwvn"}}}, topic);
        }
    }    
    
}).export(module); // Export the Suite
