
import fetch from "node-fetch";
import { RECORDING_LOCATIONS, getSourceSrt } from "../backend/assets_index.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { promises as fs } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));


// const ololo = await fetch("https://google.com").then(rs => rs.text());
//
// console.log(ololo);

const jpnLinesPath = __dirname + "/../public/assets/lap1/loop1/jpnLines_preserved_pronunciations.txt";

const main = async () => {
    const jphLinesTxt = await fs.readFile(jpnLinesPath, "utf8");
    for (const jpnLine of jphLinesTxt.split("\n")) {
        const cleanSentence = jpnLine.replace(/^【.*?】/, "").replace(/。$/, "");
        const prefix = jpnLine.slice(0, -cleanSentence.length);

        const { translations } = await fetch("https://api-free.deepl.com/v2/translate", {
            headers: { "content-type": "application/x-www-form-urlencoded" },
            method: "POST",
            body: new URLSearchParams({
                auth_key: "34897fe9-ef7a-2206-bc35-b1b39d2dcb82:fx",
                text: cleanSentence,
                target_lang: "EN-US",
            }).toString(),
        }).then(rs => rs.json());

        if (translations.length !== 1) {
            console.log("ololo translations " + jpnLine, translations);
        }

        const translated = prefix + translations[0].text;
        console.log(JSON.stringify({jpnLine, translated}));
    }
};

await main();
