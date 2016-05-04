/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
function bubbleSort(source) {
  var len = source.length,
  i,
  j,
  tmp;
  for (i = 0; i < len; i++) {
    for (j = 0; j < len - i - 1; j++) {
      if (source[j] < source[j + 1]) {
        tmp = source[j + 1];
        source[j + 1] = source[j];
        source[j] = tmp;
      }
    }
  }
  
  return arr;
}
var arr = [
2,
3,
6,
23,
12,
22,
33,
13,
43,
51,
1
];
console.log(bubbleSort(arr));
