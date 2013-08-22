// vows --spec 

var   vows 		= require('vows')
    , assert 	= require('assert')
    , merge   = require('../lib/merge')
    , fs			= require('fs')
    ;

vows.describe('Merge JSON objects recursively').addBatch({
    'with a child element': {
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
   
    'with a second level child element': {
         topic: function () { 
	        return merge.recursive(
	        	JSON.parse(fs.readFileSync('./test/sample_data/interaction.json')),
	        	JSON.parse(fs.readFileSync('./test/sample_data/interaction.author.username.json'))
					);
         },
        'contains the interaction.author.username key and value': function (topic) {
        	assert.deepEqual ({"interaction":{"author":{"username":"syvzwvn"}}}, topic);
        }
    },
    
    'with two child items': {
         topic: function () { 
         	var out = merge.recursive(
	        	JSON.parse(fs.readFileSync('./test/sample_data/interaction.json')),
	        	JSON.parse(fs.readFileSync('./test/sample_data/interaction.link.json'))
					);
					
					return merge.recursive(out, JSON.parse(fs.readFileSync('./test/sample_data/interaction.content.json'))
					);
         },
        'contains the interaction.author.link and interaction.author.content keys': function (topic) {
        	assert.deepEqual ({"interaction":{"link":"http://twitter.com/foo/1234","content":"Hello World!"}}, topic);
        }
    },
    
    'with two parent items': {
         topic: function () { 
					return merge.recursive(JSON.parse(fs.readFileSync('./test/sample_data/interaction.json')), JSON.parse(fs.readFileSync('./test/sample_data/klout.json'))
					);
         },
        'contains both interaction and klout parent items': function (topic) {
        	assert.deepEqual ({"interaction":{},"klout":{"amplification":5,"network":8.95,"score":30,"topics":["photography","super bowl","typos","iran"],"true_reach":124}}, topic);
        }
    },
    
    'with two identical parent items': {
         topic: function () { 
					return merge.recursive(JSON.parse(fs.readFileSync('./test/sample_data/interaction.link.json')), JSON.parse(fs.readFileSync('./test/sample_data/interaction.link.json')));
         },
        'returns only a single item': function (topic) {
        	assert.deepEqual ({"interaction":{"link":"http://twitter.com/foo/1234"}}, topic);
        }
    }/*,
    
    'with many child list items': {
         topic: function () { 
					return merge.recursive(JSON.parse(fs.readFileSync('./test/sample_data/interaction.json')), JSON.parse(fs.readFileSync('./test/links.multiple.children.json'))
					);
         },
        'the lists are truncated to 3 items': function (topic) {
        	assert.deepEqual (true, topic);
        }
    },   */ 
    
}).export(module); // Export the Suite
