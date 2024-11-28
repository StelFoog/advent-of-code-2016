import { input } from "../src/inputManager";

const hasher = new Bun.CryptoHasher("md5");

let password = " ".repeat(8).split("");
for (let i = 0; true; i++) {
	const res = hasher.update(`${input}${i}`).digest("hex");
	if (!res.startsWith("00000")) continue;
	const pos = Number(res[5]);
	if (!(pos >= 0 && pos < 8) || password[pos] !== " ") continue;
	password[pos] = res[6];
	if (password.every((v) => v !== " ")) break;
}

console.log(password.join(""));
