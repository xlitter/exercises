(function (globals, undefined) {
	var toString = Object.prototype.toString,
		hasOwnProperty = Object.prototype.hasOwnProperty,
		types = "Boolean Number String Function Array Date RegExp Object Error".split(' '),
		class2type = {};

	types.forEach(function (v) {
		class2type["[object " + v + "]"] = v.toLowerCase();
	});

	function isArray(arr) {
		return (Array.isArray || function (a) {
			return toString.call(a) === '[object Array]';
		}).call(null, arr);
	}

	function isFunction(func) {
		return typeof func === 'function' || false;
	}

	function isObject(obj) {
		return typeof obj === 'function' || typeof obj === 'object' && !!obj;
	}
	function isPlainObject(obj) {
		if (type(obj) !== 'object') {
			return false;
		}
		return true;
	}
	function type(obj) {
		if (obj == null) {
			return object + '';
		}
		return typeof obj === 'object' || typeof obj === 'function' ? class2type[toString.call(obj)] || 'object' : typeof obj;
	}

	function cloneObject(deep, src) {
		var result, i, item;
		if (typeof deep !== 'boolean') {
			src = deep;
			deep = false;
		}
		if (!isObject(src)) return src;
		result = isArray(src) ? [] : {};

		for (i in src) {
			item = src[i];
			if (deep && (isPlainObject(item) || isArray(item))) {
				result[i] = cloneObject(deep, item);
			} else {
				result[i] = item;
			}
		}
		return result;
	}

	function uniqArray(arr) {
		var result = [], obj, i, len, item, key;
		if (!isArray(arr)) return arr;

		if (Set && Array.from) {
			result = Array.from(new Set(arr));
		} else {
			obj = {};
			for (i = 0, len = arr.length; i < len; i++) {
				item = arr[i];
				key = typeof item + item;
				if (!obj[key]) {
					result.push(item);
					obj[key] = true;
				}
				// if(result.indexOf(item) === -1) result.push(item);
			}
		}
		return result;
	}

	function simpleTrim(str) {
		var i, len;
		if (!typeof str === 'string') return str;
		for (i = 0, len = str.length; i < len; i++) {
			if (!(str[i] === ' ' || str[i] === '\t')) {
				break;
			}
		}
		str = str.slice(i);

		for (i = str.length - 1; i >= 0; i--) {
			if (!(str[i] === ' ' || str[i] === '\t')) {
				break;
			}
		}
		str = str.slice(0, i + 1);
		return str;
	}

	function trim(str) {
		if (!typeof str === 'string') return str;
		return str.replace(/^[^\S]*|[^\S]*$/g, '');
	}

	function each(arr, fn) {
		var i, len;
		if (!isArray(arr)) return arr;
		fn = fn || function () { };
		for (i = 0, len = arr.length; i < len; i++) {
			fn.call(null, arr[i], i);
		}
	}

	function getObjectLength(obj) {
		if (!isPlainObject(obj)) return obj;
		return (Object.keys || function (innerObj) {
			var result = [];
			for (var i in innerObj) {
				if (hasOwnProperty.call(innerObj, i)) {
					result.push(innerObj[i]);
				}
			}
			return result;
		})(obj).length;
	}

	function addClass(element, newClassName) {
		var oldClasses, i, len, flag = true;
		if (!(element && element.nodeType === 1)) {
			throw new Error('It is not Element node');
		}
		if(element.classList){
			element.classList.add(newClassName);
		} else {
			oldClasses = element.className.split(' ');
			for(i = 0, len = oldClasses.length; i < len; i++){
				if(oldClasses[i] === newClassName){
					flag = false;
					break;
				}
			}
			if(flag){
				element.className += newClassName;				
			}
		}
	}

	function removeClass(element, oldClassName) {
		var idx = -1, className;
		if(!(element&&element.nodeType === 1)) {
			throw new Error('It is not Element node');
		}
		className = element.className;
		idx = className.indexOf(oldClassName);
		if(idx !== -1){
			className.splice(idx , 1);
		}
	}
	
	function isSiblingNode(element, siblingNode){
		var parentNode;
		if(!(element&&element.nodeType === 1)){
			throw new Error('element is not Element node');
		}
		
		if(!(siblingNode&&siblingNode.nodeType === 1)){
			throw new Erro('siblingNode is not Element node ');
		}
	 	if(siblingNode.parentNode === element.parentNode){
			 return true;
		 } else {
			 return false;
		 }
 	}
	
	function getPosition(element){
		
	}

	globals.cloneObject = cloneObject;
	globals.uniqArray = uniqArray;
	globals.simpleTrim = simpleTrim;
	globals.trim = trim;
	globals.each = each;
	globals.getObjectLength = getObjectLength;
})(this);
