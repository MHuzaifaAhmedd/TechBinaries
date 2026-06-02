import { CountryCode, getCountries, getCountryCallingCode } from "libphonenumber-js/min";

export type PhoneCountryOption = {
  iso2: CountryCode;
  dialCode: string;
  countryName: string;
  emojiFlag: string;
};

function countryCodeToEmoji(iso2: string): string {
  const codePoints = iso2
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function getCountryName(iso2: CountryCode): string {
  try {
    const displayNames = new Intl.DisplayNames(["en"], { type: "region" });
    return displayNames.of(iso2) ?? iso2;
  } catch {
    return iso2;
  }
}

export const PHONE_COUNTRY_OPTIONS: PhoneCountryOption[] = getCountries()
  .map((iso2) => ({
    iso2,
    dialCode: `+${getCountryCallingCode(iso2)}`,
    countryName: getCountryName(iso2),
    emojiFlag: countryCodeToEmoji(iso2),
  }))
  .sort((a, b) => a.countryName.localeCompare(b.countryName));
