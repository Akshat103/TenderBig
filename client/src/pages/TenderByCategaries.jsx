import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TenderCard = ({ sectorName, sectorData }) => {
  return (
    <div className="mx-auto bg-white overflow-hidden border-[2px] rounded-lg shadow-lg">
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-4 text-red-700">{sectorName}</h2>
        <img
          src={sectorData[0]}
          alt="Sector Image"
          className="mb-4 w-[300px] h-[200px]"
          loading="lazy"
        />
        
        <ul className="list-disc ml-6">
          {sectorData.slice(1).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const App = () => {
  const sector = {
    "Construction Industry": [
      "https://www.tenderdetail.com/Content/Img/Industry/Construction/construction.jpg",
      "Building Construction",
      "Road Construction",
      "Bridge Irrigation",
      "Related Work",
      "Pipe Line",
    ],
    "Electrical Industry": [
      "https://www.tenderdetail.com/Content/Img/Industry/Electrical/Electrical.jpg",
      "Panel",
      "Instrumentation and Control Equipment",
      "Electrical Work",
      "Circuit Protection Device",
      "Electrical Boxes",
      "Light and Bulbs",
    ],
    "IT and Telecommunications Industry": [
      "https://www.tenderdetail.com/Content/Img/Industry/IT-and-Telecommunications/IT.jpg",
      "Computers",
      "Computer Accessories",
      "Computer Printers ",
      "Media Storage ",
      "Devices Software",
    ],
  };

  return (
    <>
    <div className="flex justify-center mt-12">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {Object.entries(sector).map(([sectorName, sectorData]) => (
          <TenderCard
            key={sectorName}
            sectorName={sectorName}
            sectorData={sectorData}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default App;
