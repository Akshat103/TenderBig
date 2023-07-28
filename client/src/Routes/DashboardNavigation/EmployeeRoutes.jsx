// EmployeeRoutes.js
import { Route, Routes } from "react-router-dom";
import AdminRoute from "../AdminRoute";

// Users
import { lazy } from 'react';
const AllFranchise = lazy(() => import('../../Admin/partials/dashboard/users/AllFranchise'));

//Add User
const AddFranchise = lazy(() => import('../../Admin/partials/dashboard/users/AddFranchise'));

const EmployeeRoutes = () => {
  return (
    <Routes>

      {/*Users*/}
      <Route path="/allfranchise" element={<AdminRoute element={AllFranchise} />} />

      {/* Add Users */}
      <Route path="/addfranchise" element={<AdminRoute element={AddFranchise} />} />

    </Routes>
  );
};

export default EmployeeRoutes;
