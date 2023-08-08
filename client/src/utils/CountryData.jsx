import data from "../constants/CountryDetails.json";

// Function to get a list of countries
export const getCountries = () => {
  const countries = data.map((country) => country.name);
  return countries;
};

// Function to get a list of states by country name
export const getStatesByCountry = (countryName) => {
  const country = data.find((country) => country.name === countryName);
  if (!country || !country.states) return [];

  const states = country.states.map((state) => state.name);
  return states;
};

// Function to get a list of cities by country name and state name
export const getCitiesByCountryAndState = (countryName, stateName) => {

  const country = data.find((country) => country.name === countryName);
  if (!country || !country.states) return [];

  const state = country.states.find((state) => state.name === stateName);
  if (!state || !state.cities) return [];

  const cities = state.cities;
  return cities;
};
