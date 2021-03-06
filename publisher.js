var Publisher = function (obj) {
	
	// you can make a ramdon object a Publisher
	var that = obj || {};

	var events = [];

	var slice = Array.prototype.slice;

	that.bind = function (event, fn ) {
		if (!fn) {
			throw "Bind function needs a function as the second argument to set the handler"
			return;		
		}
		events[event] =  events[event] || [];
		events[event].push(fn);
	};

	that.unbind = function (event, fn) {
		if (  !(event in events)  ) { return };
		
		var i = events[event].indexOf(fn);
		events[event].splice(i,1);
	};

	that.trigger = function (event) {
		if (  !(event in events)  ) { return };
		
		var args = arguments;
		var that = this;

		events[event].forEach(function (fn) {
			fn.apply(that, slice.call(args, 1))
		});
	};

	return that;
}


if( typeof module !== "undefined" && ('exports' in module)){
	module.exports	= Publisher;
}