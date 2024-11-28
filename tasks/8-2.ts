import elf from "elf-help";
import { input } from "../src/inputManager";

const height = 6;
const width = 50;
// const height = 3;
// const width = 7;
const screen = Array.from({ length: height }, () => Array.from({ length: width }, () => false));

for (let line of input.split("\n")) {
	const [a, b] = elf.parseNumbers(line, { alsoSplitOn: ["x", "="] });
	// console.log({ a, b });
	if (line.startsWith("rect")) {
		for (let x = 0; x < a; x++) for (let y = 0; y < b; y++) screen[y][x] = true;
	} else if (line.startsWith("rotate row")) {
		screen[a] = elf.rotate(screen[a], b);
	} else if (line.startsWith("rotate column")) {
		const res = elf.rotate(
			screen.map((r) => r[a]),
			b
		);
		for (let i = 0; i < res.length; i++) {
			screen[i][a] = res[i];
		}
	}
}

printScreen();

function printScreen() {
	let res = "";
	screen.forEach((row) => {
		row.forEach((v, idx) => {
			res += v ? "#" : " ";
			if (idx && (idx + 1) % 5 === 0) res += " ";
		});
		res += "\n";
	});

	console.log(res);
}
