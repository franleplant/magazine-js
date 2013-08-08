

var assert = require("should");
var Publisher = require("../publisher.js");


describe('Publisher', function(){ 

	describe('Shape of the publisher', function () {
		it('should have bind, unbind and trigger methods', function () {
			var o = {name: "Fran"};
			var p = Publisher(o);
			p.should.have.property('bind');
			p.should.have.property('unbind');
			p.should.have.property('trigger');
		})
	});


	describe('Publisher.bind', function () {
		var o = {name: "Fran"};
		var p = Publisher(o);

		it('Should add a handler to a specific event', function () {
			var result = false;

			var f = function () {
				result = true;
			};

			p.bind("event1", f);
			p.trigger("event1");

			result.should.be.ok;
		})


	})


	describe('Publisher.trigger', function () {
		var o = {name: "Fran"};
		var p = Publisher(o);

		it('Should trigger all the handlers to a specific event', function () {
			var result1 = false;
			var result2 = [];

			var f1 = function () {
				result1 = true;
			};

			var f2= function () {
				result2 = [1,2,3];
			};

			p.bind("event1", f1);
			p.bind("event1", f2);
			p.trigger("event1");

			result1.should.be.ok
			result2.length.should.equal(3)
		});

		it('Shoud accept arguments and pass them to the handlers', function () {

			var result1 = false;
			var result2 = false;

			var f1 = function () {
				result1 = arguments;
			};

			var f2 = function () {
				result2 = arguments;
			};


			p.bind("event2", f1);
			p.bind("event2", f2);
			p.trigger("event2", 1,2,3);

			result1.length.should.equal(3);
			result2.length.should.equal(3);
		});


		it('Should not fail when trying to trigger a none existing event', function () {
			p.trigger("non_existing_event");
			'No error shown'.should.be.ok;
		})

	})


	describe('Publisher.unbind', function () {
		var o = {name: "Fran"};
		var p = Publisher(o);

		it('Should remove a specific handler to a specific event', function () {
			var result1 = false;
			var result2 = false;


			var f1 = function () {result1 = true};
			var f2 = function () {result2 = true};

			p.bind("event1", f1);
			p.bind("event1", f2);

			p.trigger("event1");


			result1.should.be.ok;
			result2.should.be.ok;


			result1 = result2 = false;


			p.unbind("event1", f2);
			p.trigger("event1");

			result1.should.be.ok;
			result2.should.not.be.ok;
		});

		it('Should not fail when trying to unbind a handler to a none existing event', function () {
			p.unbind(  "non_existing_event", function () {}  );

			'No error shown'.should.be.ok;
		});

	})

	describe('Publisher capability to enhance a random object', function () {
		it('Should have access to object attributes within the handlers', function () {
			var o = {name: "Fran"};
			var o = Publisher(o);

			var result = "";

			var f = function () {
				result =  this.name
			};

			o.bind("event", f);
			o.trigger("event");

			result.should.equal(o.name);
		})

	})



})

