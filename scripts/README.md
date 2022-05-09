These scripts are the life cycle of the extracted text:
- `a01_textractor_to_srt.js` - transform format from Textractor logs to `.jpn.srt` subs file
- `a02_preserve_pronunciations.js` - prepare names and other not machine friendly terms to stay untranslated
- `a03_translate_srt.js` - translate `.jpn.srt` to `.eng.srt` using supplied `translated_sentences.txt` file
