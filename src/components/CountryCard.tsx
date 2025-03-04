import React from 'react';
import { Country } from '../types';

interface CountryCardProps {
  country: Country;
  onClick: () => void;
  darkMode: boolean;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, onClick, darkMode }) => {
  return (
    <div 
      className={`rounded-lg overflow-hidden shadow-md cursor-pointer hover:transform hover:scale-105 transition-all duration-300 ${
        darkMode ? 'bg-gray-700' : 'bg-white'
      }`}
      onClick={onClick}
    >
      <div className="h-40 overflow-hidden">
        <img 
          src={country.flags.svg} 
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h2 className="font-bold text-lg mb-4 truncate">{country.name.common}</h2>
        <div className="space-y-1">
          <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
          <p><span className="font-semibold">Region:</span> {country.region}</p>
          <p><span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;