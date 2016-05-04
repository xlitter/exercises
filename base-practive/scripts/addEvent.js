/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
(function (global, undefined) {
  var _seed = 1;
  function addEvent(element, event, listener) {
//     if (document.addEventListener) {
//       element.addEventListener(event, listener, false);
//     } else {
      var listeners, events;
      if (!listener.$$guid) {
        listener.$$guid = _seed++;
      }
    
      events = element.events;
      if (!events) {
        events = element.events = {
        };
      }
    
      listeners = events[event];
      if (!listeners) {
        listeners = events[event] = {};
        if (element['on' + event]) {
          listeners[0] = element['on' + event];
        }
      }
      listeners[listener.$$guid] = listener;
      element['on' + event] = handleEvent;
//     }
  }
  function handleEvent(e) {
    var listeners,
        key,
        returnValue;
    e = e || fixEvent(window.event);
    listeners = this.events[e.type] || {};
    for (key in listeners) {
      listener = listeners[key];
      if (listener && listener.call(this, e) === false) {
        returnValue = fasle;
      }
    }
    
    return returnValue;
  }
  function removeEvent(element, event, listener) {
    var listeners = element.events[event];
    if (!listeners || !listener) return;
    if (listener.$$guid) {
      delete listeners[listener.$$guid];
    }
  }
  
  function fixEvent(event){
    event.preventDefault = function(){
      event.returnValue = false;
    };
    
    event.stopPropagation = function(){
      event.cancelBubble = true;
    };
    return event;
  }
  global.addEvent = addEvent;
  global.removeEvent = removeEvent;
}) (this, undefined);


function insertAfter(newElement, oldElement){
  if(arguments.length<2){
    throw new Error('require 2 arguments');
  }
  var parent = oldElement.parentNode,
      sibling = oldElement.nextSibling;
  
  if(sibling){
    parent.insertBefore(newElement, sibling);
  } else {
    parent.appendChild(newElement);
  }
  
}


// Test
var btn = document.createElement('button');
btn.onclick = function(e){
  console.log('this bind click', e, 'this', this);
};

btn.innerText='click';

insertAfter(btn, document.body.firstChild);

addEvent(btn, 'click', function(e){
  console.log('second', e, e.eventPhase, 'this', this);
});
var third = function(e){
  console.log('third', e, 'this', this)
};

addEvent(btn, 'click', third );


addEvent(btn, 'click', function(e){
  console.log('four', e, 'this', this)
});

console.log('third', third.$$guid);

removeEvent(btn, 'click', third)

