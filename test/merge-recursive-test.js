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
    
    'with a new item that has many child list items': {
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
    'two objects each with a child object containing an array list': {
        topic: function () { 
         	var test = merge.recursive(JSON.parse(fs.readFileSync('./test/sample_data/interaction.json')), JSON.parse(fs.readFileSync('./test/sample_data/child.array.list.json')));
					return merge.recursive(test, JSON.parse(fs.readFileSync('./test/sample_data/child.array.list.json'))
					);
        },
        'the merged child array list item is an array': function (topic) {
        	assert.isArray (topic.salience.content.entities);
        },
        'the merged child array list items items are not truncated': function (topic) {
        	assert.deepEqual ([{"about":1,"name":"Waitrose","type":"Company","evidence":1,"label":"Company","sentiment":0,"themes":["lazy sod"],"confident":1}], topic.salience.content.entities);
        }
    }    
    
}).export(module); // Export the Suite
