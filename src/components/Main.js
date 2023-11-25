import React, { useState } from "react";
import { SEARCH_BY_CURRENCY } from "../utils/constant";
import CountryCard from "./CountryCard";

const Main = () => {
  const [currency, setCurrency] = useState("");
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  //   console.log(currency);
  const handleCurrency = async () => {
    try {
      if (!currency) return;
      const currRes = await fetch(SEARCH_BY_CURRENCY + currency);
      const currData = await currRes.json();
      setCountries(currData);
      setError(null);
    } catch (err) {
      console.error("Fetching data failed:", err.message);
      setCountries([]);
      setError("Error fetching data. Please try again.");
    }

    // console.log(currData);
  };
  console.log(countries);
  return (
    <div className="text-center items-center">
      <p className="text-3xl font-bold">Explore Countries by Currency</p>
      {/* Search Bar */}
      <div className="mt-20 sm-flex flex-wrap text-center">
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
      {/* Countries Cards */}
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
