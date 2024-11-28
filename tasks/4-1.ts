import { input } from "../src/inputManager";

let sum = 0;
for (const line of input.split("\n")) {
	const [_, letters, id, checksum] = /([\w-]+)-(\d+)\[(\w{5})\]/.exec(line)!;
	const letterTrack: Record<string, number> = {};
	for (const char of letters) {
		if (char === "-") continue;
		letterTrack[char] = (letterTrack[char] ?? 0) + 1;
	}

	const check = Object.entries(letterTrack)
		.toSorted(([ak, av], [bk, bv]) => (av !== bv ? bv - av : ak > bk ? 1 : -1))
		.slice(0, 5)
		.map((v) => v[0])
		.join("");
	if (check === checksum) sum += Number(id);
}
console.log(sum);
