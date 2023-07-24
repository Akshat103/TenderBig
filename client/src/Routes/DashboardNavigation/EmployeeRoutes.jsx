// EmployeeRoutes.js
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";

//Dashboard Home Page
import DashboardHome from "../../Admin/partials/dashboard/DashboardHome";

// Users
import RegularUsers from "../../Admin/partials/dashboard/users/RegularUsers";
import AllFranchise from "../../Admin/partials/dashboard/users/AllFranchise";

//Add User
import AddUser from "../../Admin/partials/dashboard/users/AddUser";
import AddFranchise from "../../Admin/partials/dashboard/users/AddFranchise";

//User Details
import DashboardUserDetail from "../../Admin/partials/dashboard/users/DashboardUserDetail";

//Options
import License from "../../Admin/partials/dashboard/options/licences";
import Department from "../../Admin/partials/dashboard/options/department";
import Sector from "../../Admin/partials/dashboard/options/sector";
import Category from "../../Admin/partials/dashboard/options/category";
import Product from "../../Admin/partials/dashboard/options/product";
import Material from '../../Admin/partials/dashboard/options/auctionMaterial';

//Tenders
import AllTendersSection from "../../Admin/partials/dashboard/tenders/DashboardTenders";
import Subcontractor from "../../Admin/partials/dashboard/tenders/SubcontractorTenders";
import Contractor from "../../Admin/partials/dashboard/tenders/ContractorTenders";
import Government from "../../Admin/partials/dashboard/tenders/GovernmentTenders";
import Private from "../../Admin/partials/dashboard/tenders/privateTenders";
import Gem from "../../Admin/partials/dashboard/tenders/GemTendersForm";
import DashboardTenderDetail from "../../Admin/partials/dashboard/tenders/DashboardTenderDetail";
import AdminForm from "../../Admin/partials/dashboard/tenders/AdminTenderForm";

// Projects
import AddProject from '../../Admin/partials/dashboard/AddProject';
import AllProjects from "../../Admin/partials/dashboard/AllProjects";
import DashboardProjectDetail from "../../Admin/partials/dashboard/users/DashboardProjectDetail";

// Requests

// Contacts
import ContactFormList from "../../Admin/partials/dashboard/requests/ContactPage";

//Employer Form
import EmployerForms from "../../Admin/partials/dashboard/requests/Employer-Form/EmployerForms";
import EmployerFormDetail from "../../Admin/partials/dashboard/requests/Employer-Form/EmployerFormDetail";

//Seeker Form
import Seeker from "../../Admin/partials/dashboard/requests/Seeker/SeekerForm";
import SeekerFormDetail from "../../Admin/partials/dashboard/requests/Seeker/SeekerFormDetail";

//Company Form
import CompanyList from "../../Admin/partials/dashboard/requests/Registration-Certification/Certification/Company/Company";
import CompanyDetails from "../../Admin/partials/dashboard/requests/Registration-Certification/Certification/Company/CompanyDetails";

//Individual Form
import IndividualList from "../../Admin/partials/dashboard/requests/Registration-Certification/Certification/Individual/Individual";
import IndividualDetails from "../../Admin/partials/dashboard/requests/Registration-Certification/Certification/Individual/IndividualDetails";

//Registration Form
import RegistrationList from "../../Admin/partials/dashboard/requests/Registration-Certification/Registration/Registration";
import RegistrationDetails from "../../Admin/partials/dashboard/requests/Registration-Certification/Registration/RegistrationDetail";

// License Form
import Licenserequests from "../../Admin/partials/dashboard/requests/License/License";

//Auction Material Form
import AuctionMaterialDetail from "../../Admin/partials/dashboard/requests/Auction-Material/AuctionMaterialDetail";
import AuctionMaterial from "../../Admin/partials/dashboard/requests/Auction-Material/AuctionMaterial";

//Joint Venture Form
import JointVentureDetail from "../../Admin/partials/dashboard/requests/Joint-Venture/JointVentureDetail";
import JointVenture from "../../Admin/partials/dashboard/requests/Joint-Venture/JointVenture";

//Gem Registration Form
import GemRegistrationDetail from "../../Admin/partials/dashboard/requests/GemRegistration/GemRegistrationDetail";
import GemRegistration from "../../Admin/partials/dashboard/requests/GemRegistration/GemRegitration";

//Tender Online Form
import TenderOnlineDetail from "../../Admin/partials/dashboard/requests/TenderOnline/TenderOnlineDetail";
import TenderOnline from "../../Admin/partials/dashboard/requests/TenderOnline/TenderOnline";

//Tender Offline Form
import TenderOffline from "../../Admin/partials/dashboard/requests/TenderOffline";

//Tender Result
import AdminTenderResultList from "../../Admin/partials/dashboard/tenders/AdminTenderResultList";
import AdminTenderResultForm from "../../Admin/partials/dashboard/tenders/AdminTenderResultForm";

//Price
import Prices from "../../Admin/partials/dashboard/Prices";

//Images
import ImageUpload from "../../Admin/partials/dashboard/ImageUpload";

const EmployeeRoutes = () => {
  return (
    <Routes>

      <Route path="/admin" element={<PrivateRoute element={DashboardHome} />} />

      {/*Users*/}
      <Route path="/allfranchise" element={<PrivateRoute element={AllFranchise} />} />
      <Route path="/allusers" element={<PrivateRoute element={RegularUsers} />} />

      {/* Add Users */}
      <Route path="/addfranchise" element={<PrivateRoute element={AddFranchise} />} />
      <Route path="/adduser" element={<PrivateRoute element={AddUser} />} />

      {/* Users Details */}
      <Route path="/user/:userId" element={<PrivateRoute element={DashboardUserDetail} />} />

      {/* Options */}
      <Route path="/department" element={<PrivateRoute element={Department} />} />
      <Route path="/category" element={<PrivateRoute element={Category} />} />
      <Route path="/sector" element={<PrivateRoute element={Sector} />} />
      <Route path="/product" element={<PrivateRoute element={Product} />} />
      <Route path="/license" element={<PrivateRoute element={License} />} />
      <Route path="/auctionmaterial" element={<PrivateRoute element={Material} />} />

      {/* Tenders */}
      <Route path="/tenders" element={<PrivateRoute element={AllTendersSection} />} />
      <Route path="/contractor" element={<PrivateRoute element={Contractor} />} />
      <Route path="/subcontractor" element={<PrivateRoute element={Subcontractor} />} />
      <Route path="/Government" element={<PrivateRoute element={Government} />} />
      <Route path="/Gem" element={<PrivateRoute element={Gem} />} />
      <Route path="/Private" element={<PrivateRoute element={Private} />} />
      <Route path="/tender/forms" element={<PrivateRoute element={AdminForm} />} />
      <Route path="/tender/:tenderId" element={<PrivateRoute element={DashboardTenderDetail} />} />

      {/* Projects */}
      <Route path="/addproject" element={<PrivateRoute element={AddProject} />} />
      <Route path="/allproject" element={<PrivateRoute element={AllProjects} />} />
      <Route path="/allprojects/:projectId" element={<PrivateRoute element={DashboardProjectDetail} />} />

      {/* Requests */}
      <Route path="/contact" element={<PrivateRoute element={ContactFormList} />} />

      {/* Employer */}
      <Route path="/employerrequests" element={<PrivateRoute element={EmployerForms} />} />
      <Route path="/employerrequests/:id" element={<PrivateRoute element={EmployerFormDetail} />} />

      {/* Seeker */}
      <Route path="/seekerrequests" element={<PrivateRoute element={Seeker} />} />
      <Route path="/seekerrequests/:id" element={<PrivateRoute element={SeekerFormDetail} />} />

      {/* Company */}
      <Route path="/companyrequests" element={<PrivateRoute element={CompanyList} />} />
      <Route path="/companyrequests/:id" element={<PrivateRoute element={CompanyDetails} />} />

      {/* Individual */}
      <Route path="/individualrequests" element={<PrivateRoute element={IndividualList} />} />
      <Route path="/individualrequests/:id" element={<PrivateRoute element={IndividualDetails} />} />

      {/* Registration */}
      <Route path="/registrationrequests" element={<PrivateRoute element={RegistrationList} />} />
      <Route path="/registrationrequests/:id" element={<PrivateRoute element={RegistrationDetails} />} />

      {/* License */}
      <Route path="/licenserequests" element={<PrivateRoute element={Licenserequests} />} />

      {/* Auction Material*/}
      <Route path="/auctionmaterialrequests" element={<PrivateRoute element={AuctionMaterial} />} />
      <Route path="/auctionmaterialrequests/:id" element={<PrivateRoute element={AuctionMaterialDetail} />} />

      {/* Joint Venture */}
      <Route path="/jointventurerequests" element={<PrivateRoute element={JointVenture} />} />
      <Route path="/jointventurerequests/:id" element={<PrivateRoute element={JointVentureDetail} />} />

      {/* Tender Online */}
      <Route path="/tenderonlinerequests" element={<PrivateRoute element={TenderOnline} />} />
      <Route path="/tenderonlinerequests/:id" element={<PrivateRoute element={TenderOnlineDetail} />} />

      {/* Offline Tender */}
      <Route path="/tenderofflinerequests" element={<PrivateRoute element={TenderOffline} />} />

      {/* Gem Registration */}
      <Route path="/gemregistration" element={<PrivateRoute element={GemRegistration} />} />
      <Route path="/gemregistration/:id" element={<PrivateRoute element={GemRegistrationDetail} />} />

      {/*Tender Result*/}
      <Route path="/tender/results/forms" element={<PrivateRoute element={AdminTenderResultForm} />} />
      <Route path="/tender/results/lists" element={<PrivateRoute element={AdminTenderResultList} />} />

      {/* Form Price */}
      <Route path="/formprices" element={<PrivateRoute element={Prices} />} />

      {/* Images */}
      <Route path="/images" element={<PrivateRoute element={ImageUpload} />} />

    </Routes>
  );
};

export default EmployeeRoutes;
