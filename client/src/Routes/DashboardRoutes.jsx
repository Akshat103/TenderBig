import { useState } from "react";

import Sidebar from "../Admin/partials/Sidebar";
import Header from "../Admin/partials/Header";

import AdminRoutes from "./DashboardNavigation/AdminRoutes";
import HRRoutes from "./DashboardNavigation/HRRoutes";
import EmployeeRoutes from "./DashboardNavigation/EmployeeRoutes";
import FranchiseRoutes from "./DashboardNavigation/FranchiseRoutes";

import { Suspense } from 'react';

const DashboardRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const hasRole = (role) => {
    return user.userRole === role;
  };

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <img
          src={`${import.meta.env.BASE_URL}loader.gif`}
          alt="Loading..."
          className="w-24 h-24"
        />
      </div>
    }>
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
                  <FranchiseRoutes />
                </>
              )}
              {hasRole("hr") && (
                <>
                  <HRRoutes />
                  <EmployeeRoutes />
                  <FranchiseRoutes />
                </>
              )}
              {hasRole("employee") && (
                <>
                  <EmployeeRoutes />
                  <FranchiseRoutes />
                </>
              )}
              {hasRole("franchise") && (
                <>
                  <FranchiseRoutes />
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </Suspense>
  );
};

export default DashboardRoutes;
