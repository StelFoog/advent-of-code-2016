import { input } from "../src/inputManager";

let regs = { a: 0, b: 0, c: 0, d: 0 };
type Instruction =
	| { op: "cpy"; x: string; y: keyof typeof regs }
	| { op: "inc" | "dec"; x: keyof typeof regs }
	| { op: "jnz"; x: string; y: number };

const instructions = input.split("\n").map<Instruction>((line) => {
	const splt = line.split(" ");
	if (splt.length === 2) return { op: splt[0] as "inc", x: splt[1] as keyof typeof regs };
	if (splt[0] === "jnz") return { op: splt[0] as "jnz", x: splt[1], y: Number(splt[2]) };
	return { op: splt[0] as "cpy", x: splt[1], y: splt[2] as keyof typeof regs };
});

for (let i = 0; i >= 0 && i < instructions.length; i++) {
	const inst = instructions[i];
	if (inst.op === "cpy") regs[inst.y] = val(inst.x);
	if (inst.op === "inc") regs[inst.x]++;
	if (inst.op === "dec") regs[inst.x]--;
	if (inst.op === "jnz" && val(inst.x) !== 0) i += inst.y - 1;
}
console.log(regs.a);

function val(x: string) {
	const num = Number(x);
	return Number.isInteger(num) ? num : regs[x as "a"];
}
