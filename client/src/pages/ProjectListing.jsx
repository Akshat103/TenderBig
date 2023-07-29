


import React, { useState, useEffect } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const ProjectImg = `${import.meta.env.BASE_URL}images/project-hero.jpg`;

const ProjectCard = ({ project }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleViewDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="bg-white mt-9 shadow-lg rounded p-6 mb-4 border-[2px] border-black/20">
      <h2 className="mb-3 text-xl font-bold capitalize">{project.companyname}</h2>
      <div className="grid grid-cols-3">

        <p className="text-gray-600">
          <strong>PNR:</strong> {project.pnr}
        </p>
        <p className="text-gray-600">
          <strong>Detail:</strong> {project.detail}
        </p>
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

    const token = localStorage.getItem("token")
    const headers = {
      "Content-Type": "application/json",
      auth: token,
    };

    axios
      .get(`${BASE_URL}/projects/search`, {headers})
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
      <h1 className="my-4 text-3xl font-bold text-center">
        About Projects
      </h1>

      <img src={ProjectImg} alt="project_img" className="h-auto md:h-[600px] w-full my-5" loading="lazy" />

      <div className="my-10">
        <div className="flex flex-col text-xl leading-8 text-center gap-y-3">
          <p>
            Project tenders are specific procurement opportunities related to project-based contracts.
            These tenders are issued by organizations or entities looking to outsource a project's
            execution to external contractors or suppliers. Project tenders are typically more comprehensive
            than regular procurement tenders, as they involve the entire scope of a project, including design,
            construction, implementation, and delivery.
          </p>

          <p>

            Project tenders outline the requirements, specifications, and deliverables of the project, along with
            any technical or quality standards that need to be met. They may include details about the project's
            objectives, timelines, budget, and evaluation criteria. Interested contractors or suppliers are invited
            to submit their bids, proposals, or tenders, providing their approach, pricing, resources, and
            qualifications to successfully complete the project.
          </p>
        </div>
      </div>
      <h1 className="my-4 text-3xl font-bold text-center">Project List</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

        <div className="col-span-1">
          <div className="">
            <h2 className="mb-2 text-lg font-bold">Filters</h2>

            <div className="mb-4 border-[2px] border-black/20 shadow-xl">
              <label
                htmlFor="country"
                className="block text-xl font-bold mb-0.5 px-4 py-3 text-white bg-black"
              >
                Country
              </label>
              <select
                id="country"
                name="country"
                size={5}
                value={selectedCountry}
                onChange={handleCountryChange}
                className="w-full px-4 py-2 bg-white"
              >
                <option value="" className="text-lg px-4 py-1 mb-0.5 checked:text-white checked:shadow-[0_0_10px_100px_#b91c1c_inset] hover:shadow-[0_0_10px_100px_#b91c1c_inset] hover:text-white">All Countries</option>
                {countries.map((country) => (
                  <option className="py-1 mb-0.5 px-4 text-lg checked:text-white checked:shadow-[0_0_10px_100px_#b91c1c_inset] hover:shadow-[0_0_10px_100px_#b91c1c_inset] hover:text-white" key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4 border-[2px] border-black/20 shadow-xl mt-8">
              <label
                htmlFor="state"
                className="block text-xl font-bold  mb-0.5 px-4 py-3 text-white bg-black"
              >
                State
              </label>
              <select
                id="state"
                name="state"
                size={5}
                value={selectedState}
                onChange={handleStateChange}
                className="w-full px-4 py-2 bg-white"
              >
                <option value="" className="text-lg px-4 py-1 mb-0.5 checked:text-white checked:shadow-[0_0_10px_100px_#b91c1c_inset] hover:shadow-[0_0_10px_100px_#b91c1c_inset] hover:text-white">All States</option>
                {Array.from(
                  new Set(
                    projects
                      .filter(
                        (project) => project.state === selectedCountry
                      )
                      .map((project) => project.state)
                  )
                ).map((state) => (
                  <option className="py-1 mb-0.5 px-4 text-lg checked:text-white checked:shadow-[0_0_10px_100px_#b91c1c_inset] hover:shadow-[0_0_10px_100px_#b91c1c_inset] hover:text-white" key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* )} */}
            {/* {selectedState && ( */}
            <div className="mb-4 border-[2px] border-black/20 shadow-xl mt-8">
              <label
                htmlFor="city"
                className="block text-xl font-bold mb-0.5 px-4 py-3 text-white bg-black"
              >
                City
              </label>
              <select
                id="city"
                name="city"
                size={5}
                value={selectedCity}
                onChange={handleCityChange}
                className="w-full px-4 py-2 bg-white"
              >
                <option value="" className="text-lg px-4 py-1 mb-0.5 checked:text-white checked:shadow-[0_0_10px_100px_#b91c1c_inset] hover:shadow-[0_0_10px_100px_#b91c1c_inset] hover:text-white">All Cities</option>
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
                  <option className="py-1 mb-0.5 px-4 text-lg checked:text-white checked:shadow-[0_0_10px_100px_#b91c1c_inset] hover:shadow-[0_0_10px_100px_#b91c1c_inset] hover:text-white" key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            {/* )} */}
          </div>
        </div>



        <div className="col-span-2">
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
          <div className="flex  justify-between mt-4">
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
      </div>
    </div>
  );
};

export default ProjectList;