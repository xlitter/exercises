/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
function mergeSort(source) {
  function merge(first, last) {
    var fl = first.length,
    ll = last.length,
    i = 0,
    j = 0,
    result = [
    ];
    while (i < fl && j < ll) {
      if (first[i] <= last[j]) {
        result.push(first[i++]);
      } else {
        result.push(last[j++]);
      }
    }
    while (i < fl) {
      result.push(first[i++]);
    }
    while (j < ll) {
      result.push(last[j++]);
    }
    return result;
  }
  function sort(arr) {
    var len = arr.length,
    mid;
    if (len > 1) {
      mid = Math.floor(len / 2);
      return merge(sort(arr.slice(0, mid)), sort(arr.slice(mid)));
    } else {
      return arr;
    }
  }
  return sort(source);
}

var arr = [
  2,
  3,
  6,
  23,
  12,
  22,
  13,
  43,
  51,
  1
];
console.log(mergeSort(arr));
 