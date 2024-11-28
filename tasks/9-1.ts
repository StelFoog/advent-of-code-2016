import elf from "elf-help";
import { input } from "../src/inputManager";

let res = "";
for (let i = 0; i < input.length; i++) {
	const curr = input[i];
	if (curr !== "(") {
		res += curr;
		continue;
	}

	const size = input.slice(i + 1).indexOf(")");
	const [len, times] = elf.parseNumbers(input.slice(i + 1, i + 1 + size), { alsoSplitOn: "x" });
	res += input.slice(i + 2 + size, i + 2 + size + len).repeat(times);
	i += 1 + size + len;
}
console.log(res.length);
