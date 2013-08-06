var Publisher = function (obj) {
	
	// you can make a ramdon object a Publisher
	var that = obj || {};

	var events = [];

	var slice = Array.prototype.slice;

	that.bind = function (event, fn ) {
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