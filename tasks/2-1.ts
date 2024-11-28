import { input } from "../src/inputManager";

const keypad = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
];

const pos = { x: 1, y: 1 };
const keys: number[] = [];

for (const line of input.split("\n")) {
	for (const d of line) {
		if (d === "U" && pos.y > 0) pos.y--;
		if (d === "D" && pos.y < 2) pos.y++;
		if (d === "R" && pos.x < 2) pos.x++;
		if (d === "L" && pos.x > 0) pos.x--;
	}
	keys.push(keypad[pos.y][pos.x]);
}

console.log(keys.join(""));
