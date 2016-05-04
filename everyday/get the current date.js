/**
 * Write a JavaScript program to get the current date.
 * Expected Output :  mm-dd-yyyy, mm/dd/yyyy or dd-mm-yyyy, dd/mm/yyyy
 */

const DateUtils = (() => {
  const REG_FORMAT = /([yMdhmsS])+/g;
  const handleTable = {
    f(all, val) {
      return all.length > 1 && val < 10 ? `0${val}` : val;
    },
    y(date, all) {
      return String(date.getFullYear()).substring(4 - all.length);
    },
    M(date, all) {
      return this.f(all, date.getMonth() + 1);
    },
    d(date, all) {
      return this.f(all, date.getDate());
    },
    h(date, all) {
      return this.f(all, date.getHours());
    },
    m(date, all) {
      return this.f(all, date.getMinutes());
    },
    s(date, all) {
      return this.f(all, date.getSeconds());
    },
    S(date) {
      return date.getMilliseconds();
    }
  };

  function format(time, formatter) {
    const date = new Date(time);

    return formatter.replace(REG_FORMAT, (all, ch) => handleTable[ch](date, all));
  }

  return {
    format
  };
})();

const now = Date.now();
const formats = ['yyyy-MM-dd', 'yy-M-d', 'MM-dd-yyyy', 'MM/dd/yyyy', 'dd-MM-yyyy',
  'dd/MM/yyyy', 'hh:mm:ss.S'];
formats.forEach(v => {
  console.log(DateUtils.format(now, v));
});

