// HRRoutes.js
import { Route, Routes } from "react-router-dom";
import AdminRoute from "../AdminRoute";

import { lazy } from 'react';

//User
const AllEmployee = lazy(() => import('../../Admin/partials/dashboard/users/AllEmployee'));

//Add users
const AddEmployee = lazy(() => import('../../Admin/partials/dashboard/users/AddEmployee'));

const HRRoutes = () => {
    return (
        <Routes>

            {/* User */}
            <Route path="/allemployee" element={<AdminRoute element={AllEmployee} />} />

            {/* Add Users */}
            <Route path="/addemployee" element={<AdminRoute element={AddEmployee} />} />

        </Routes>
    );
};

export default HRRoutes;
