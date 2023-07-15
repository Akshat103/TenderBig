import AdminTenderResultForm from "../Admin/partials/dashboard/tenders/AdminTenderResultForm";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import DashboardHome from "../Admin/partials/dashboard/DashboardHome";
//Tenders
import AllTendersSection from "../Admin/partials/dashboard/tenders/DashboardTenders";
import Subcontractor from "../Admin/partials/dashboard/tenders/SubcontractorTenders";
import Contractor from "../Admin/partials/dashboard/tenders/ContractorTenders";
import Government from "../Admin/partials/dashboard/tenders/GovernmentTenders";
import Private from "../Admin/partials/dashboard/tenders/privateTenders";
import Gem from "../Admin/partials/dashboard/tenders/GemTendersForm";

import AdminForm from "../Admin/partials/dashboard/tenders/AdminTenderForm";
import DashboardTenderDetail from "../Admin/partials/dashboard/tenders/DashboardTenderDetail";

//Users
import AddAdmin from "../Admin/partials/dashboard/users/AddAdmin";
import AddEmployee from "../Admin/partials/dashboard/users/AddEmployee";
import AddHR from "../Admin/partials/dashboard/users/AddHR";
import AddUser from "../Admin/partials/dashboard/users/AddUser";

import AllAdmin from "../Admin/partials/dashboard/users/AllAdmin";
import AllEmployee from "../Admin/partials/dashboard/users/AllEmployee";
import AllHR from "../Admin/partials/dashboard/users/AllHR";
import DashboardUsers from "../Admin/partials/dashboard/users/DashboardUsers";
import DashboardUserDetail from "../Admin/partials/dashboard/users/DashboardUserDetail";

import DashboardCurrentTenders from "../Admin/partials/dashboard/DashboardCurrentTenders";

//Contact Requests
import GemRegistrationDetail from "../Admin/partials/dashboard/requests/GemRegistration/GemRegistrationDetail";
import GemRegistration from "../Admin/partials/dashboard/requests/GemRegistration/GemRegitration";
import TenderOnlineDetail from "../Admin/partials/dashboard/requests/TenderOnline/TenderOnlineDetail";
import TenderOnline from "../Admin/partials/dashboard/requests/TenderOnline/TenderOnline";
import JointVentureDetail from "../Admin/partials/dashboard/requests/Joint-Venture/JointVentureDetail";
import JointVenture from "../Admin/partials/dashboard/requests/Joint-Venture/JointVenture";
import AuctionMaterialDetail from "../Admin/partials/dashboard/requests/Auction-Material/AuctionMaterialDetail";
import AuctionMaterial from "../Admin/partials/dashboard/requests/Auction-Material/AuctionMaterial";
import Seeker from "../Admin/partials/dashboard/requests/Seeker/SeekerForm";
import SeekerFormDetail from "../Admin/partials/dashboard/requests/Seeker/SeekerFormDetail";
import RegistrationList from "../Admin/partials/dashboard/requests/Registration-Certification/Registration/Registration";
import RegistrationDetails from "../Admin/partials/dashboard/requests/Registration-Certification/Registration/RegistrationDetail";
import IndividualDetails from "../Admin/partials/dashboard/requests/Registration-Certification/Certification/Individual/IndividualDetails";
import IndividualList from "../Admin/partials/dashboard/requests/Registration-Certification/Certification/Individual/Individual";
import CompanyDetails from "../Admin/partials/dashboard/requests/Registration-Certification/Certification/Company/CompanyDetails";
import CompanyList from "../Admin/partials/dashboard/requests/Registration-Certification/Certification/Company/Company";
import EmployerForms from "../Admin/partials/dashboard/requests/Employer-Form/EmployerForms";
import EmployerFormDetail from "../Admin/partials/dashboard/requests/Employer-Form/EmployerFormDetail";
import ContactFormList from "../Admin/partials/dashboard/requests/ContactPage";
import TenderOffline from "../Admin/partials/dashboard/requests/TenderOffline";
// import JointVenture from '../Admin/partials/dashboard/requests/Joint-Venture';
import Licenserequests from "../Admin/partials/dashboard/requests/License/License";
import OnlineBidding from "../Admin/partials/dashboard/requests/Online-Bidding";
import RegistrationCertification from "../Admin/partials/dashboard/requests/RegistrationCertificate";
import TenderResult from "../Admin/partials/dashboard/requests/Tender-Result";

//Options
import License from "../Admin/partials/dashboard/options/licences";
import Department from "../Admin/partials/dashboard/options/department";
import Sector from "../Admin/partials/dashboard/options/sector";
import Category from "../Admin/partials/dashboard/options/category";
import Product from "../Admin/partials/dashboard/options/product";

import ProjectListing from '../Admin/partials/ProjectListing';
import AddProject from '../Admin/partials/dashboard/AddProject';
import Material from '../Admin/partials/dashboard/options/auctionMaterial';

import Prices from "../Admin/partials/dashboard/Prices";

// adding routes for user dashboard
import UserPanel from "../Admin/pages/UserPanel";
import AllProjects from "../Admin/partials/dashboard/AllProjects";
import DashboardProjectDetail from "../Admin/partials/dashboard/users/DashboardProjectDetail";
import AdminTenderResultList from "../Admin/partials/dashboard/tenders/AdminTenderResultList";
// import Government from '../Admin/partials/dashboard/tenders/GovernmentTenders';
// import UserDetails from '../Admin/partials/dashboard/users/DashboardUserDetail';



const DashboardRoutes = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/admin"
          element={<PrivateRoute element={DashboardHome} />}
        />

        {/* Users */}
        <Route
          path="/users"
          element={<PrivateRoute element={DashboardUsers} />}
        />
        <Route
          path="/user/:userId"
          element={<PrivateRoute element={DashboardUserDetail} />}
        />
        <Route path="/alladmin" element={<PrivateRoute element={AllAdmin} />} />
        <Route path="/allhr" element={<PrivateRoute element={AllHR} />} />
        <Route
          path="/allemployee"
          element={<PrivateRoute element={AllEmployee} />}
        />

        {/* Add User */}
        <Route path="/addadmin" element={<PrivateRoute element={AddAdmin} />} />
        <Route path="/addhr" element={<PrivateRoute element={AddHR} />} />
        <Route
          path="/addemployee"
          element={<PrivateRoute element={AddEmployee} />}
        />
        <Route path="/adduser" element={<PrivateRoute element={AddUser} />} />

        {/* Tenders */}
        <Route
          path="/tenders"
          element={<PrivateRoute element={AllTendersSection} />}
        />
        <Route
          path="/contractor"
          element={<PrivateRoute element={Contractor} />}
        />
        <Route
          path="/subcontractor"
          element={<PrivateRoute element={Subcontractor} />}
        />

        <Route
          path="/Government"
          element={<PrivateRoute element={Government} />}
        />
        <Route path="/Gem" element={<PrivateRoute element={Gem} />} />

        <Route path="/Private" element={<PrivateRoute element={Private} />} />
        <Route
          path="/tenders/currenttenders"
          element={<PrivateRoute element={DashboardCurrentTenders} />}
        />
        <Route
          path="/tender/forms"
          element={<PrivateRoute element={AdminForm} />}
        />
        <Route
          path="/tender/:tenderId"
          element={<PrivateRoute element={DashboardTenderDetail} />}
        />

        {/*Tender Result*/}
        <Route
          path="/tender/results/forms"
          element={<PrivateRoute element={AdminTenderResultForm} />}
        />
        <Route
          path="/tender/results/lists"
          element={<PrivateRoute element={AdminTenderResultList} />}
        />

        {/* <Router
          path='//tenderResults/:TenderResultId'
          element={ }
        /> */}

        <Route path="/userDashboard" element={<UserPanel />} />

        {/* Requests */}

        {/* Employer */}
        <Route
          path="/employerrequests"
          element={<PrivateRoute element={EmployerForms} />}
        />
        <Route
          path="/employerrequests/:id"
          element={<PrivateRoute element={EmployerFormDetail} />}
        />

        {/* Company */}
        <Route
          path="/companyrequests"
          element={<PrivateRoute element={CompanyList} />}
        />
        <Route
          path="/companyrequests/:id"
          element={<PrivateRoute element={CompanyDetails} />}
        />

        {/* Individual */}
        <Route
          path="/individualrequests"
          element={<PrivateRoute element={IndividualList} />}
        />
        <Route
          path="/individualrequests/:id"
          element={<PrivateRoute element={IndividualDetails} />}
        />

        {/* Registration */}
        <Route
          path="/registrationrequests"
          element={<PrivateRoute element={RegistrationList} />}
        />
        <Route
          path="/registrationrequests/:id"
          element={<PrivateRoute element={RegistrationDetails} />}
        />

        {/* Seeker */}
        <Route
          path="/seekerrequests"
          element={<PrivateRoute element={Seeker} />}
        />
        <Route
          path="/seekerrequests/:id"
          element={<PrivateRoute element={SeekerFormDetail} />}
        />

        {/* License */}
        <Route
          path="/licenserequests"
          element={<PrivateRoute element={Licenserequests} />}
        />

        {/* Auction Material*/}
        <Route
          path="/auctionmaterialrequests"
          element={<PrivateRoute element={AuctionMaterial} />}
        />
        <Route
          path="/auctionmaterialrequests/:id"
          element={<PrivateRoute element={AuctionMaterialDetail} />}
        />

        {/* Joint Venture */}
        <Route
          path="/jointventurerequests"
          element={<PrivateRoute element={JointVenture} />}
        />
        <Route
          path="/jointventurerequests/:id"
          element={<PrivateRoute element={JointVentureDetail} />}
        />

        {/* Tender Online */}
        <Route
          path="/tenderonlinerequests"
          element={<PrivateRoute element={TenderOnline} />}
        />
        <Route
          path="/tenderonlinerequests/:id"
          element={<PrivateRoute element={TenderOnlineDetail} />}
        />

        {/* Gem Registration */}
        <Route
          path="/gemregistration"
          element={<PrivateRoute element={GemRegistration} />}
        />
        <Route
          path="/gemregistration/:id"
          element={<PrivateRoute element={GemRegistrationDetail} />}
        />

        <Route
          path="/contact"
          element={<PrivateRoute element={ContactFormList} />}
        />

        {/* Offline Tender */}
        <Route
          path="/tenderofflinerequests"
          element={<PrivateRoute element={TenderOffline} />}
        />

        {/* <Route
          path="/onlinebidding"
          element={<PrivateRoute element={OnlineBidding} />}
        />
        <Route
          path="/regcert"
          element={<PrivateRoute element={RegistrationCertification} />}
        />
        <Route
          path="/tenderresult"
          element={<PrivateRoute element={TenderResult} />}
        /> */}

        {/* Options */}
        <Route
          path="/department"
          element={<PrivateRoute element={Department} />}
        />
        <Route path="/category" element={<PrivateRoute element={Category} />} />
        <Route path="/sector" element={<PrivateRoute element={Sector} />} />
        <Route path="/product" element={<PrivateRoute element={Product} />} />
        <Route path="/license" element={<PrivateRoute element={License} />} />
        <Route
          path="/auctionmaterial"
          element={<PrivateRoute element={Material} />}
        />

        <Route path="/formprices" element={<PrivateRoute element={Prices} />} />

        {/* Temp */}
        <Route
          path="/addproject"
          element={<PrivateRoute element={AddProject} />}
        />
        <Route
          path="/allproject"
          element={<PrivateRoute element={AllProjects} />}
        />
        <Route
          path="/allprojects/:projectId"
          element={<PrivateRoute element={DashboardProjectDetail} />}
        />

        <Route path="/test" element={<Prices />} />
        <Route path="*" element={"NOT Allowed"} />
      </Routes>
    </div>
  );
};

export default DashboardRoutes;
