import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import DashboardAvatars from "../partials/dashboard/DashboardAvatars";
import FilterButton from "../components/DropdownFilter";
import Datepicker from "../components/Datepicker";

// import DashboardCard02 from '../partials/dashboard/DashboardCard02';
// import DashboardCard03 from '../partials/dashboard/DashboardCard03';
// import DashboardCard04 from '../partials/dashboard/DashboardCard04';
// import DashboardCard05 from '../partials/dashboard/DashboardCard05';
// import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from "../partials/dashboard/DashboardUsers";
// import DashboardCard08 from '../partials/dashboard/DashboardCard08';
// import DashboardCard09 from '../partials/dashboard/DashboardCard09';
// import DashboardCard10 from '../partials/dashboard/DashboardCard10';
// import DashboardCard11 from '../partials/dashboard/DashboardCard11';
// import DashboardCard12 from '../partials/dashboard/DashboardCard12';
// import DashboardCard13 from '../partials/dashboard/DashboardCard13';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden ">
      {/* Sidebar */}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main>
          {/*  Site header 
      import Header from '../partials/Header';
      */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}

            {/* Cards */}
            <div className="grid grid-cols-15 gap-6">
              {/*---------> Table (Top Channels) */}
              <DashboardCard07 />
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}

export default Dashboard;
