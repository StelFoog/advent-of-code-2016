import elf from "elf-help";
import { input } from "../src/inputManager";

const bots: Record<number, number[]> = {};
const instructions: Record<number, [number, number]> = {};
const queue: number[] = [];

for (const line of input.split("\n")) {
	const nums = elf.parseNumbers(line);
	if (nums.length === 2) {
		defineBot(nums[1]);
		bots[nums[1]].push(nums[0]);
		if (bots[nums[1]].length === 2) queue.push(nums[1]);
		continue;
	}

	const [, , , , , toLow, , , , , toHigh] = line.split(" ");
	if (toLow === "output") nums[1] = nums[1] * -1 - 1;
	if (toHigh === "output") nums[2] = nums[2] * -1 - 1;
	defineBot(nums[0]);
	defineBot(nums[1]);
	defineBot(nums[2]);
	instructions[nums[0]] = [nums[1], nums[2]];
}

while (queue.length) {
	const curr = queue.shift()!;
	if (curr < 0) continue;
	const [lo, hi] = [bots[curr].shift()!, bots[curr].shift()!].toSorted((a, b) => a - b);

	const [toLo, toHi] = instructions[curr];
	bots[toLo].push(lo);
	bots[toHi].push(hi);
	if (bots[toLo].length === 2) queue.push(toLo);
	if (bots[toHi].length === 2) queue.push(toHi);
}

const res = Object.entries(bots)
	.filter(([key]) => Number(key) < 0)
	.map<[number, number]>(([k, v]) => [Number(k) * -1 - 1, v[0]]);

console.log(
	res.find(([k]) => k === 0)![1] * res.find(([k]) => k === 1)![1] * res.find(([k]) => k === 2)![1]
);

function defineBot(num: number) {
	if (bots[num]) return;
	bots[num] = [];
}
