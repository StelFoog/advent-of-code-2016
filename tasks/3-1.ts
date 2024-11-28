import elf from "elf-help";
import { input } from "../src/inputManager";

let sum = 0;
for (const line of input.split("\n")) {
	let valid = true;
	for (const sides of elf.permutations(elf.parseNumbers(line))) {
		if (sides[0] + sides[1] <= sides[2]) valid = false;
	}
	if (valid) sum++;
}

console.log(sum);
