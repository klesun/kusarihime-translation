import { promises as fs } from "fs";

/**
 * @module - gpt api is very loose in preserving line breaks when you feed
 *     it the text that has some sentences broken into multiple lines.
 *     The best workaround I could come up with was marking each input
 *     line with a random number to restore the relationship with output lines
 *     (luckily gpt keeps these random numbers if you explicitly ask him to)
 *     So here is the script that links output lines with input lines by these markings
 */

async function main() {
    const inputStr = await fs.readFile("public/assets/lap1/loop4/gpt_input.json", "utf8");
    const outputStr = await fs.readFile("public/assets/lap1/loop4/gpt_output.txt", "utf8");
    const inputLines = JSON.parse(inputStr);
    const outputLines = outputStr.trimEnd().split("\n");
    let offset = 0;
    const result = [];
    for (let i = 0; i < outputLines.length; ++i) {
        const inputLineMatch = inputLines[i + offset].match(/^(.*)\s*\|(\d+)$/);
        let [, , inputMark] = inputLineMatch;
        const outputLineMatch = outputLines[i].match(/^(.*)\s*\|\s*(\d+)$/);
        if (!outputLineMatch) {
            console.error("ololo no match at #" + i + " " + outputLines[i]);
            throw new Error("zhopa");
        }
        let [, outputText, outputMark] = outputLineMatch;
        if (inputMark === outputMark) {
            result.push(outputText);
        } else {
            let mergedLines = 1;
            while (inputMark !== outputMark) {
                ++offset;
                ++mergedLines;
                if (!inputLines[i + offset]) {
                    console.error("failed to find matching input line for #" + i + " " + outputLines[i]);
                    throw new Error("zhopa");
                }
                [, , inputMark] = inputLines[i + offset].match(/^(.*)\s*\|(\d+)$/);
            }
            outputText = outputText.replace(/"/g, "");
            const words = outputText.split(" ");
            const cutSize = Math.ceil(words.length / mergedLines);
            for (let i = 0; i < mergedLines; ++i) {
                const cut = words.slice(i * cutSize, i * cutSize + cutSize);
                result.push(cut.join(" ") || ".");
            }
        }
    }
    // console.log("ololo " + result.length + " " + inputLines.length);
    console.log(result.join("\n"));
}

await main();
