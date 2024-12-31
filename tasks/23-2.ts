// Very slow, takes about a minute to complete on my system. But it does complete with the correct
// answer so I'll let it be. Maybe I'll return and implement based on the provided hint sometime.

import { input } from "../src/inputManager";

let regs = { a: 12, b: 0, c: 1, d: 0 };
type Instruction =
	| { op: "inc" | "dec" | "tgl"; x: keyof typeof regs; y?: undefined }
	| { op: "cpy" | "jnz"; x: string; y: number | keyof typeof regs };

const instructions = input.split("\n").map<Instruction>((line) => {
	const splt = line.split(" ");
	if (splt.length === 2) return { op: splt[0] as "inc", x: splt[1] as keyof typeof regs };
	if (splt[0] === "jnz")
		return {
			op: splt[0] as "jnz",
			x: splt[1],
			y: Number.isInteger(Number(splt[2])) ? Number(splt[2]) : (splt[2] as keyof typeof regs),
		};
	return { op: splt[0] as "cpy", x: splt[1], y: splt[2] as keyof typeof regs };
});

for (let i = 0; i >= 0 && i < instructions.length; i++) {
	const inst = instructions[i];
	if (inst.op === "cpy" && typeof inst.y !== "number") regs[inst.y] = val(inst.x);
	else if (inst.op === "inc") regs[inst.x]++;
	else if (inst.op === "dec") regs[inst.x]--;
	else if (inst.op === "jnz" && val(inst.x) !== 0) i += val(inst.y) - 1;
	else if (inst.op === "tgl") {
		const tglIdx = i + val(inst.x);
		const { op, y } = instructions[tglIdx] ?? {};
		if (!op) continue;

		if (y === undefined) {
			if (op === "inc") instructions[tglIdx].op = "dec";
			else instructions[tglIdx].op = "inc";
		} else {
			if (op === "jnz") instructions[tglIdx].op = "cpy";
			else instructions[tglIdx].op = "jnz";
		}
	}
}
console.log(regs.a);

function val(x: string | number) {
	const num = Number(x);
	return Number.isInteger(num) ? num : regs[x as "a"];
}
