import { input } from "../src/inputManager";

const hasher = new Bun.CryptoHasher("md5");

let password = "";
for (let i = 0; true; i++) {
	const res = hasher.update(`${input}${i}`).digest("hex");
	if (!res.startsWith("00000")) continue;
	password += res[5];
	if (password.length === 8) break;
}

console.log(password);
