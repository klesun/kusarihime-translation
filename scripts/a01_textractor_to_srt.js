
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import TextractorToSrt from "../public/node_modules/vn-translation-tools/backend/TextractorToSrt.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const chapterDirs = [
    __dirname + '/../public/assets/lap1/loop1',
    __dirname + '/../public/assets/lap1/loop2',
    __dirname + '/../public/assets/lap1/loop3',
    __dirname + '/../public/assets/lap1/loop4',
    __dirname + '/../public/assets/lap1/loop5',
    __dirname + '/../public/assets/lap1/loop6',
    __dirname + '/../public/assets/lap1/loop7',
];

const main = async () => {
    for (const chapterDir of chapterDirs) {
        await TextractorToSrt({ chapterDir });
    }
};

main().catch(exc => {
    console.error(exc);
    process.exit(1);
});
