// HRRoutes.js
import { Route, Routes } from "react-router-dom";
import AdminRoute from "../AdminRoute";

//User
import AllEmployee from "../../Admin/partials/dashboard/users/AllEmployee";

//Add users
import AddEmployee from "../../Admin/partials/dashboard/users/AddEmployee";

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
