/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 */
function queryMaxStr(str1, str2) {
  if (typeof str1 !== 'string' || typeof str2 !== 'string') {
    throw TypeError();
  }
  if (!str1 || !str2) {
    throw new Error('请输入正确的字符串');
  }
  var l1 = str1.length,
  l2 = str2.length,
  x = 0,
  y = 0,
  i,
  m,
  n,
  curLen = 0,
  maxLen = 0;
  //获取矩阵右侧所有数值
  for (i = 0; i < l1; i++) {
    curLen = 0;
    m = i;
    n = 0;
    while (m < l1 && n < l2) {
      //当值相等时则最大长度加1,并计算对应的起始位置
      if (str1[m] === str2[n]) {
        curLen++;
        if (curLen > maxLen) {
          maxLen = curLen;
          x = m - maxLen + 1;
          y = n - maxLen + 1;
        }
      } else {
        curLen = 0;
      }
      m++;
      n++;
    }
  }
  
  //计算矩阵左下角数值
  for (i = 1; i < l2; i++) {
    curLen = 0;
    m = 0;
    n = i;
    while (m < l1 && n < l2) {
      if (str1[m] === str2[n]) {
        curLen++;
        if (curLen > maxLen) {
          maxLen = curLen;
          x = m - maxLen + 1;
          y = n - maxLen + 1;
        }
      } else {
        curLen = 0;
      }
      
      m++;
      n++;
    }
  }
  return {
    maxLen: maxLen,
    x: x,
    y: y
  }
}

console.log(queryMaxStr('banana','ana'));
