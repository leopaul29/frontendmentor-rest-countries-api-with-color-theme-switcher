export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  tld: string[];
  cca3: string;
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  capital: string[];
  region: string;
  subregion: string;
  languages: {
    [key: string]: string;
  };
  borders: string[];
  population: number;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
}

// Helper function to normalize country data from different sources
export function normalizeCountry(country: any): Country {
  // If it's from the REST Countries API v3
  if (country.name && typeof country.name === 'object' && country.name.common) {
    return country as Country;
  }
  
  // If it's from local data (older API format)
  return {
    name: {
      common: country.name,
      official: country.name,
      nativeName: country.nativeName ? {
        native: {
          official: country.nativeName,
          common: country.nativeName
        }
      } : undefined
    },
    tld: country.topLevelDomain,
    cca3: country.alpha3Code,
    alpha3Code: country.alpha3Code,
    currencies: country.currencies,
    capital: country.capital ? [country.capital] : [],
    region: country.region,
    subregion: country.subregion,
    languages: country.languages,
    borders: country.borders,
    population: country.population,
    flags: country.flags || {
      svg: country.flag,
      png: country.flag?.replace('.svg', '.png')
    },
    flag: country.flag,
    nativeName: country.nativeName
  };
}