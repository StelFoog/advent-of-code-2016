import { input } from "../src/inputManager";

const nodes: { name: string; size: number; used: number; avail: number }[] = [];
for (const line of input.split("\n").slice(2)) {
	const [name, size, used, avail] = line.split(/\s+/);
	nodes.push({
		name,
		size: Number(size.slice(0, -1)),
		used: Number(used.slice(0, -1)),
		avail: Number(avail.slice(0, -1)),
	});
}

let sum = 0;
for (const a of nodes) {
	for (const b of nodes) {
		if (a.used && a.name !== b.name && a.used <= b.avail) sum++;
	}
}
console.log(sum);
