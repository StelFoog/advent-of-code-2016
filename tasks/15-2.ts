import elf from "elf-help";
import { input } from "../src/inputManager";

const discs = input.split("\n").map((l) => elf.parseNumbers(l));
discs.push([11, 0]);

let i = 0;
for (; true; i++) {
	let valid = true;
	discs.forEach(([positions, start], idx) => {
		if ((start + i + idx + 1) % positions !== 0) valid = false;
	});
	if (valid) break;
}
console.log(i);
