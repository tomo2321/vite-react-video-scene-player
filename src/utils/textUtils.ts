/**
 * Converts letters to bullet characters while preserving word structure and punctuation
 * Text between square brackets [like this] is preserved unchanged
 * Example: "He is a soccer player." -> "H• i• a s••••• p•••••."
 * Example: "[Music] He is singing." -> "[Music] H• i• s•••••."
 *
 * @param text - The input text to convert
 * @returns The converted text with letters replaced by bullet characters
 */
export function convertLettersToUnderscores(text: string): string {
  let result = '';
  let i = 0;
  let insideBrackets = false;

  while (i < text.length) {
    const char = text[i];

    // Check for opening bracket
    if (char === '[') {
      insideBrackets = true;
      result += char;
      i++;
      continue;
    }

    // Check for closing bracket
    if (char === ']') {
      insideBrackets = false;
      result += char;
      i++;
      continue;
    }

    // If inside brackets, preserve everything
    if (insideBrackets) {
      result += char;
      i++;
      continue;
    }

    // Outside brackets, apply the letter hiding logic
    if (/\w/.test(char)) {
      // Find the complete word
      const wordStart = i;
      let wordEnd = i;
      while (wordEnd < text.length && /\w/.test(text[wordEnd])) {
        wordEnd++;
      }

      const word = text.substring(wordStart, wordEnd);
      if (word.length <= 1) {
        result += word;
      } else {
        const firstLetter = word[0];
        const underscores = '•'.repeat(word.length - 1);
        result += firstLetter + underscores;
      }

      i = wordEnd;
    } else {
      // Non-word character (space, punctuation, etc.)
      result += char;
      i++;
    }
  }

  return result;
}

/**
 * Reveals typed characters in text while hiding untyped letters with bullet characters
 * Text between square brackets [like this] is preserved unchanged
 * Used for text typing mode
 *
 * @param originalText - The original text (can be a single line from multi-line text)
 * @param typedText - The text that has been correctly typed so far (entire typed sequence)
 * @param fullOriginalText - The full original text to calculate position correctly
 * @returns The text with typed characters revealed and untyped letters hidden
 */
export function revealTypedCharacters(
  originalText: string,
  typedText: string = '',
  fullOriginalText?: string
): string {
  // Use fullOriginalText if provided, otherwise use originalText
  const textToCheck = fullOriginalText || originalText;
  const lettersOnlyOriginal = extractLettersOnly(textToCheck);

  let result = '';
  let letterIndex = 0;
  let i = 0;
  let insideBrackets = false;

  // Find the starting letter index for this line if it's part of a larger text
  if (fullOriginalText && originalText !== fullOriginalText) {
    const textBeforeLine = fullOriginalText.substring(0, fullOriginalText.indexOf(originalText));
    letterIndex = extractLettersOnly(textBeforeLine).length;
  }

  while (i < originalText.length) {
    const char = originalText[i];

    // Check for opening bracket
    if (char === '[') {
      insideBrackets = true;
      result += char;
      i++;
      continue;
    }

    // Check for closing bracket
    if (char === ']') {
      insideBrackets = false;
      result += char;
      i++;
      continue;
    }

    // If inside brackets, preserve everything
    if (insideBrackets) {
      result += char;
      i++;
      continue;
    }

    // Skip whitespace and punctuation - they don't count as letters to type
    if (/\s/.test(char) || /[^\w]/.test(char)) {
      result += char;
      i++;
      continue;
    }

    // Check if this letter position has been typed correctly
    if (letterIndex < typedText.length && letterIndex < lettersOnlyOriginal.length) {
      result += char; // Reveal the letter
    } else {
      // Hide untyped letters with bullet, but keep first letter of each word visible
      const isFirstLetterOfWord =
        i === 0 || /\s/.test(originalText[i - 1]) || originalText[i - 1] === ']';
      result += isFirstLetterOfWord ? char : '•';
    }

    letterIndex++;
    i++;
  }

  return result;
}

/**
 * Extracts only the letters (no spaces or punctuation) from text for typing comparison
 * Letters between square brackets [like this] are excluded from the result
 *
 * @param text - The input text
 * @returns Only the letters from the text that are outside brackets
 */
export function extractLettersOnly(text: string): string {
  let result = '';
  let insideBrackets = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    // Check for opening bracket
    if (char === '[') {
      insideBrackets = true;
      continue;
    }

    // Check for closing bracket
    if (char === ']') {
      insideBrackets = false;
      continue;
    }

    // If inside brackets, skip this character
    if (insideBrackets) {
      continue;
    }

    // Only add letters and numbers, convert to lowercase
    if (/\w/.test(char)) {
      result += char.toLowerCase();
    }
  }

  return result;
}

/**
 * Reveals typed characters and emphasizes the next target letter in text typing mode
 * Text between square brackets [like this] is preserved unchanged
 * Returns an array of text segments with emphasis information
 *
 * @param originalText - The original text (can be a single line from multi-line text)
 * @param typedText - The text that has been correctly typed so far (entire typed sequence)
 * @param fullOriginalText - The full original text to calculate position correctly
 * @returns Array of text segments with emphasis information
 */
export function revealTypedCharactersWithEmphasis(
  originalText: string,
  typedText: string = '',
  fullOriginalText?: string
): Array<{ text: string; isTarget: boolean }> {
  // Use fullOriginalText if provided, otherwise use originalText
  const textToCheck = fullOriginalText || originalText;
  const lettersOnlyOriginal = extractLettersOnly(textToCheck);

  const result: Array<{ text: string; isTarget: boolean }> = [];
  let letterIndex = 0;
  let i = 0;
  let insideBrackets = false;

  // Find the starting letter index for this line if it's part of a larger text
  if (fullOriginalText && originalText !== fullOriginalText) {
    const textBeforeLine = fullOriginalText.substring(0, fullOriginalText.indexOf(originalText));
    letterIndex = extractLettersOnly(textBeforeLine).length;
  }

  while (i < originalText.length) {
    const char = originalText[i];

    // Check for opening bracket
    if (char === '[') {
      insideBrackets = true;
      result.push({ text: char, isTarget: false });
      i++;
      continue;
    }

    // Check for closing bracket
    if (char === ']') {
      insideBrackets = false;
      result.push({ text: char, isTarget: false });
      i++;
      continue;
    }

    // If inside brackets, preserve everything
    if (insideBrackets) {
      result.push({ text: char, isTarget: false });
      i++;
      continue;
    }

    // Skip whitespace and punctuation - they don't count as letters to type
    if (/\s/.test(char) || /[^\w]/.test(char)) {
      result.push({ text: char, isTarget: false });
      i++;
      continue;
    }

    // Determine if this is the next target letter
    const isNextTarget =
      letterIndex === typedText.length && letterIndex < lettersOnlyOriginal.length;

    // Check if this letter position has been typed correctly
    if (letterIndex < typedText.length && letterIndex < lettersOnlyOriginal.length) {
      result.push({ text: char, isTarget: false }); // Reveal the letter
    } else {
      // Hide untyped letters with bullet, but keep first letter of each word visible
      const isFirstLetterOfWord =
        i === 0 || /\s/.test(originalText[i - 1]) || originalText[i - 1] === ']';
      const displayChar = isFirstLetterOfWord ? char : '•';
      result.push({ text: displayChar, isTarget: isNextTarget });
    }

    letterIndex++;
    i++;
  }

  return result;
}
