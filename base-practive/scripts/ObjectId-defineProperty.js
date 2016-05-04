/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
var objectId = (function() {
  var next = 100;
  return function objectId(o) {
    var propName = '|**objectId**|';
    if (!o.hasOwnProperty(propName)) {
      Object.defineProperty(o, propName, {
        value: next++,
        writable: false,
        enumerable: false,
        configurable: false
      });
    }
    return o[propName];
  }
}) ();

var o = {
  x: 1
};
var fn = function () {
  console.log('abc');
};
var reg = /c/g;
var test = [
  o,
  {
    x: 1
  },
  o,
  fn,
  ()=> {
  },
  fn,
  reg,
  /c/g,
  reg
];
test.forEach(v => {
  console.log(v, objectId(v), Object.keys(v), Object.getOwnPropertyNames(v));
});
/*
Exception: ReferenceError: objctId is not defined
@Scratchpad/1:36:3
@Scratchpad/1:35:1
*/

/*
Exception: SyntaxError: missing ) in parenthetical
@Scratchpad/1:9
*/
/*
Exception: SyntaxError: expected expression, got ')'
@Scratchpad/1:40
*/
/*
Exception: SyntaxError: expected expression, got '>'
@Scratchpad/1:47
*/
/*
Exception: SyntaxError: expected expression, got '>'
@Scratchpad/1:47
*/