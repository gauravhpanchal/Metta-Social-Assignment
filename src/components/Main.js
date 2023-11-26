import React, { useEffect, useState } from "react";
import { ALL_COUNTRIES, SEARCH_BY_CURRENCY } from "../utils/constant";
import CountryCard from "./CountryCard";
import { ColorRing } from "react-loader-spinner";

/**
 * Main component for exploring countries by currency.
 *
 * This component provides a search functionality to explore countries based on
 * a specific currency. It fetches all countries on initial load and allows users
 * to search for countries by entering a currency code. It displays a loading
 * spinner while fetching data and handles errors in case of failed requests.
 */

const Main = () => {
  const [currency, setCurrency] = useState(""); // Input value for currency search
  const [countries, setCountries] = useState([]); // List of countries based on search
  const [allCountries, setAllCountries] = useState([]); // List of all countries
  const [error, setError] = useState(null); //Error message if data fetching fails
  const [loading, setLoading] = useState(true); // Loading state during data fetching

  // Fetch all countries on component mount
  useEffect(() => {
    fetchAllCountries();
  }, []);

  /**
   * Fetches data for all countries and sets the state variables accordingly.
   */
  const fetchAllCountries = async () => {
    setLoading(true);
    const allCountriesRes = await fetch(ALL_COUNTRIES);
    const allCountriesData = await allCountriesRes.json();
    setAllCountries(allCountriesData);
    setLoading(false);
  };

  /**
   * Handles the currency search functionality.
   */
  const handleCurrency = async () => {
    try {
      if (!currency) return;
      setLoading(true); // Set loading to true before making the request
      const currRes = await fetch(SEARCH_BY_CURRENCY + currency);
      const currData = await currRes.json();
      setAllCountries([]); // Clear all countries when searching by currency
      setCountries(currData);
      setError(null);
      setCurrency(""); // Reset the currency input after successful search
    } catch (err) {
      console.error("Fetching data failed:", err.message);
      setCountries([]);
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false); // Set loading to false when the request is complete (success or error)
    }
  };
  return (
    <div className="text-center items-center">
      <p className="text-4xl font-bold">Explore Countries by Currency</p>
      {/* Search Bar */}
      <div className="mt-10 sm-flex flex-wrap text-center">
        <input
          type="text"
          value={currency}
          onChange={(e) => setCurrency(e.target.value.toUpperCase())}
          placeholder="Search by currency INR, EUR"
          className="mt-2 sm:mt-0 border border-gray-400 rounded-full px-3 sm:px-4 w-full sm:w-3/5 lg:w-2/5 xl:w-1/3 py-2"
        />
        <button
          onClick={handleCurrency}
          className="mt-2 sm:mt-0 bg-white border font-medium border-gray-400 text-black px-4 sm:px-6  py-2 rounded-full"
        >
          Search
        </button>
        <hr className="mt-12 border-dashed border-gray-400" />
      </div>
      {/* Error Handling */}
      {error && <p className="mt-4 text-red-400">{error}</p>}

      {/* All Countries Card on first load */}

      {
        allCountries.length > 0 ? (
          <>
            <p className="font-bold text-3xl mt-4 underline">All Countries</p>
            <div className="flex gap-10 flex-wrap justify-center mb-10">
              {allCountries?.map((country) => (
                <CountryCard key={country.capital} countryData={country} />
              ))}
            </div>
          </>
        ) : null /* Don't render anything here if there are no countries yet */
      }

      {/* Loading Spinner */}
      {loading && (
        <div className="fixed top-80 left-[550px] translate-x-2/4 translate-y-2/4 ">
          <ColorRing
            visible={true}
            height="200"
            width="200"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      )}
      {/* Countries Cards After Search */}
      <p className="font-bold text-3xl mt-4 underline">
        Countries Matching Your Search
      </p>
      <div className="flex gap-16 flex-wrap justify-center mb-10">
        {Array.isArray(countries) ? (
          countries?.map((country) => (
            <CountryCard key={country.capital} countryData={country} />
          ))
        ) : (
          <p className="mt-6 font-bold text-2xl text-red-500">
            No countries were found. Please enter a valid currency.
          </p>
        )}
      </div>
    </div>
  );
};

export default Main;
