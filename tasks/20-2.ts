import { input } from "../src/inputManager";
import elf, { Range } from "elf-help";

const ranges: Range[] = [];
for (const line of input.split("\n")) {
	const [start, end] = elf.parseNumbers(line, { alsoSplitOn: "-" });
	ranges.push(elf.range(start, end));
}
ranges.sort((a, b) => a.start - b.start);

let sum = 0;
for (let i = 0; i <= 4294967295; i++) {
	const range = ranges.find((r) => r.contains(i));
	if (!range) sum++;
	else i = range.end;
}
console.log(sum);
