import { input } from "../src/inputManager";

const elves = Number(input);
const hasGifts = new Set(Array.from({ length: elves }, (_, idx) => idx));

for (let i = 0; hasGifts.size > 1; i = (i + 1) % elves) {
	if (!hasGifts.has(i)) continue;
	hasGifts.delete(getNext(i));
}

console.log(hasGifts.keys().next().value! + 1);

function getNext(e: number) {
	for (let i = (e + 1) % elves; true; i = (i + 1) % elves) if (hasGifts.has(i)) return i;
}
