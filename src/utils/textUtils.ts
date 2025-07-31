/**
 * Converts letters to bullet characters while preserving word structure and punctuation
 * Example: "He is a soccer player." -> "H• i• a s••••• p•••••."
 *
 * @param text - The input text to convert
 * @returns The converted text with letters replaced by bullet characters
 */
export function convertLettersToUnderscores(text: string): string {
  return text.replace(/\b\w+\b/g, (word) => {
    // For each word, keep the first letter and convert the rest to underscores
    if (word.length === 0) return word;
    if (word.length === 1) return word;

    const firstLetter = word[0];
    const underscores = '•'.repeat(word.length - 1);
    return firstLetter + underscores;
  });
}
