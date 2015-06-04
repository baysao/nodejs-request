var mod = require("../index.js");
var assert = require("assert");

function response(text, check){
	return {
		json:function(message){
			assert.deepEqual(text, message)
			check.called = 1;
		}
	}
}

describe("Webix Request parser", function(){

	it("must send error response", function(){
		var check = {};

		try {
			mod.sendResponse({
				status:"error",
				error:{
					message:"Test"
				}
			}, response("Test", check));
		} catch(e){
			check.called += 1;
		}

		assert.equal(check.called, 2)
	});

	it("must send data response", function(){
		var check = {};
		var test_data = [{ a:1}, {a:2}];

		mod.sendResponse({
			status:"read",
			data:test_data
		}, response(test_data, check));

		assert.equal(check.called, 1)
	});

	it("must send update response", function(){
		var check = {};
		var test_data = [{a:1}, {a:2}];

		mod.sendResponse({
			status:"any",
			source_id: 123
		}, response({
			id:123,
			status:"success"
		}, check));

		assert.equal(check.called, 1)
	});

})