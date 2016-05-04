/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
// 9-6-2 枚举类型
function enumeration(namesToValue) {
  function enumeration(){
    throw 'Can\'t Instantiate Enumerations';
  }  
  
  var proto = enumeration.prototype = {
    constructor: enumeration,
    toString: function(){ console.log('toString'); return this.name;},
    valueOf: function(){console.log('valueOf'); return this.value;}
  };
  
  enumeration.values= [];
  
  for(var k in namesToValue){
    if(namesToValue.hasOwnProperty(k)){
      var c = inherit(proto);
      c.name =k;
      c.value = namesToValue[k];
      enumeration[k] = c;
      enumeration.values.push(c);
    }
  }
  
  enumeration.forEach = function(fn, context){
    for(var i = 0, len = this.values.length; i<len; i++){
      fn&&fn.call(context, this.values[i], i, this.values);
    }
  };
  
  return enumeration;
}

var Coin = enumeration({Penny:1, Nickel:5, ime:10, Quarter:25});
var p = Coin.Penny;
console.log(p instanceof Coin);
console.log(p.constructor);
console.log(p.constructor == Coin);
console.log(p == 1);
console.log(Coin.Penny + 3* Coin.Nickel);
console.log(Coin.Penny>Coin.ime);



 