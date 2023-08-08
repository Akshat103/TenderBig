import { useState } from "react";
import TenderStatistics from "./TenderStatistics"
import UserStatistics from "./UserStatistics"

const DashboardHome = () => {

  return (
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto bg-gray-100">
            {/* Dashboard actions */}
            {/* Cards */}
            <div className="grid grid-cols-15 gap-6">
              {/*---------> Table (Top Channels) */}
              <div className="text-center">
                <TenderStatistics/>
                <UserStatistics/>
              </div>
            </div>
          </div>
  );
};

export default DashboardHome;
