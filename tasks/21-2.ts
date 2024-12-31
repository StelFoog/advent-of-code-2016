import elf from "elf-help";
import { input } from "../src/inputManager";

// SIMPLE SLOW BRUTE FORCE SOLUTION
const target = "fbgdceah";

for (const p of elf.permutations(Array.from(target))) {
	let password = Array.from(p);
	for (const line of input.split("\n")) {
		if (line.startsWith("swap position")) {
			const [x, y] = elf.parseNumbers(line);
			swap(x, y);
		} else if (line.startsWith("swap letter")) {
			const [x, y] = line
				.split(" ")
				.filter((w) => w.length === 1)
				.map((l) => password.findIndex((x) => x === l));
			swap(x, y);
		} else if (line.startsWith("rotate left")) {
			password = elf.rotate(password, -elf.parseNumbers(line)[0]);
		} else if (line.startsWith("rotate right")) {
			password = elf.rotate(password, elf.parseNumbers(line)[0]);
		} else if (line.startsWith("rotate based on")) {
			const idx = password.findIndex((v) => v === line.split(" ")[6]);
			password = elf.rotate(password, idx + (idx >= 4 ? 2 : 1));
		} else if (line.startsWith("reverse positions")) {
			const [x, y] = elf.parseNumbers(line);
			const reversed = password.slice(x, y + 1).toReversed();
			password = [...password.slice(0, x), ...reversed, ...password.slice(y + 1)];
		} else if (line.startsWith("move position")) {
			const [x, y] = elf.parseNumbers(line);
			const letter = password[x];
			const temp = [...password.slice(0, x), ...password.slice(x + 1)];
			password = [...temp.slice(0, y), letter, ...temp.slice(y)];
		}
	}
	if (password.join("") === target) {
		console.log(p.join(""));
		break;
	}

	function swap(x: number, y: number) {
		let temp = password[x];
		password[x] = password[y];
		password[y] = temp;
	}
}
