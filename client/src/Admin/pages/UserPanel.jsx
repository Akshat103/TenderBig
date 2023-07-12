import { useState } from "react";
import Header from "../partials/Header";
import UserDetails from "../partials/dashboard/userDashboards/UserDetails";
import UserSideBar from "../partials/dashboard/userDashboards/UserSideBar";

function UserPanel() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <Header></Header>
            <div className="flex">
                <UserSideBar></UserSideBar>
                <UserDetails></UserDetails>
            </div>
        </>
    );
}

export default UserPanel;
