import { dirname } from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";
import {parseSentenceTranslationsFile, parseSrtSentence} from "../public/node_modules/vn-translation-tools/public/modules/SrtUtils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const RECORDING_LOCATIONS = [
    __dirname + '/../public/assets/lap1/loop1',
    __dirname + '/../public/assets/lap1/loop2',
    __dirname + '/../public/assets/lap1/loop3',
    __dirname + '/../public/assets/lap1/loop4',
    __dirname + '/../public/assets/lap1/loop5',
    __dirname + '/../public/assets/lap1/loop6',
    __dirname + '/../public/assets/lap1/loop7',
    // __dirname + '/../public/assets/lap1/loop8',
    // __dirname + '/../public/assets/lap1/loop9',
    // __dirname + '/../public/assets/lap1/loop10',
];

/**
 * @return {Promise<SrtBlock[]>}
 */
export const getSourceSrt = async (recordingDir) => {
    const srtPath = recordingDir + '/game_recording.jpn.srt';
    const srcSrtStr = await fs.readFile(srtPath, 'utf8');
    return srcSrtStr
        .trim().split(/\n\n/)
        .map(parseSrtSentence);
};

/**
 * @return {Promise<SrtBlock[]>}
 */
export const getTranslatedSrt = async (recordingDir) => {
    const txtPath = recordingDir + '/translated_sentences_gpt.txt';

    const translatedSentencesStr = await fs.readFile(txtPath, 'utf8');

    const japToEng = new Map(
        parseSentenceTranslationsFile(translatedSentencesStr)
    );
    const translateBlock = parsedBlock => {
        const japLine = parsedBlock.sentence;
        if (!japToEng.get(japLine.trim())) {
            throw new Error('Missing translation for: ' + japLine + ' at ' + parsedBlock.index);
        }
        parsedBlock.sentence = japToEng.get(japLine.trim());

        return parsedBlock;
    };
    const srcJpnSrtBlocks = await getSourceSrt(recordingDir);
    const translatedSrtBlocks = srcJpnSrtBlocks
        .map(parsedBlock => translateBlock({...parsedBlock}));

    return translatedSrtBlocks;
};
