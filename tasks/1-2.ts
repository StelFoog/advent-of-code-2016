import { input } from "../src/inputManager";

let x = 0;
let y = 0;
let direction: "N" | "W" | "S" | "E" = "N";
const visited = new Set(["0,0"]);
for (const inst of input.split(", ")) {
	const dir = inst[0];
	const dist = Number(inst.slice(1));
	if (direction === "N") direction = dir === "R" ? "E" : "W";
	else if (direction === "W") direction = dir === "R" ? "N" : "S";
	else if (direction === "S") direction = dir === "R" ? "W" : "E";
	else if (direction === "E") direction = dir === "R" ? "S" : "N";

	for (let i = 0; i < dist; i++) {
		if (direction === "N") y++;
		if (direction === "S") y--;
		if (direction === "W") x++;
		if (direction === "E") x--;

		const pos = `${x},${y}`;
		if (visited.has(pos)) {
			console.log(Math.abs(x) + Math.abs(y));
			process.exit(0);
		}
		visited.add(pos);
	}
}
