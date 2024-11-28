import { input } from "../src/inputManager";

let x = 0;
let y = 0;
let direction: "N" | "W" | "S" | "E" = "N";
for (const inst of input.split(", ")) {
	const dir = inst[0];
	const dist = Number(inst.slice(1));
	if (direction === "N") direction = dir === "R" ? "E" : "W";
	else if (direction === "W") direction = dir === "R" ? "N" : "S";
	else if (direction === "S") direction = dir === "R" ? "W" : "E";
	else if (direction === "E") direction = dir === "R" ? "S" : "N";

	if (direction === "N") y += dist;
	if (direction === "S") y -= dist;
	if (direction === "W") x += dist;
	if (direction === "E") x -= dist;
}

console.log(Math.abs(x) + Math.abs(y));
