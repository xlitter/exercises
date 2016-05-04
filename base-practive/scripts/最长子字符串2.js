/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
function queryMaxStr(str1, str2) {
  var l1 = str1.length,
  l2 = str2.length,
  m = 0,
  n = 0,
  i,
  j,
  curLen = 0,
  maxLen = 0,
  posX1 = 0,
  posY1 = 0;
  for (i = 0; i < l1; i++) {
    for (j = 0; j < l2; j++) {
      if (str1[i] === str2[j]) {
        m = i + 1;
        n = j + 1;
        curLen = 1;
        while (m < l1 && n < l2) {
          if (str1[m] !== str2[n]) {
            curLen = 0;
            break;
          } else {
            if (++curLen > maxLen) {
              maxLen = curLen;
              posX1 = i;
              posY1 = m;
            }
          }
          m++;
          n++;
        }
      }
    }
  }
  return {
    maxLen: maxLen,
    maxStr: Array.prototype.slice.call(str1, posX1, posY1 + 1).join('')
  };
}
function queryMaxStr2(str1, str2) {
  var l1 = str1.length,
  l2 = str2.length,
  i,
  j,
  m,
  n,
  posX1 = 0,
  posY1 = 0,
  maxLen = 0,
  curLen = 0,
  srcLens = [
    l1,
    l2
  ];
  for (j = 0; j < 2; j++) {
    for (i = j; i < srcLens[j]; i++) {
      m = j === 0 ? i : 0;
      n = j === 0 ? 0 : i;
      curLen = 0;
      while (m < l1 && n < l2) {
        if (str1[m] === str2[n]) {
          curLen++;
          if (curLen > maxLen) {
            maxLen = curLen;
            posX1 = m - curLen + 1;
            posY1 = m;
          }
        } else {
          curLen = 0;
        }
        m++;
        n++;
      }
    }
  }
  return {
    maxLen: maxLen,
    maxStr: Array.prototype.slice.call(str1, posX1, posY1 + 1).join('')
  };
}
console.log(queryMaxStr2('absdfa1sdfabc', 'basdfasdfabc1123123'));
console.log(queryMaxStr('absdfa1sdfabc', 'basdfasdfabc1123123'));


function queryMaxUnqiueStr(str1, str2) {
  var l1 = str1.length,
  l2 = str2.length,
  i,
  j,
  m,
  n,
  posX1 = 0,
  posY1 = 0,
  maxLen = 0,
  curLen = 0,
  srcLens = [
    l1,
    l2
  ],
  o = {};
  for (j = 0; j < 2; j++) {
    for (i = j; i < srcLens[j]; i++) {
      m = j === 0 ? i : 0;
      n = j === 0 ? 0 : i;
      curLen = 0;
      o={};
      while (m < l1 && n < l2) {
        if (str1[m] === str2[n] && !o.hasOwnProperty(str1[m])) {
          curLen++;
          o[str1[m]] = 1;
          if (curLen > maxLen) {
            maxLen = curLen;
            posX1 = m - curLen + 1;
            posY1 = m;
          }
        } else {
          curLen = 0;
          o={};
        }
        m++;
        n++;
      }
    }
  }
  return {
    maxLen: maxLen,
    maxStr: Array.prototype.slice.call(str1, posX1, posY1 + 1).join('')
  };
}
console.log(queryMaxStr('absdfsdfsdf', 'basdfsdfsdf'));
console.log(queryMaxStr2('absdfsdfsdf', 'basdfsdfsdf'));
console.log(queryMaxUnqiueStr('absdfsdfsdf', 'basdfsdfsdf'));