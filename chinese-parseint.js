const chinese_parseInt = (function(){
	const digits = [
		"0０零○〇洞",
		"1１一壹ㄧ弌么",
		"2２二貳贰弍兩两",
		"3３三參叁弎参叄",
		"4４四肆䦉刀",
		"5５五伍",
		"6６六陸陆",
		"7７七柒拐",
		"8８八捌杯",
		"9９九玖勾"
	];
	const tens = ["十拾什呀", "百佰", "千仟"];
	const exponents = ["萬万", "億亿", "兆", "京經经", "垓", "秭杼", "穰壤", "溝沟", "澗涧", "正", "載", "極"];

	const reDigit = new RegExp("^[" + digits.join("") + "]+$");
	const reTen = new RegExp("(^|[^" + digits.slice(1).join("") + "])[" + tens[0] + "]", "g");

	return str => {
		str = str.replace(/\s+/g, "").replace(reTen, "$1一十");
		// console.log(str);
		let result = 0, buffer = 0, digit = 0, pos;

		let sign = 1;
		if("負负".includes(str.charAt(0))) sign = -1;
		if("正負负".includes(str.charAt(0))) str = str.substring(1);

		if(reDigit.test(str)) {
			for(let c of str)
				result = result * 10 + digits.findIndex(dc => dc.includes(c));
			return result;
		}

		for(let c of str) {
			pos = digits.findIndex(dc => dc.includes(c));
			if(pos !== -1) {
				digit = digit * 10 + pos;
				continue;
			}
			pos = tens.findIndex(tc => tc.includes(c));
			if(pos !== -1) {
				buffer += digit * 10 ** (pos + 1);
				digit = 0;
				continue;
			}
			pos = exponents.findIndex(ec => ec.includes(c));
			if(pos !== -1) {
				buffer += digit;
				if(pos <= 2) result += buffer * 10 ** (4 * (pos + 1));
				else result = BigInt(result) + BigInt(buffer) * 10n ** (4n * (BigInt(pos) + 1n));
				buffer = digit = 0;
				continue;
			}
			return NaN;
		}
		// console.log(result, buffer, digit);
		if(typeof result !== "bigint") {
			result += buffer + digit;
			if(sign === -1) result *= -1;
		}
		else {
			result += BigInt(buffer + digit);
			if(sign === -1) result *= -1n;
		}
		return result;
	};
})();

if(typeof module === 'object') module.exports = chinese_parseInt;
