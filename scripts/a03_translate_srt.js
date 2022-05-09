
import { promises as fs } from 'fs';
import { joinSrtBlockParts } from "../public/node_modules/vn-translation-tools/public/modules/SrtUtils.js";
import { RECORDING_LOCATIONS, getTranslatedSrt } from "../backend/assets_index.js";

const translateAt = async (chapterDir) => {
    const outSrtPath = chapterDir + '/game_recording.eng.srt';
    const translatedSrtBlocks = await getTranslatedSrt(chapterDir);

    const translatedSrt = translatedSrtBlocks
        .map(joinSrtBlockParts)
        .join('\n\n');

    await fs.writeFile(outSrtPath, translatedSrt);
};

const main = async () => {
    for (const chapterDir of RECORDING_LOCATIONS) {
        await translateAt(chapterDir);
    }
};

main().catch(exc => {
    console.error(exc);
    process.exit(1);
});
