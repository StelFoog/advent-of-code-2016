import { input } from "../src/inputManager";

const LEN = 272;
let res = input;
while (res.length < LEN) {
	let tmp = "";
	for (let i = res.length - 1; i >= 0; i--) res[i] === "1" ? (tmp += "0") : (tmp += "1");
	res += "0" + tmp;
}

let checksum = res.slice(0, LEN);
do {
	let tmp = "";
	for (let i = 0; i < checksum.length; i += 2) {
		if (checksum.slice(i, i + 2).match(/(.)\1/)) tmp += "1";
		else tmp += "0";
	}
	checksum = tmp;
} while (checksum.length % 2 === 0);
console.log(checksum);
