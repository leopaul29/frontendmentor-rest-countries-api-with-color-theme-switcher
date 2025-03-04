import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Country } from '../types';

interface CountryDetailProps {
  country: Country;
  onBackClick: () => void;
  darkMode: boolean;
  countries: Country[];
}

const CountryDetail: React.FC<CountryDetailProps> = ({ 
  country, 
  onBackClick, 
  darkMode,
  countries 
}) => {
  // Helper function to get native name
  const getNativeName = () => {
    if (!country.name.nativeName) return 'N/A';
    const nativeNameKey = Object.keys(country.name.nativeName)[0];
    return nativeNameKey ? country.name.nativeName[nativeNameKey].common : 'N/A';
  };

  // Helper function to get currencies
  const getCurrencies = () => {
    if (!country.currencies) return 'N/A';
    return Object.values(country.currencies)
      .map(currency => currency.name)
      .join(', ');
  };

  // Helper function to get languages
  const getLanguages = () => {
    if (!country.languages) return 'N/A';
    return Object.values(country.languages).join(', ');
  };

  // Helper function to get border countries
  const getBorderCountries = () => {
    if (!country.borders || country.borders.length === 0) return [];
    
    return country.borders.map(border => {
      const borderCountry = countries.find(c => c.cca3 === border);
      return borderCountry ? borderCountry.name.common : border;
    });
  };

  const borderCountries = getBorderCountries();

  return (
    <div className="py-8">
      <button 
        onClick={onBackClick}
        className={`flex items-center gap-2 px-8 py-2 shadow-md rounded-md mb-16 ${
          darkMode ? 'bg-gray-700' : 'bg-white'
        } transition-colors duration-300`}
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="w-full">
          <img 
            src={country.flags.svg} 
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="w-full h-auto shadow-md"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8">{country.name.common}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-12">
            <div>
              <p className="mb-2"><span className="font-semibold">Native Name:</span> {getNativeName()}</p>
              <p className="mb-2"><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
              <p className="mb-2"><span className="font-semibold">Region:</span> {country.region}</p>
              <p className="mb-2"><span className="font-semibold">Sub Region:</span> {country.subregion || 'N/A'}</p>
              <p className="mb-2"><span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
            </div>
            <div>
              <p className="mb-2"><span className="font-semibold">Top Level Domain:</span> {country.tld?.[0] || 'N/A'}</p>
              <p className="mb-2"><span className="font-semibold">Currencies:</span> {getCurrencies()}</p>
              <p className="mb-2"><span className="font-semibold">Languages:</span> {getLanguages()}</p>
            </div>
          </div>

          {borderCountries.length > 0 && (
            <div className="flex flex-wrap items-center gap-4">
              <h3 className="font-semibold text-lg">Border Countries:</h3>
              <div className="flex flex-wrap gap-2">
                {borderCountries.map((borderCountry, index) => (
                  <span 
                    key={index}
                    className={`px-4 py-1 shadow-md rounded-sm text-sm ${
                      darkMode ? 'bg-gray-700' : 'bg-white'
                    }`}
                  >
                    {borderCountry}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;