import { input } from "../src/inputManager";
import elf, { Range } from "elf-help";

const ranges: Range[] = [];
for (const line of input.split("\n")) {
	const [start, end] = elf.parseNumbers(line, { alsoSplitOn: "-" });
	ranges.push(elf.range(start, end));
}
ranges.sort((a, b) => a.start - b.start);

let i = 0;
while (true) {
	const range = ranges.find((r) => r.contains(i));
	if (!range) break;
	i = range.end + 1;
}
console.log(i);
