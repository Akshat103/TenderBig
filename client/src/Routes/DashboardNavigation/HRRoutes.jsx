// HRRoutes.js
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";

//User
import AllEmployee from "../../Admin/partials/dashboard/users/AllEmployee";

//Add users
import AddEmployee from "../../Admin/partials/dashboard/users/AddEmployee";

const HRRoutes = () => {
    return (
        <Routes>

            {/* User */}
            <Route path="/allemployee" element={<PrivateRoute element={AllEmployee} />} />

            {/* Add Users */}
            <Route path="/addemployee" element={<PrivateRoute element={AddEmployee} />} />

        </Routes>
    );
};

export default HRRoutes;
