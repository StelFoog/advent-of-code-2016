import { input } from "../src/inputManager";

const traps = [input.split("").map((v) => v === "^")];

for (let i = 1; i < 400_000; i++) {
	traps[i] = [];
	for (let j = 0; j < traps[i - 1].length; j++) traps[i][j] = isTrap(j, i);
}

let sum = 0;
for (const row of traps) for (const space of row) if (!space) sum++;
console.log(sum);

function isTrap(x: number, y: number) {
	const prev = traps[y - 1];
	const left = prev[x - 1] ?? false;
	const center = prev[x] ?? false;
	const right = prev[x + 1] ?? false;

	return (
		(left && center && !right) ||
		(!left && center && right) ||
		(left && !center && !right) ||
		(!left && !center && right)
	);
}
