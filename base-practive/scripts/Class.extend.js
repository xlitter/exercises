/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
var Class = (function () {
  function inherit(p) {
    if (Object.create) {
      return Object.create(p)
    }
    if (typeof p !== 'object') {
      throw new TypeError('prototype need Object or null');
    }
    function F() {
    }
    F.prototype = p;
    return new F();
  }
  function extend(dest, source) {
    for (var k in source) {
      if (source.hasOwnProperty(k)) {
        dest[k] = source[k];
      }
    }
    return dest;
  }
  var slice = Array.prototype.slice,
  _extend = function (opts, methods, statics) {
    var args = slice.call(arguments),
    proto;
    if (args.length === 0) {
      throw new Error('need one arguments');
    }
    function SubClass() {
      if (this.initialization) {
        this.initialization.apply(this, arguments);
      }
    }
    proto = SubClass.prototype = inherit(this.prototype);
    extend(proto, opts);
    if (methods && typeof methods === 'object') extend(SubClass.prototype, methods);
    if (statics && typeof statics === 'object') extend(SubClass, statics);
    SubClass.extend = _extend;
    proto.constructor = SubClass;
    return SubClass;
  };
  function Class() {
  }
  Class.extend = _extend;
  return Class
}) ();
var Animal = Class.extend({
  initialization: function (opts) {
    if (opts) {
      this.from = opts.from;
      this.to = opts.to;
    }
  }
}, {
  forEach: function (fn, context) {
    for (var i = 0, j = Math.ceil(this.from); j <= this.to; j++) {
      fn.call(context, j, i++);
    }
  },
  toString: function () {
    return '(' + this.from + '...' + this.to + ')';
  }
});
var Dog = Animal.extend({
  initialization: function (opts) {
    Animal.prototype.initialization.call(this, opts);
    this.name = opts.name || '';
  }
}, {
  toString: function () {
    return '(' + this.name + ', from:' + this.from + ', to:' + this.to + ')'
  }
})
var animal = new Animal({
  from: 2,
  to: 4
});
console.log('Animal prototype', animal.constructor);
animal.forEach(function (v, idx) {
  console.log('for->', v, idx);
});
console.log(animal.toString());
var dog = new Dog({
  from: 4,
  to: 10,
  name: 'Aral'
});
console.log('Dog prototype', Dog.prototype);
dog.forEach(function (v, idx) {
  console.log('for->', v, idx);
});
console.log(dog.toString());
console.log('Dog instanceof', dog instanceof Dog);
console.log('Animal instanceof', dog instanceof Animal);

/*
Exception: TypeError: dog is undefined
@Scratchpad/1:86:1
*/