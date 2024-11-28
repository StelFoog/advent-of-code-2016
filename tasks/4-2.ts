import { input } from "../src/inputManager";

const aCode = "a".charCodeAt(0);
const zCode = "z".charCodeAt(0);
const rotateCode = zCode - aCode + 1;

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
	if (check !== checksum) continue;

	const nameTrack = letters.split("").map((v) => v.charCodeAt(0) - aCode);
	for (let i = 0; i < nameTrack.length; i++) {
		if (nameTrack[i] < 0) continue;
		nameTrack[i] = (nameTrack[i] + Number(id)) % rotateCode;
	}
	const name = nameTrack.map((v) => (v < 0 ? " " : String.fromCharCode(v + aCode))).join("");
	if (name.includes("north")) {
		console.log(id);
		process.exit(0);
	}
}
