import { input } from "../src/inputManager";

type Dir = "U" | "D" | "L" | "R";

const hasher = new Bun.CryptoHasher("md5");

let queue: { x: number; y: number; path: string }[] = [{ x: 0, y: 0, path: "" }];
let max = 0;
while (queue.length) {
	const { x, y, path } = queue.shift()!;
	if (x === 3 && y === 3) {
		max = path.length;
		continue;
	}
	const { U, D, L, R } = openDoors(x, y, path);
	if (U) queue.push({ x, y: y - 1, path: path + "U" });
	if (D) queue.push({ x, y: y + 1, path: path + "D" });
	if (L) queue.push({ x: x - 1, y, path: path + "L" });
	if (R) queue.push({ x: x + 1, y, path: path + "R" });
}
console.log(max);

function openDoors(x: number, y: number, path: string): Record<Dir, boolean> {
	const hash = hasher.update(`${input}${path}`).digest("hex");

	return {
		U: y - 1 >= 0 && "bcedf".includes(hash[0]),
		D: y + 1 < 4 && "bcedf".includes(hash[1]),
		L: x - 1 >= 0 && "bcedf".includes(hash[2]),
		R: x + 1 < 4 && "bcedf".includes(hash[3]),
	};
	// return "bcedf".includes(hash[dir === "U" ? 0 : dir === "D" ? 1 : dir === "L" ? 2 : 3]);
}
