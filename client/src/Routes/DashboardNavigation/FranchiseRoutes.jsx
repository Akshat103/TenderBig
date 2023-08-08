// EmployeeRoutes.js
import { Route, Routes } from "react-router-dom";
import AdminRoute from "../AdminRoute";
import { lazy } from 'react';

//Dashboard Home Page
const DashboardHome = lazy(() => import('../../Admin/partials/dashboard/DashboardHome'));

// Users
const RegularUsers = lazy(() => import('../../Admin/partials/dashboard/users/RegularUsers'));

//Add User
const AddUser = lazy(() => import('../../Admin/partials/dashboard/users/AddUser'));

//User Details
const DashboardUserDetail = lazy(() => import('../../Admin/partials/dashboard/users/DashboardUserDetail'));

//Options
const License = lazy(() => import('../../Admin/partials/dashboard/options/licences'));
const Department = lazy(() => import('../../Admin/partials/dashboard/options/department'));
const Sector = lazy(() => import('../../Admin/partials/dashboard/options/sector'));
const Category = lazy(() => import('../../Admin/partials/dashboard/options/category'));
const Product = lazy(() => import('../../Admin/partials/dashboard/options/product'));
const Material = lazy(() => import('../../Admin/partials/dashboard/options/auctionMaterial'));

//Tenders
const AllTendersSection = lazy(() => import('../../Admin/partials/dashboard/tenders/DashboardTenders'));
const Subcontractor = lazy(() => import('../../Admin/partials/dashboard/tenders/SubcontractorTenders'));
const Contractor = lazy(() => import('../../Admin/partials/dashboard/tenders/ContractorTenders'));
const Government = lazy(() => import('../../Admin/partials/dashboard/tenders/GovernmentTenders'));
const Private = lazy(() => import('../../Admin/partials/dashboard/tenders/privateTenders'));
const Gem = lazy(() => import('../../Admin/partials/dashboard/tenders/GemTendersForm'));
const DashboardTenderDetail = lazy(() => import('../../Admin/partials/dashboard/tenders/DashboardTenderDetail'));
const AdminForm = lazy(() => import('../../Admin/partials/dashboard/tenders/AdminTenderForm'));

// Projects
const AddProject = lazy(() => import('../../Admin/partials/dashboard/AddProject'));
const AllProjects = lazy(() => import('../../Admin/partials/dashboard/AllProjects'));
const DashboardProjectDetail = lazy(() => import('../../Admin/partials/dashboard/users/DashboardProjectDetail'));

// Requests

// Contacts
const ContactFormList = lazy(() => import('../../Admin/partials/dashboard/requests/ContactPage'));

//Employer Form
const EmployerForms = lazy(() => import('../../Admin/partials/dashboard/requests/Employer-Form/EmployerForms'));
const EmployerFormDetail = lazy(() => import('../../Admin/partials/dashboard/requests/Employer-Form/EmployerFormDetail'));

//Seeker Form
const Seeker = lazy(() => import('../../Admin/partials/dashboard/requests/Seeker/SeekerForm'));
const SeekerFormDetail = lazy(() => import('../../Admin/partials/dashboard/requests/Seeker/SeekerFormDetail'));

//Company Form
const CompanyList = lazy(() => import('../../Admin/partials/dashboard/requests/Registration-Certification/Certification/Company/Company'));
const CompanyDetails = lazy(() => import('../../Admin/partials/dashboard/requests/Registration-Certification/Certification/Company/CompanyDetails'));

//Individual Form
const IndividualList = lazy(() => import('../../Admin/partials/dashboard/requests/Registration-Certification/Certification/Individual/Individual'));
const IndividualDetails = lazy(() => import('../../Admin/partials/dashboard/requests/Registration-Certification/Certification/Individual/IndividualDetails'));

//Registration Form
const RegistrationList = lazy(() => import('../../Admin/partials/dashboard/requests/Registration-Certification/Registration/Registration'));
const RegistrationDetails = lazy(() => import('../../Admin/partials/dashboard/requests/Registration-Certification/Registration/RegistrationDetail'));


// License Form
const Licenserequests = lazy(() => import('../../Admin/partials/dashboard/requests/License/License'));

//Auction Material Form
const AuctionMaterialDetail = lazy(() => import('../../Admin/partials/dashboard/requests/Auction-Material/AuctionMaterialDetail'));
const AuctionMaterial = lazy(() => import('../../Admin/partials/dashboard/requests/Auction-Material/AuctionMaterial'));

//Joint Venture Form
const JointVentureDetail = lazy(() => import('../../Admin/partials/dashboard/requests/Joint-Venture/JointVentureDetail'));
const JointVenture = lazy(() => import('../../Admin/partials/dashboard/requests/Joint-Venture/JointVenture'));

//Gem Registration Form
const GemRegistrationDetail = lazy(() => import('../../Admin/partials/dashboard/requests/GemRegistration/GemRegistrationDetail'));
const GemRegistration = lazy(() => import('../../Admin/partials/dashboard/requests/GemRegistration/GemRegitration'));

//Tender Online Form
const TenderOnlineDetail = lazy(() => import('../../Admin/partials/dashboard/requests/TenderOnline/TenderOnlineDetail'));
const TenderOnline = lazy(() => import('../../Admin/partials/dashboard/requests/TenderOnline/TenderOnline'));

//Tender Offline Form
const TenderOffline = lazy(() => import('../../Admin/partials/dashboard/requests/TenderOffline'));

//Tender Result
const AdminTenderResultList = lazy(() => import('../../Admin/partials/dashboard/tenders/AdminTenderResultList'));
const AdminTenderResultForm = lazy(() => import('../../Admin/partials/dashboard/tenders/AdminTenderResultForm'));

//Price
const Prices = lazy(() => import('../../Admin/partials/dashboard/Prices'));

//Images
const ImageUpload = lazy(() => import('../../Admin/partials/dashboard/ImageUpload'));

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
