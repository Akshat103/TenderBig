// AdminRoutes.js

import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";

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
            <Route path="/users" element={<PrivateRoute element={DashboardUsers} />} />
            <Route path="/alladmin" element={<PrivateRoute element={AllAdmin} />} />
            <Route path="/allhr" element={<PrivateRoute element={AllHR} />} />

            {/* Add Users */}
            <Route path="/addadmin" element={<PrivateRoute element={AddAdmin} />} />
            <Route path="/addhr" element={<PrivateRoute element={AddHR} />} />

        </Routes>
    );
};

export default AdminRoutes;
