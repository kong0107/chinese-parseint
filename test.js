var cpi = require('./chinese-parseint');

var units = [
	['哈哈', NaN],
	['零五', 5],
	["十", 10],
	["二十", 20],
	["一千十九", 1019],
	["一千零十九", 1019],
	["一千零一十九", 1019],
	["一千一十九", 1019],
	['六　八　九', 689],
	['洞么兩三刀伍陸拐杯勾', 123456789],
	['四億五千萬', 450000000],
	['負兩兆', -2000000000000],
	['正五京三', 50000000000000003n],
	['六八九萬', 6890000],
	['負一千零一十', -1010],
	// ['二十四萬二', 242000],
	// ['二百五', 250],
	// ['千三', 1300],
	// ['四萬萬五千萬', 450000000]
];

var result = units.reduce(function(prev, cur) {
	const ret = cpi(cur[0]);
	const test = ret === cur[1] || (isNaN(ret) && isNaN(cur[1]));
	console.log(`cpi("${cur[0]}") retruns ${ret} `, test ? "right" : "WRONG");
	return (test && prev);
}, true);

console.log("Test %s.", result ? 'succeeds' : 'fails');
