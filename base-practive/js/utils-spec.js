(function () {
	// 测试用例：
	var srcObj = {
		a: 1,
		b: {
			b1: ["hello", "hi"],
			b2: "JavaScript",
			b3: new Date()
		}
	};
	var abObj = srcObj;
	var tarObj = cloneObject(true, srcObj);
	var jqueryObj = $.extend(true, {}, srcObj);

	srcObj.a = 2;
	srcObj.b.b1[0] = "Hello";

	console.log(abObj.a);
	console.log(abObj.b.b1[0]);

	console.log(tarObj.a);      // 1
	console.log(tarObj.b.b1[0]);    // "hello"
	console.log(tarObj.b.b3);
	console.log(tarObj.b.b3 === abObj.b.b3);
	
	// 使用示例
	var a = [new String(5), new Number(5)];
	var b = uniqArray(a);
	console.log(b); // [1, 3, 5, 7]
	
	//simpleTrim
	var str = '			  ab c 			 ';
	console.log('simpleTrim', '|||||' + simpleTrim(str) + '|||||');
	
	
	// 使用示例
	var str = '     hi! 　　		   ';
	str = trim(str);
	console.log('trim', '||||' + str + '||||'); // 'hi!'
	
	// 使用示例
	var arr = ['java', 'c', 'php', 'html'];
	function output(item) {
		console.log(item)
	}
	each(arr, output);  // java, c, php, html
	
	// 使用示例
	var arr = ['java', 'c', 'php', 'html'];
	function output1(item, index) {
		console.log(index + ': ' + item)
	}
	each(arr, output1);  // 0:java, 1:c, 2:php, 3:html
	
	//getObjectLength
	var obj = {
		a: 1,
		b: 2,
		c: {
			c1: 3,
			c2: 4
		}
	};
	console.log('getObjectLength',getObjectLength(obj)); // 3
	
})();