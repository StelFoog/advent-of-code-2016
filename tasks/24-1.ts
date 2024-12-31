import elf, { Coordinate2D } from "elf-help";
import { input } from "../src/inputManager";

let start = elf.coord(0, 0);
const nodes: (Coordinate2D & { name: number })[] = [];

const map = input.split("\n").map((line, y) => {
	const row: boolean[] = [];
	for (const x of elf.range(0, line.length - 1)) {
		const curr = line[x];
		if (curr === "0") {
			start = elf.coord(x, y);
		} else if (curr.match(/\d/)) {
			nodes.push({ x, y, name: Number(curr) });
		}
		row.push(curr !== "#");
	}
	return row;
});

const dists = elf.multiMap<number, [number, number]>(2);
for (let i = 0; i < nodes.length; i++) {
	const a = nodes[i];
	const dist = getDist(start, a);
	dists.set([0, a.name], dist);

	for (let j = i + 1; j < nodes.length; j++) {
		const b = nodes[j];
		const dist = getDist(a, b);
		dists.set([a.name, b.name], dist);
		dists.set([b.name, a.name], dist);
	}
}

let min = Number.MAX_SAFE_INTEGER;
for (const path of elf.permutations(nodes.map((c) => c.name))) {
	let dist = dists.get(0, path[0])!;
	for (let i = 1; i < path.length; i++) dist += dists.get(path[i - 1], path[i])!;
	if (dist < min) min = dist;
}
console.log(min);

function getDist(from: Coordinate2D, target: Coordinate2D): number {
	const prev = elf.multiMap<true, [number, number]>(2);
	const queue = elf.orderedQueue<Coordinate2D & { steps: number }>(
		(c) => c.steps + Math.abs(c.x - target.x) + Math.abs(c.y - target.y)
	);
	queue.add({ ...from, steps: 0 });
	while (queue.length) {
		const { x, y, steps } = queue.dequeue()!;
		if (x === target.x && y === target.y) return steps;
		if (prev.get(x, y)) continue;
		prev.set([x, y], true);

		if (map[y][x - 1]) queue.add({ x: x - 1, y: y, steps: steps + 1 });
		if (map[y][x + 1]) queue.add({ x: x + 1, y: y, steps: steps + 1 });
		if (map[y - 1][x]) queue.add({ x: x, y: y - 1, steps: steps + 1 });
		if (map[y + 1][x]) queue.add({ x: x, y: y + 1, steps: steps + 1 });
	}
	throw "Should never reach";
}
