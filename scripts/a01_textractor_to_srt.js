
import TextractorToSrt from "../public/node_modules/vn-translation-tools/backend/TextractorToSrt.js";
import { RECORDING_LOCATIONS } from "../backend/assets_index.js";

const main = async () => {
    for (const chapterDir of RECORDING_LOCATIONS) {
        await TextractorToSrt({ chapterDir });
    }
};

main().catch(exc => {
    console.error(exc);
    process.exit(1);
});
