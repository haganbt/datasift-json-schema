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
        	assert.isString(topic.interaction.link);
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
        	assert.isString(topic.interaction.author.username);
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
        'contains the interaction.link key and value': function (topic) {
        	assert.isString(topic.interaction.link);
        },
        'contains the interaction.content key and value': function (topic) {
        	assert.isString(topic.interaction.content);
        }
    },
    
    'with two parent items': {
         topic: function () { 
					return merge.recursive(JSON.parse(fs.readFileSync('./test/sample_data/interaction.json')), JSON.parse(fs.readFileSync('./test/sample_data/klout.json'))
					);
         },
        'contains the interaction parent items': function (topic) {
        	assert.isObject(topic.interaction);
        },
        'contains the klout parent items': function (topic) {
        	assert.isObject(topic.klout);
        }
    },
    
    'with two identical parent items': {
         topic: function () { 
					return merge.recursive(JSON.parse(fs.readFileSync('./test/sample_data/interaction.link.json')), JSON.parse(fs.readFileSync('./test/sample_data/interaction.link.json')));
         },
        'returns only a single item': function (topic) {
        	assert.deepEqual ({"interaction":{"link":"http://twitter.com/foo/1234"}}, topic);
        }
    },
    
    'with many child list items': {
         topic: function () { 
					return merge.recursive(JSON.parse(fs.readFileSync('./test/sample_data/interaction.json')), JSON.parse(fs.readFileSync('./test/sample_data/links.multiple.children.json'))
					);
         },
        'the links.code values are truncated to 3 items': function (topic) {
        	assert.lengthOf (topic.links.code, 3);
        },
        'the links.created_at values are truncated to 3 items': function (topic) {
        	assert.lengthOf (topic.links.created_at, 3);
        }
        
    },
    
}).export(module); // Export the Suite
