import { input } from "../src/inputManager";

const keypad = [
	[" ", " ", "1", " ", " "],
	[" ", "2", "3", "4", " "],
	["5", "6", "7", "8", "9"],
	[" ", "A", "B", "C", " "],
	[" ", " ", "D", " ", " "],
];

const pos = { x: 0, y: 2 };
const keys: string[] = [];

for (const line of input.split("\n")) {
	for (const d of line) {
		if (d === "U" && validKey(pos.y - 1, pos.x)) pos.y--;
		if (d === "D" && validKey(pos.y + 1, pos.x)) pos.y++;
		if (d === "R" && validKey(pos.y, pos.x + 1)) pos.x++;
		if (d === "L" && validKey(pos.y, pos.x - 1)) pos.x--;
	}
	keys.push(key(pos.y, pos.x)!);
}

console.log(keys.join(""));

function key(y: number, x: number): string | null {
	return keypad[y]?.[x] ?? null;
}

function validKey(y: number, x: number): boolean {
	const val = key(y, x);
	return val !== null && val !== " ";
}
