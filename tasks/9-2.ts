import elf from "elf-help";
import { input } from "../src/inputManager";

console.log(getLength(input));

function getLength(content: string) {
	let length = 0;
	for (let i = 0; i < content.length; i++) {
		const curr = content[i];
		if (curr !== "(") {
			length++;
			continue;
		}

		const size = content.slice(i + 1).indexOf(")");
		const [len, times] = elf.parseNumbers(content.slice(i + 1, i + 1 + size), { alsoSplitOn: "x" });
		length += getLength(content.slice(i + 2 + size, i + 2 + size + len)) * times;

		i += 1 + size + len;
	}

	return length;
}
