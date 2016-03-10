function jsonP(url, settings) {
  'use strict';

  return new Promise((resolve, reject) => {
    let callbackId = -1;
    const jsonpCallback = settings.callback;

    if (!jsonP.seed) {
      callbackId = jsonP.seed = 1;
    } else {
      callbackId = ++jsonP.seed;
    }

    if (!jsonP.callbacks) {
      jsonP.callbacks = {};
    }
    const callbackName = `callback_${callbackId}`
    jsonP.callbacks[callbackName] = function (data) {
      jsonpCallback && jsonpCallback(data);
      jsonP.callbacks[callbackName].data = data;
      jsonP.callbacks[callbackName].isCalled = true;
    }

    const data = Object.assign({}, { jsoncallback: `jsonP.callbacks.${callbackName}` }, settings.data || {});

    const params = Object.keys(data).map((k) => {
      const value = data[k];
      if (value || (typeof value === 'number' && value === value) || value === '') {
        return `${encodeURIComponent(k)}=${encodeURIComponent(value)}`
      } else {
        return `${encodeURIComponent(k)}`;
      }
    }).join('&');

    url = url + (url.indexOf('?') !== -1 ? '&' : '?') + params;

    function jsonpReq(url) {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;

      function cb(e) {
       
        const handle = jsonP.callbacks[callbackName]
        if (e.type === 'load' && handle.isCalled) {
          resolve(handle.data);
        } else {
          reject('error');
        }
        delete jsonP.callbacks[callbackName];
        document.body.removeChild(script);
        console.log(jsonP.callbacks);
      }

      script.addEventListener('load', cb, false);
      script.addEventListener('error', cb, false);

      document.body.appendChild(script);

    }
    
    jsonpReq(url);
  });

}
