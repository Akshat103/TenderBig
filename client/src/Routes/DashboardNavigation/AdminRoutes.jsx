// AdminRoutes.js

import { Route, Routes } from "react-router-dom";
import AdminRoute from "../AdminRoute";

// Users
import DashboardUsers from "../../Admin/partials/dashboard/users/DashboardUsers";
import AllAdmin from "../../Admin/partials/dashboard/users/AllAdmin";
import AllHR from "../../Admin/partials/dashboard/users/AllHR";


//Add users
import AddAdmin from "../../Admin/partials/dashboard/users/AddAdmin";
import AddHR from "../../Admin/partials/dashboard/users/AddHR";

const AdminRoutes = () => {
    return (
        <Routes>
            
            {/* User */}
            <Route path="/users" element={<AdminRoute element={DashboardUsers} />} />
            <Route path="/alladmin" element={<AdminRoute element={AllAdmin} />} />
            <Route path="/allhr" element={<AdminRoute element={AllHR} />} />

            {/* Add Users */}
            <Route path="/addadmin" element={<AdminRoute element={AddAdmin} />} />
            <Route path="/addhr" element={<AdminRoute element={AddHR} />} />

        </Routes>
    );
};

export default AdminRoutes;
