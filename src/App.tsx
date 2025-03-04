import React, { useState, useEffect } from 'react';
import { Moon, Sun, Search } from 'lucide-react';
import CountryCard from './components/CountryCard';
import CountryDetail from './components/CountryDetail';
import { Country } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch countries. Please try again later.');
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    let result = countries;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(country => 
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by region
    if (region) {
      result = result.filter(country => 
        country.region === region
      );
    }
    
    setFilteredCountries(result);
  }, [searchTerm, region, countries]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
  };

  const handleBackClick = () => {
    setSelectedCountry(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'} transition-colors duration-300`}>
      {/* Header */}
      <header className={`py-6 px-4 md:px-16 shadow-md ${darkMode ? 'bg-gray-700' : 'bg-white'} transition-colors duration-300`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold">Where in the world?</h1>
          <button 
            onClick={toggleDarkMode} 
            className="flex items-center gap-2 font-medium"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-16 py-8">
        {selectedCountry ? (
          <CountryDetail 
            country={selectedCountry} 
            onBackClick={handleBackClick} 
            darkMode={darkMode}
            countries={countries}
          />
        ) : (
          <>
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row justify-between mb-12 gap-8">
              <div className={`relative flex-1 max-w-md ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={20} className={darkMode ? 'text-gray-300' : 'text-gray-500'} />
                </div>
                <input
                  type="text"
                  placeholder="Search for a country..."
                  className={`pl-12 pr-4 py-4 w-full shadow-md rounded-md ${
                    darkMode ? 'bg-gray-700 placeholder-gray-300' : 'bg-white placeholder-gray-500'
                  } focus:outline-none transition-colors duration-300`}
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div>
                <select
                  value={region}
                  onChange={handleRegionChange}
                  className={`px-4 py-4 shadow-md rounded-md ${
                    darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                  } focus:outline-none transition-colors duration-300`}
                >
                  <option value="">Filter by Region</option>
                  <option value="Africa">Africa</option>
                  <option value="Americas">Americas</option>
                  <option value="Asia">Asia</option>
                  <option value="Europe">Europe</option>
                  <option value="Oceania">Oceania</option>
                </select>
              </div>
            </div>

            {/* Countries Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 py-8">{error}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {filteredCountries.map(country => (
                  <CountryCard 
                    key={country.cca3} 
                    country={country} 
                    onClick={() => handleCountryClick(country)}
                    darkMode={darkMode}
                  />
                ))}
                {filteredCountries.length === 0 && (
                  <div className="col-span-full text-center py-8">No countries found matching your criteria.</div>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;