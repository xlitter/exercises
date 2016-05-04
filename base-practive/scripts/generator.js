/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */

var obj = {
  a:1, 
  b:2,
  c:3,
  [Symbol.iterator](){
    var that = this,
        keys = Object.keys(that),
        key,
        len = keys.length,
        idx =0 ;
    return {
      next(){
        if(idx<len){
          key = keys[idx++];
          return {
            value: [key, that[key]] , 
            done: false
          };
        } else {
          return {
            value: undefined,
            done: true
          }
        }
      }
    }
  }
  
}

for(let [k, v] of obj){
 console.log(k, v);
}

var obj2 = {
  a:2,
  b:3,
  c:4,
  *[Symbol.iterator](){
    const keys = Object.keys(this);
    
     for(let k of keys){
       yield [k, this[k]];
     }
    
  }
  
};

for(let [k, v] of obj2){
  console.log('obj2', k, v);
}


var o = {};

o.gen = function*(){
  this.b = 3;
  console.log(this);
};

var g = o.gen.call({e:3});
console.log(g instanceof o.gen);

 