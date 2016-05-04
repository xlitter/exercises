/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
function Range(from, to) {
  this.from = from;
  this.to = to;
}
Range.prototype = {
  constructor: Range,
  includes: function (x) {
    return x >= this.from && x <= this.to;
  },
  foreach: function (f) {
    for (var i = Math.ceil(this.from); i <= this.to; i++) {
      f(i);
    }
  },
  toString: function () {
    return '(' + this.from + '...' + this.to + ')';
  }
}
var log = console.log.bind(console);
var r = new Range(2.2,7);

log(r.includes(2.3));

r.foreach(log);

log(String(r));


