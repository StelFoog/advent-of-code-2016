import { input } from "../src/inputManager";

// FIND PATTERN OF WINNER
//
// for (let elves = 1; elves <= 100; elves++) {
// 	const hasGifts = new Set(Array.from({ length: elves }, (_, idx) => idx));
// 	for (let i = 0; hasGifts.size > 1; i = (i + 1) % elves) {
// 		if (!hasGifts.has(i)) continue;
// 		hasGifts.delete(getNext(hasGifts, i));
// 	}
// 	console.log(elves, "=>", hasGifts.keys().next().value! + 1);
// }
// function getNext(hasGifts: Set<number>, e: number) {
// 	const entries = Array.from(hasGifts);
// 	const ie = entries.findIndex((v) => v === e);

// 	return entries[(ie + Math.floor(entries.length / 2)) % entries.length];
// }

// When previous winner was last in circle, next winner will be the first in the circle
// Next winner will be previous winner + 1, unless the last winner was the last elf in the first
// half of the circle or later, in which case the next winner will be previous winner + 2
let prev = 1;
for (let i = 2; i <= Number(input); i++) {
	if (prev === i - 1) prev = 1;
	else if (prev < (i - 1) / 2) prev++;
	else prev += 2;
}
console.log(prev);
