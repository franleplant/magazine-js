var f1 = function () {return this};
var f2 = function () {console.log(arguments)};
var f3 = function () {console.log("Im f3")};

var p1 = Publisher();
p1.bind("e1", f2);
p1.bind("e1", f3);
p1.trigger("e1", "Im the first argument", 2, 3, [4], {arg_num: 5});



var o = {attr: "hello!"};
var p2 = Publisher(o);

p2.bind("e2", f1);

p2.trigger("e2");