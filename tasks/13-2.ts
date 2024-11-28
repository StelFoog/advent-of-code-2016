import elf from "elf-help";
import { input } from "../src/inputManager";

const fav = Number(input);

const prev = new Set<string>();
const queue: { x: number; y: number; s: number }[] = [{ ...elf.coord(1, 1), s: 0 }];
while (queue.length) {
	const { x, y, s } = queue.shift()!;
	addSpot(x - 1, y, s);
	addSpot(x + 1, y, s);
	addSpot(x, y - 1, s);
	addSpot(x, y + 1, s);
}
console.log(prev.size);

function isWall(x: number, y: number) {
	let ones = 0;
	let val = x * x + 3 * x + 2 * x * y + y + y * y + fav;
	for (const char of val.toString(2)) if (char === "1") ones++;

	return ones % 2 === 1;
}

function addSpot(x: number, y: number, s: number) {
	if (x < 0 || y < 0 || isWall(x, y) || s >= 50) return;
	const str = `${x},${y}`;
	if (prev.has(str)) return;
	prev.add(str);
	queue.push({ x, y, s: s + 1 });
}
