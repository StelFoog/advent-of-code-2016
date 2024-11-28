import { input } from "../src/inputManager";

const hasher = new Bun.CryptoHasher("md5");

let matches = 0;
const matched: { char: string; idx: number; matchedWith: number }[] = [];

let lim = Number.MAX_SAFE_INTEGER;
for (let i = 0; i < lim; i++) {
	const hash = hasher.update(`${input}${i}`).digest("hex");
	const threeMatch = /(.)\1\1/.exec(hash);
	if (!threeMatch) continue;

	for (let j = 0; j <= hash.length - 5; j++) {
		const curr = hash[j];
		if (hash.slice(j, j + 5) !== curr.repeat(5)) continue;
		for (const match of matched) {
			if (match.char !== curr || i - match.idx > 1000 || match.matchedWith) continue;
			matches++;
			match.matchedWith = i;
		}
	}
	if (matches >= 64 && lim === Number.MAX_SAFE_INTEGER) lim = i + 1_000;
	matched.push({ char: threeMatch[1], idx: i, matchedWith: 0 });
}
console.log(matched.filter((v) => v.matchedWith)[63].idx);
