import elf from "elf-help";
import { input } from "../src/inputManager";

let sum = 0;
let edges = input.split("\n").map((v) => elf.parseNumbers(v));
for (let i = 0; i < edges.length; i += 3) {
	for (let j = 0; j < 3; j++) sum += isValidTriangle(edges[i][j], edges[i + 1][j], edges[i + 2][j]);
}
console.log(sum);

function isValidTriangle(...edges: number[]) {
	let valid = 1;
	for (const sides of elf.permutations(edges)) {
		if (sides[0] + sides[1] <= sides[2]) valid = 0;
	}
	return valid;
}
