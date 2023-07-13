


import React, { useState, useEffect } from "react";
import axios from "axios";

const ProjectCard = ({ project }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleViewDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="bg-white shadow-lg rounded p-6 mb-4 border-[2px] border-black/20">
      <h2 className="mb-3 text-xl font-bold capitalize">{project.companyname}</h2>
      <div className="grid grid-cols-3">

        <p className="text-gray-600">
          <strong>PNR:</strong> {project.pnr}
        </p>
        <p className="text-gray-600">
          <strong>Detail:</strong> {project.detail}
        </p>
      {/* {showDetails && ( */}
        {/* <div className="grid grid-cols-3"> */}
          <p className="mb-2 text-gray-600">
            <strong>Value:</strong> {project.value}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>City:</strong> {project.city}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>State:</strong> {project.state}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>Country:</strong> {project.country}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>Status:</strong> {project.status}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>Sector:</strong> {project.sector}
          </p>
      </div>
        {/* </div> */}
      {/* )} */}
      {/* <button
        className="px-4 py-2 font-bold text-white transition-colors bg-red-700 rounded hover:bg-red-700"
        onClick={handleViewDetails}
      >
        {showDetails ? "Hide Details" : "View Details"}
      </button> */}
    </div>
  );
};

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

  useEffect(() => {
    axios
      .get("http://localhost:5000/apiTender/projects/getall")
      .then((response) => {
        console.log(response, 'response')
        setProjects(response.data);
        setFilteredProjects(response.data);
        const uniqueCountries = [
          ...new Set(response.data.map((project) => {
            console.log(project.country.length, project.country.length > 0, project.country.length > 0 ? project.country : null)
            return project.country.length > 0 ? project.country : null
          })),
        ];
        const newCountryArr = uniqueCountries.filter(countryObj => countryObj !== null)
        setCountries(newCountryArr);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    let tempProjects = projects;

    if (selectedCountry !== "") {
      tempProjects = tempProjects.filter(
        (project) => project.country === selectedCountry
      );
    }

    if (selectedState !== "") {
      tempProjects = tempProjects.filter(
        (project) => project.state === selectedState
      );
    }

    if (selectedCity !== "") {
      tempProjects = tempProjects.filter(
        (project) => project.city === selectedCity
      );
    }

    setFilteredProjects(tempProjects);
  }, [selectedCountry, selectedState, selectedCity, projects]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setCurrentPage(1);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setCurrentPage(1);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setCurrentPage(1);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < pageNumbers) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const pageNumbers = Math.ceil(filteredProjects.length / projectsPerPage);

  const getPageNumbers = () => {
    const pageArray = [];

    for (let i = 1; i <= pageNumbers; i++) {
      pageArray.push(i);
    }

    return pageArray;
  };

  return (
    <div className="p-4 mx-auto max-w-7xl">
        <h1 className="my-4 text-2xl font-bold">Project List</h1>
      <div className="flex flex-col-reverse gap-4 md:flex-row">
        <div className="md:w-2/3">
          {currentProjects.length > 0 ? (
            <div className="grid gap-4">
              {currentProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <p>No projects found.</p>
          )}
          <div className="flex justify-center mt-4">
            <div>
              {getPageNumbers().map((pageNumber) => (
                <button
                  key={pageNumber}
                  className={`${pageNumber === currentPage
                    ? "bg-red-700 text-white"
                    : "bg-gray-200 textgray-700"
                    } font-bold py-2 px-4 rounded mr-2`}
                  onClick={() => goToPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-center justify-between mt-4">
            <button
              className="px-4 py-2 font-bold text-white transition-colors bg-red-700 rounded"
              onClick={previousPage}
              disabled={currentPage === 1}
            >
              Previous Page
            </button>
            <button
              className="px-4 py-2 font-bold text-white transition-colors bg-red-700 rounded"
              onClick={nextPage}
              disabled={currentPage === pageNumbers}
            >
              Next Page
            </button>
          </div>
        </div>
        <div className="md:w-1/3">
          <div className="p-4 border border-gray-300 rounded border-[2px] border-black/20 shadow-lg">
            <h2 className="mb-2 text-lg font-bold">Filters</h2>
            <div className="mb-4">
              <label
                htmlFor="country"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <select
                id="country"
                name="country"
                value={selectedCountry}
                onChange={handleCountryChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
              >
                <option value="">All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            {/* {selectedCountry && ( */}
              <div className="mb-4">
                <label
                  htmlFor="state"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <select
                  id="state"
                  name="state"
                  value={selectedState}
                  onChange={handleStateChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                >
                  <option value="">All States</option>
                  {Array.from(
                    new Set(
                      projects
                        .filter(
                          (project) => project.country === selectedCountry
                        )
                        .map((project) => project.state)
                    )
                  ).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            {/* )} */}
            {/* {selectedState && ( */}
              <div className="mb-4">
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <select
                  id="city"
                  name="city"
                  value={selectedCity}
                  onChange={handleCityChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                >
                  <option value="">All Cities</option>
                  {Array.from(
                    new Set(
                      projects
                        .filter(
                          (project) =>
                            project.country === selectedCountry &&
                            project.state === selectedState
                        )
                        .map((project) => project.city)
                    )
                  ).map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;