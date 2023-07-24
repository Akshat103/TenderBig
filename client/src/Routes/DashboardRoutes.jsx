import { useState } from "react";
import Sidebar from "../Admin/partials/Sidebar";
import Header from "../Admin/partials/Header";
import AdminRoutes from "./DashboardNavigation/AdminRoutes";
import HRRoutes from "./DashboardNavigation/HRRoutes";
import EmployeeRoutes from "./DashboardNavigation/EmployeeRoutes";

const DashboardRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user= JSON.parse(localStorage.getItem('user'));

  const hasRole = (role) => {
    return user.userRole === role;
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main>
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <div>
            {hasRole("admin") && (
              <>
                <AdminRoutes />
                <HRRoutes />
                <EmployeeRoutes />
              </>
            )}
            {hasRole("hr") && (
              <>
                <HRRoutes />
                <EmployeeRoutes />
              </>
            )}
            {(hasRole("employee") || hasRole("franchise")) && <EmployeeRoutes />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardRoutes;
