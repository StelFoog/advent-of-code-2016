import { input } from "../src/inputManager";

let sum = 0;
for (const line of input.split("\n")) {
	let bracket = false;

	let outside: string[] = [];
	let inside: string[] = [];
	for (let i = 0; i < line.length - 2; i++) {
		const curr = line[i];
		if (curr === "[") bracket = true;
		if (curr === "]") bracket = false;
		if (["[", "]"].includes(curr)) continue;

		if (curr === line[i + 2] && curr !== line[i + 1]) {
			if (bracket) inside.push(line.slice(i, i + 3));
			else outside.push(line.slice(i, i + 3));
		}
	}
	if (outside.some((o) => inside.some((i) => o[0] === i[1] && o[1] === i[0]))) sum++;
}
console.log(sum);
