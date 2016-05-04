/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
var Event = (function(){
  
  var eventMap = {},
  slice = Array.prototype.slice;
  
  function bind(event, listener) {
    var listeners = eventMap[event];
    if (!listeners) {
      listeners = eventMap[event] = [];
    }
    typeof listener === 'function' && listeners.push(listener);
  }
  function unbind(event, listener) {
    var listeners;
    switch (arguments.length) {
      case 0:
        eventMap = {
        };
        break;
      case 1:
        delete eventMap[event];
        break;
      default:
        listeners = eventMap[event] || [];
        listeners.forEach(function (v, idx) {
          if (v === listener) {
            listeners.splice(idx, 1);
          }
        });
        break;
    }
  }
  function fire(event) {
    var listeners = event && eventMap[event] || [],
    args = slice.call(arguments, 1);
    listeners.forEach(function (v) {
      v.apply(null, args);
    });
  }
  return {
    bind: bind,
    unbind: unbind,
    fire: fire
  };
})();

var fnc = function(){
   console.log('cc 1', arguments); 
};
Event.bind('cc',fnc);

Event.bind('bb', function(){
  console.log(arguments);
  
});

Event.bind('cc', function(){
  console.log('cc 2', arguments);
});

Event.fire('cc', 'abc');

Event.fire('cc', 'ab');

Event.fire('bb', [1,23,4]);

Event.unbind('cc');

Event.fire('cc', 'ab');

Event.fire('bb', [1,23,4]);
/*
Exception: SyntaxError: missing : after property id
@Scratchpad/2:10
*/
/*
Exception: SyntaxError: missing : after property id
@Scratchpad/2:10
*/