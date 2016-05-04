/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
function quickSort(source) {
  function sort(arr, begin, end) {
    var i = begin,
    j = end,
    first = arr[i];
    if (begin < end) {
      while (i < j) {
        for (; j > i; j--) {
          if (arr[j] <= first) {
            arr[i++] = arr[j];
            break;
          }
        }
        for (; i < j; i++) {
          if (arr[i] > first) {
            arr[j--] = arr[i];
            break;
          }
        }
      }
      arr[i] = first;
      console.log('sort->', arr);
      sort(arr, begin, i - 1);
      sort(arr, i + 1, end);
    }
  }
  sort(source, 0, source.length - 1);
  return source;
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
console.log(quickSort(arr));

/*
Exception: ReferenceError: frist is not defined
sort@Scratchpad/3:29:7
quickSort@Scratchpad/3:35:3
@Scratchpad/3:50:13
*/