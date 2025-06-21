import { LANGUAGE_TO_FLAG } from "../constants";

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return {
      src: `https://flagcdn.com/24x18/${countryCode}.png`,
      alt: `${langLower} flag`,
    };
  }

  return null;
}
