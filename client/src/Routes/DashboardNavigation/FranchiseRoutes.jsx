// EmployeeRoutes.js
import { Route, Routes } from "react-router-dom";
import AdminRoute from "../AdminRoute";

//Dashboard Home Page
import DashboardHome from "../../Admin/partials/dashboard/DashboardHome";

// Users
import RegularUsers from "../../Admin/partials/dashboard/users/RegularUsers";

//Add User
import AddUser from "../../Admin/partials/dashboard/users/AddUser";

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

const FranchiseRoutes = () => {
  return (
    <Routes>

      <Route path="/admin" element={<AdminRoute element={DashboardHome} />} />

      {/*Users*/}
      <Route path="/allusers" element={<AdminRoute element={RegularUsers} />} />

      {/* Add Users */}
      <Route path="/adduser" element={<AdminRoute element={AddUser} />} />

      {/* Users Details */}
      <Route path="/user/:userId" element={<AdminRoute element={DashboardUserDetail} />} />

      {/* Options */}
      <Route path="/department" element={<AdminRoute element={Department} />} />
      <Route path="/category" element={<AdminRoute element={Category} />} />
      <Route path="/sector" element={<AdminRoute element={Sector} />} />
      <Route path="/product" element={<AdminRoute element={Product} />} />
      <Route path="/license" element={<AdminRoute element={License} />} />
      <Route path="/auctionmaterial" element={<AdminRoute element={Material} />} />

      {/* Tenders */}
      <Route path="/tenders" element={<AdminRoute element={AllTendersSection} />} />
      <Route path="/contractor" element={<AdminRoute element={Contractor} />} />
      <Route path="/subcontractor" element={<AdminRoute element={Subcontractor} />} />
      <Route path="/Government" element={<AdminRoute element={Government} />} />
      <Route path="/Gem" element={<AdminRoute element={Gem} />} />
      <Route path="/Private" element={<AdminRoute element={Private} />} />
      <Route path="/tender/forms" element={<AdminRoute element={AdminForm} />} />
      <Route path="/tender/:tenderId" element={<AdminRoute element={DashboardTenderDetail} />} />

      {/* Projects */}
      <Route path="/addproject" element={<AdminRoute element={AddProject} />} />
      <Route path="/allproject" element={<AdminRoute element={AllProjects} />} />
      <Route path="/allprojects/:projectId" element={<AdminRoute element={DashboardProjectDetail} />} />

      {/* Requests */}
      <Route path="/contact" element={<AdminRoute element={ContactFormList} />} />

      {/* Employer */}
      <Route path="/employerrequests" element={<AdminRoute element={EmployerForms} />} />
      <Route path="/employerrequests/:id" element={<AdminRoute element={EmployerFormDetail} />} />

      {/* Seeker */}
      <Route path="/seekerrequests" element={<AdminRoute element={Seeker} />} />
      <Route path="/seekerrequests/:id" element={<AdminRoute element={SeekerFormDetail} />} />

      {/* Company */}
      <Route path="/companyrequests" element={<AdminRoute element={CompanyList} />} />
      <Route path="/companyrequests/:id" element={<AdminRoute element={CompanyDetails} />} />

      {/* Individual */}
      <Route path="/individualrequests" element={<AdminRoute element={IndividualList} />} />
      <Route path="/individualrequests/:id" element={<AdminRoute element={IndividualDetails} />} />

      {/* Registration */}
      <Route path="/registrationrequests" element={<AdminRoute element={RegistrationList} />} />
      <Route path="/registrationrequests/:id" element={<AdminRoute element={RegistrationDetails} />} />

      {/* License */}
      <Route path="/licenserequests" element={<AdminRoute element={Licenserequests} />} />

      {/* Auction Material*/}
      <Route path="/auctionmaterialrequests" element={<AdminRoute element={AuctionMaterial} />} />
      <Route path="/auctionmaterialrequests/:id" element={<AdminRoute element={AuctionMaterialDetail} />} />

      {/* Joint Venture */}
      <Route path="/jointventurerequests" element={<AdminRoute element={JointVenture} />} />
      <Route path="/jointventurerequests/:id" element={<AdminRoute element={JointVentureDetail} />} />

      {/* Tender Online */}
      <Route path="/tenderonlinerequests" element={<AdminRoute element={TenderOnline} />} />
      <Route path="/tenderonlinerequests/:id" element={<AdminRoute element={TenderOnlineDetail} />} />

      {/* Offline Tender */}
      <Route path="/tenderofflinerequests" element={<AdminRoute element={TenderOffline} />} />

      {/* Gem Registration */}
      <Route path="/gemregistration" element={<AdminRoute element={GemRegistration} />} />
      <Route path="/gemregistration/:id" element={<AdminRoute element={GemRegistrationDetail} />} />

      {/*Tender Result*/}
      <Route path="/tender/results/forms" element={<AdminRoute element={AdminTenderResultForm} />} />
      <Route path="/tender/results/lists" element={<AdminRoute element={AdminTenderResultList} />} />

      {/* Form Price */}
      <Route path="/formprices" element={<AdminRoute element={Prices} />} />

      {/* Images */}
      <Route path="/images" element={<AdminRoute element={ImageUpload} />} />

    </Routes>
  );
};

export default FranchiseRoutes;
