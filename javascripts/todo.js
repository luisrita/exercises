var Class = function(parent) {
	var klass = function() {
		this.init.apply(this, arguments);
	};

	//change klass' prototype
	if(parent) {
		var subclass = function(){};
		subclass.prototype = parent.prototype;
		klass.prototype = new subclass;
	}

	klass.prototype.init = function(){};

	//shortcut to acess prototype
	klass.fn = klass.prototype;

	//shortcut to acess class
	klass.fn.parent = klass;

	//shortcut to something
	klass._super = klass.__proto__;

	klass.proxy = function(func) {
		var self = this;
		return(function() {
			return func.apply(self, arguments);
		});
	};

	//add proxy to instances 
	klass.fn.proxy = klass.proxy;

	//adding class properties
	klass.extend = function(obj) {
		var extended = obj.extended;
		for(var i in obj) {
			klass[i] = obj[i];
		}
		if (extended) extended(klass);
	};

	//adding instance properties
	klass.include = function(obj) {
		var included = obj.included;
		for(var i in obj) {
			klass.fn[i] = obj[i];
		}
		if(included) included(klass);
	};

	return klass;
};

var Person = new Class;

Person.prototype.init = function() {

};

var person = new Person;

var Model = {
	inherited: function(){},
	created: function(){},

	prototype: {
		init: function(){}
	},

	create: function() {
		var object = Object.create(this);
		object.parent = this;
		object.prototype = object.fn = Object.create(this.prototype);

		object.created();
		this.inherited(object);
		return object;
	},

	init: function() {
		var instance = Object.create(this.prototype);
		instance.parent = this;
		instance.init.apply(instance, arguments);
		return instance;
	},

	extend: function(o){
		var extended = o.extended;
		jQuery.extend(this, o);
		if (extended) extended(this); 
	},

	include: function(o) {
		var included = o.included;
		jQuery.extend(this.prototype, o);
		if (included) included(this);
	}
};




