import { input } from "../src/inputManager";

const common: Record<string, number>[] = Array.from(input.split("\n")[0], () => ({}));
for (const line of input.split("\n")) {
	for (let i = 0; i < common.length; i++) {
		common[i][line[i]] = (common[i][line[i]] ?? 0) + 1;
	}
}

console.log(
	common.map((col) => Object.entries(col).toSorted(([, av], [, bv]) => bv - av)[0][0]).join("")
);
