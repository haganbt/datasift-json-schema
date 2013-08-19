// vows --spec 

var   vows 		= require('vows')
    , assert 	= require('assert')
    , merge 	= require('merge-recursive')
    , fs			= require('fs')
    ;

vows.describe('Merge JSON objects recursively').addBatch({
    'Merging a child element': {
         topic: function () {
	        return merge.recursive(
	        	JSON.parse(fs.readFileSync('./test/sample_data/interaction.json')),
	        	JSON.parse(fs.readFileSync('./test/sample_data/interaction.link.json'))
					);
         },

        'contains the interaction.link key and value': function (topic) {
        	assert.deepEqual ({"interaction":{"link":"http://twitter.com/foo/1234"}}, topic);
        }
   },
    'Merging a second level child element': {
         topic: function () { 
         	interaction = JSON.parse(fs.readFileSync('./test/sample_data/interaction.json'));
	        return merge.recursive(
	        	JSON.parse(fs.readFileSync('./test/sample_data/interaction.json')),
	        	JSON.parse(fs.readFileSync('./test/sample_data/interaction.author.username.json'))
					);
         },

        'contains the interaction.author.username key and value': function (topic) {
        	assert.deepEqual ({"interaction":{"author":{"username":"syvzwvn"}}}, topic);
        }
    }  
    
}).export(module); // Export the Suite
