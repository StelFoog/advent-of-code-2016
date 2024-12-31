import elf, { Coordinate2D } from "elf-help";
import { input } from "../src/inputManager";

let empty: Coordinate2D;
let maxUse: number | null = null;
const map: boolean[][] = [];
for (const line of input.split("\n").slice(2)) {
	const [x, y, size, used] = elf.parseNumbers(line, { alsoSplitOn: ["-", "x", "y", "T"] });
	if (maxUse === null) maxUse = size * 2;
	if (!map[y]) map[y] = [];
	if (used === 0) empty = { x, y };
	map[y][x] = size < maxUse;
}

const width = map[0].length;
const [tx, ty] = [width - 1, 0];
const prev = elf.multiMap<number, [number, number]>(2);
const q = elf.orderedQueue<Coordinate2D & { steps: number }>(
	(c) => c.steps + Math.abs(tx - c.x) + Math.abs(ty - c.y)
);
q.add({ ...empty!, steps: 0 });
let dist = 0;
while (q.length) {
	const { x, y, steps } = q.dequeue()!;
	const p = prev.get(x, y);
	if (p !== undefined && p <= steps) continue;

	prev.set([x, y], steps);
	if (tx === x && ty === y) {
		dist = steps;
		break;
	}
	if (map[y][x - 1]) q.add({ x: x - 1, y, steps: steps + 1 });
	if (map[y][x + 1]) q.add({ x: x + 1, y, steps: steps + 1 });
	if (map[y - 1]?.[x]) q.add({ x, y: y - 1, steps: steps + 1 });
	if (map[y + 1]?.[x]) q.add({ x, y: y + 1, steps: steps + 1 });
}

console.log(dist + (width - 2) * 5);
