import { OpenAI } from "openai";
import { promises as fs } from "fs";

const inputStr = await fs.readFile("public/assets/lap1/loop8/jpnLines_preserved_pronunciations.txt", "utf8");

const openAiClient = new OpenAI({
    apiKey: "[REDACTED]",
});

const outputSchema = {
    "name": "Japanese lines translation to English",
    "type": "object",
    "additionalProperties": false,
    "required": [
        "translationLines",
    ],
    "properties": {
        "translationLines": {
            "type": "array",
            "description": "Array of objects, each representing a line from the input",
            "items": {
                "type": "object",
                "additionalProperties": false,
                "required": ["lineNumber", "originalJapaneseLine", "translatedEnglishLine"],
                "properties": {
                    "lineNumber": {
                        "type": "integer",
                        "description": "1-based",
                        "nullable": false,
                    },
                    "originalJapaneseLine": {
                        "type": "string",
                        "description": "The original line in Japanese exactly as it was in the input",
                        "nullable": false
                    },
                    "translatedEnglishLine": {
                        "type": "string",
                        "description": "The original line translated to English",
                        "nullable": false
                    },
                },
            },
        },
    }
};

const PROMPT = `Please, translate following lines from Japanese to English according to the supplied schema`;

const allLines = inputStr.split("\n");

const chunkSize = 200;

const outputs = [];

for (let chunkStart = 0; chunkStart < allLines.length; chunkStart += chunkSize) {
    const chunk = allLines.slice(chunkStart, chunkStart + chunkSize).join("\n");
    console.log("Processing lines after " + chunkStart)

    const output = await openAiClient.responses.parse({
        model: "gpt-4o",
        // temperature: 0,
        input: [
            { role: "system", content: PROMPT },
            { role: "user", content: [{
                text: chunk,
                type: 'input_text',
            }] }
        ],
        text: {
            format: { name: "TranslationJSONOutput", type: "json_schema", schema: outputSchema },
        },
    });

    outputs.push(output);
}

await fs.writeFile("zhopa123.json", JSON.stringify(outputs), "utf8");
