// EmployeeRoutes.js
import { Route, Routes } from "react-router-dom";
import AdminRoute from "../AdminRoute";

// Users
import AllFranchise from "../../Admin/partials/dashboard/users/AllFranchise";

//Add User
import AddFranchise from "../../Admin/partials/dashboard/users/AddFranchise";

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
