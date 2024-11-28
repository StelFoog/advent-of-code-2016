// Slow, but works so not worth optimizing more

import elf from "elf-help";
import { input } from "../src/inputManager";

const floors = input.split("\n").map((line, idx) => {
	const splt = line.split(/[\s.,]/);
	const content: string[] = [];
	for (let i = 0; i < splt.length; i++) {
		if (splt[i + 1] === "generator") content.push("g-" + splt[i]);
		if (splt[i + 1] === "microchip") content.push("m-" + splt[i].split("-")[0]);
	}
	if (idx === 0) content.push("g-elerium", "m-elerium", "g-dilithium", "m-dilithium");
	return content;
});

const prev: Record<string, boolean> = {};
const queue: { steps: number; elevator: number; floors: typeof floors }[] = [
	{ steps: 0, elevator: 0, floors },
];
getSetState(0, floors);
let min = Number.MAX_SAFE_INTEGER;
while (queue.length) {
	const { steps, elevator, floors } = queue.shift()!;
	if (steps > min) continue;
	if (!floors[0].length && !floors[1].length && !floors[2].length) {
		min = steps;
		continue;
	}

	const floor = floors[elevator];
	const options: string[][] = [];
	elf.combinations(floor, 1).forEach((opt) => {
		if (isValidFloor(floor.filter((v) => !opt.includes(v)))) options.push(opt);
	});
	if (floor.length > 1) {
		elf.combinations(floor, 2).forEach((opt) => {
			if (isValidFloor(floor.filter((v) => !opt.includes(v)))) options.push(opt);
		});
	}

	if (elevator > 0) {
		options.forEach((opt) => {
			const oldFloor = floor.filter((v) => !opt.includes(v));
			const newFloor = [...floors[elevator - 1], ...opt];
			if (!isValidFloor(newFloor)) return;
			const newFloors = floors.map((v, idx) =>
				idx === elevator ? oldFloor : idx === elevator - 1 ? newFloor : v.map((v) => v)
			);
			if (getSetState(elevator - 1, newFloors)) return;
			queue.push({ steps: steps + 1, elevator: elevator - 1, floors: newFloors });
		});
	}
	if (elevator < 3) {
		options.forEach((opt) => {
			const oldFloor = floor.filter((v) => !opt.includes(v));
			const newFloor = [...floors[elevator + 1], ...opt];
			if (!isValidFloor(newFloor)) return;
			const newFloors = floors.map((v, idx) =>
				idx === elevator ? oldFloor : idx === elevator + 1 ? newFloor : v.map((v) => v)
			);
			if (getSetState(elevator + 1, newFloors)) return;
			queue.push({ steps: steps + 1, elevator: elevator + 1, floors: newFloors });
		});
	}
}
console.log(min);

function isValidFloor(floor: string[]) {
	let invalid: string[] = [];
	let hasAnyGenerator = false;
	for (const c of floor) {
		if (c.startsWith("g-")) hasAnyGenerator = true;
		const found = invalid.findIndex((v) => c.slice(2) === v.slice(2));
		if (found !== -1) invalid = invalid.slice(0, found).concat(invalid.slice(found + 1));
		else invalid.push(c);
	}

	return !(hasAnyGenerator && invalid.some((v) => !v.startsWith("g-")));
}

function getSetState(elevator: number, floors: string[][]) {
	const state = JSON.stringify({
		elevator,
		floors: floors.map((v) => {
			const filtered: typeof v = [];
			v.forEach((c) => {
				if (c.startsWith("m-") && !v.includes(`g-${c.slice(2)}`)) filtered.push(c);
				if (c.startsWith("g-") && !v.includes(`m-${c.slice(2)}`)) filtered.push(c);
			});
			return [
				...filtered.toSorted(),
				...Array.from({ length: (v.length - filtered.length) / 2 }, () => "p"),
			];
		}),
	});
	if (prev[state]) return true;
	prev[state] = true;
	return false;
}
