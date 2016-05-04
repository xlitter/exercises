/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
function inherit(p) {
  if (Object.create) {
    return Object.create(p);
  }
  var o;
  if (typeof p !== 'object') {
    throw TypeError('Only an Object or null');
  }
  function F() {
  }
  F.prototype = p;
  o = new F();
  F.prototype = null;
  return o;
}

function range(from, to) {
  var r = inherit(range.methods);
  
  r.from = from;
  r.to = to;
  
  return r;
}

range.methods = {
  constructor: Range,
  includes: function (x) {
    return this.from <= x && x <= this.to;
  },
  foreach: function (f) {
    for (var i = Math.ceil(this.from); i <= this.to; i++) {
      f(i);
    }
  },
  toString: function () {
    return '(' + this.from + '...' + this.to + ')';
  }
};

var r = range(3,5);
console.log(r.includes(51));
r.foreach(console.log.bind(console));
 
console.log(r);
console.log(r.constructor);