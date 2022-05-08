import { dirname } from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";
import { RECORDING_LOCATIONS } from "../backend/assets_index.js";
import { parseSrtSentence } from "../public/node_modules/vn-translation-tools/public/modules/SrtUtils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * @return {Map<string, string>}
 */
const collectKanjiToRomaji = async () => {
    const characterNamesText = await fs.readFile(__dirname + '/../public/assets/character_names.json', 'utf8');
    const characterNames = JSON.parse(characterNamesText);
    const kanjiToRomaji = new Map(
        characterNames.flatMap(([kan, rom]) => {
            const kanWords = kan.split(' ');
            const romWords = rom.split(' ');
            const wordPairs = [];
            wordPairs.push([kan, rom]);
            if (kanWords.length === romWords.length) {
                for (let i = 0; i < kanWords.length; ++i) {
                    wordPairs.push([kanWords[i], romWords[i]]);
                }
            }
            return wordPairs;
        })
    );
    return kanjiToRomaji;
};

const honorifics = new Map([
    ['さん', 'san'],
    ['サン', 'san'],
    ['様', 'sama'],
    ['さま', 'sama'],
    ['サマ', 'sama'],
    ['君', 'kun'],
    ['くん', 'kun'],
    ['クン', 'kun'],
    ['ちゃん', 'chan'],
    ['チャン', 'chan'],
    ['たん', 'tan'],
    ['タン', 'tan'],
    ['坊', 'bo'],
    ['ぼう', 'bo'],
    ['ボウ', 'bo'],
    ['先輩', 'senpai'],
    ['せんぱい', 'senpai'],
    ['センパイ', 'senpai'],
    ['先生', 'sensei'],
    ['せんせい', 'sensei'],
    ['センセイ', 'sensei'],
    ['氏', 'shi'],
    ['し', 'shi'],
    ['殿', 'dono'],
    ['との', 'tono'],
    ['どの', 'dono'],
    ['トノ', 'dono'],
    ['姉ちゃん', 'nēchan'],
    ['お姉ちゃん', 'onēchan'],
    ['姉さん', 'nēsan'],
    ['お姉さん', 'onēsan'],
    ['兄ちゃん', 'niichan'],
    ['お兄ちゃん', 'oniichan'],
    ['兄さん', 'niisan'],
    ['お兄さん', 'oniisan'],
]);

const main = async () => {
    const kanjiToRomaji = await collectKanjiToRomaji();
    for (const dirPath of RECORDING_LOCATIONS) {
        const newJpnSentences = [];
        const srtPath = dirPath + '/game_recording.jpn.srt';
        const srcSrtStr = await fs.readFile(srtPath, 'utf8');
        const srcJpnSrtBlocks = srcSrtStr
            .trim().split(/\n\n/)
            .map(parseSrtSentence);
        for (const srtBlock of srcJpnSrtBlocks) {
            let jpn = srtBlock.sentence;
            for (let [kan, rom] of kanjiToRomaji) {
                let index;
                while ((index = jpn.indexOf(kan)) > -1) {
                    const postfix = jpn.slice(index + kan.length, index + kan.length + 5);
                    const honorific = [...honorifics].find(h => postfix.startsWith(h[0]));
                    if (honorific) {
                        kan += honorific[0];
                        rom += '-' + honorific[1];
                    }
                    jpn = jpn.replace(kan, ' ' + rom);
                }
            }
            newJpnSentences.push(jpn);
        }
        const jpnLinesHtml = `
            <head>
                <meta charset="utf8"/>
            </head>
            <body>
                <pre>
${newJpnSentences.join('\n')}
                </pre>
            </body>
        `;
        await fs.writeFile(dirPath + '/jpnLines_preserved_pronunciations.html', jpnLinesHtml);
    }
};

main().catch(error => {
    console.error('Main script execution failed', error);
    process.exit(1);
});
