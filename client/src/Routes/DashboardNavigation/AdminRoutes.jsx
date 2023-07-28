// AdminRoutes.js

import { lazy } from 'react';

import { Route, Routes } from "react-router-dom";

import AdminRoute from "../AdminRoute";

// Users
const DashboardUsers = lazy(() => import('../../Admin/partials/dashboard/users/DashboardUsers'));
const AllAdmin = lazy(() => import('../../Admin/partials/dashboard/users/AllAdmin'));
const AllHR = lazy(() => import('../../Admin/partials/dashboard/users/AllHR'));

//Add users
const AddAdmin = lazy(() => import('../../Admin/partials/dashboard/users/AddAdmin'));
const AddHR = lazy(() => import('../../Admin/partials/dashboard/users/AddHR'));

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
