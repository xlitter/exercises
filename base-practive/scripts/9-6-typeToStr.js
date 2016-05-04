/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */

function toStr(v){
  var result = '';
  switch(v){
    case null: 
      result = 'n';
      break;
    case undefined:
      result = 'u';
      break;
    case true:
      result ='t';
      break;
    case false:
      result ='f';
      break;
    default:
      switch(typeof v){
        case 'number':
          result = 'n'+v;
          break;
        case 'string':
          result = 's'+v;
          break;
        case 'symbol':
          result = v;
          break;
        default:
          result = objectId(v);
          break;
      }
  }
  
  return result;
}

function objectId(o){
  var prop = '|$$objectId|'
  if(!o.hasOwnProperty(prop)){
    o[prop] = objToStr.seed++;
  }
  return 'o'+o[prop];
};

objToStr.seed = 100;

//test//
var arr = [1,2,3],
    obj = {x:1},
    obj2={x:1},
    reg=/abc:1/,
    fn = function(){
      console.log('fn');
    },
    test = [1, '1', Symbol(1), Symbol .for(1), Symbol.for(1), null, null, undefined, undefined, true, false, 
           2, 3,1,'2', '1', [1,2,3],arr, obj, arr ,fn, obj, fn, {x:1}, obj2, 
            function(){console.log(3) },
           reg,new String(1),reg, new Number(2), new RegExp('2'), new Date(), /abc:1/];

 


for(let v of test){
  console.log(v, `  toStr =`, toStr(v));
}

