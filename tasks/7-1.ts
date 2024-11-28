import { input } from "../src/inputManager";

let sum = 0;
for (const line of input.split("\n")) {
	let bracket = false;
	let valid = false;
	for (let i = 0; i < line.length - 3; i++) {
		const curr = line[i];
		if (curr === "[") bracket = true;
		if (curr === "]") bracket = false;
		if (["[", "]"].includes(curr)) continue;

		if (curr === line[i + 3] && line[i + 1] === line[i + 2] && curr !== line[i + 1]) {
			if (bracket) {
				valid = false;
				break;
			}
			valid = true;
		}
	}
	if (valid) sum++;
}
console.log(sum);
