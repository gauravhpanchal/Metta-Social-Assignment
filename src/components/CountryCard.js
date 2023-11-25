import React from "react";

const CountryCard = ({ countryData }) => {
  const { capital, flags, name } = countryData;
  //   console.log(flags.png);
  return (
    <div className="mt-4 sm:mt-10 px-2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 border border-gray-300 rounded-3xl shadow-sm hover:shadow-2xl p-2">
      <img
        src={flags.png}
        alt={flags.alt}
        className=" border border-gray-300 w-full rounded-2xl"
      />
      <p className="mt-3   text-xl font-semibold">Name: {name.common}</p>
      <p className="text-xl mt-2 font-semibold">Capital: {capital}</p>
    </div>
  );
};

export default CountryCard;
