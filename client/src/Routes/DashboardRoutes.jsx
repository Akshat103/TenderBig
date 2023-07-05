import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import DashboardHome from '../Admin/partials/dashboard/DashboardHome';
//Tenders
import AllTendersSection from '../Admin/partials/dashboard/tenders/DashboardTenders';
import Subcontractor from '../Admin/partials/dashboard/tenders/SubcontractorTenders';
import Contractor from '../Admin/partials/dashboard/tenders/ContractorTenders';
import AdminForm from '../Admin/partials/dashboard/tenders/AdminTenderForm';
import DashboardTenderDetail from '../Admin/partials/dashboard/tenders/DashboardTenderDetail';

//Users
import AddAdmin from '../Admin/partials/dashboard/users/AddAdmin';
import AddEmployee from '../Admin/partials/dashboard/users/AddEmployee';
import AddHR from '../Admin/partials/dashboard/users/Addhr';

import AllAdmin from '../Admin/partials/dashboard/users/AllAdmin';
import AllEmployee from '../Admin/partials/dashboard/users/AllEmployee';
import AllHR from '../Admin/partials/dashboard/users/AllHR';
import DashboardUsers from '../Admin/partials/dashboard/users/DashboardUsers';
import DashboardUserDetail from '../Admin/partials/dashboard/users/DashboardUserDetail';

import DashboardCurrentTenders from '../Admin/partials/dashboard/DashboardCurrentTenders'

//Contact Requests
import Seeker from '../Admin/partials/dashboard/requests/Seeker/SeekerForm';
import SeekerFormDetail from '../Admin/partials/dashboard/requests/Seeker/SeekerFormDetail';
import RegistrationList from '../Admin/partials/dashboard/requests/Registration-Certification/Registration/Registration';
import RegistrationDetails from '../Admin/partials/dashboard/requests/Registration-Certification/Registration/RegistrationDetail';
import IndividualDetails from '../Admin/partials/dashboard/requests/Registration-Certification/Certification/Individual/IndividualDetails';
import IndividualList from '../Admin/partials/dashboard/requests/Registration-Certification/Certification/Individual/Individual';
import CompanyDetails from '../Admin/partials/dashboard/requests/Registration-Certification/Certification/Company/CompanyDetails';
import CompanyList from '../Admin/partials/dashboard/requests/Registration-Certification/Certification/Company/Company';
import EmployerForms from '../Admin/partials/dashboard/requests/Employer-Form/EmployerForms';
import EmployerFormDetail from '../Admin/partials/dashboard/requests/Employer-Form/EmployerFormDetail';
import ContactFormList from '../Admin/partials/dashboard/requests/ContactPage';
import CareerManPower from '../Admin/partials/dashboard/requests/Career&ManPower';
import AuctionMaterial from '../Admin/partials/dashboard/requests/Auction-Material';
import JointVenture from '../Admin/partials/dashboard/requests/Joint-Venture';
import License from '../Admin/partials/dashboard/requests/License/License';
import OnlineBidding from '../Admin/partials/dashboard/requests/Online-Bidding';
import RegistrationCertification from '../Admin/partials/dashboard/requests/RegistrationCertificate';
import TenderResult from '../Admin/partials/dashboard/requests/Tender-Result';

//Options
import Department from '../Admin/partials/dashboard/options/department';
import Sector from '../Admin/partials/dashboard/options/sector';
import Category from '../Admin/partials/dashboard/options/category';
import Product from '../Admin/partials/dashboard/options/product';


const DashboardRoutes = () => {
  return (
    <Routes>
      {/* <Route
        path="/admin"
        element={<PrivateRoute element={DashboardHome} />}
      /> */}

      {/* Users */}
      <Route
        path="/users"
        element={<PrivateRoute element={DashboardUsers} />}
      />
      <Route
        path="/user/:userId"
        element={<PrivateRoute element={DashboardUserDetail} />}
      />
      <Route
        path="/alladmin"
        element={<PrivateRoute element={AllAdmin} />}
      />
      <Route
        path="/allhr"
        element={<PrivateRoute element={AllHR} />}
      />
      <Route
        path="/allemployee"
        element={<PrivateRoute element={AllEmployee} />}
      />

      {/* Add User */}
      <Route
        path="/addadmin"
        element={<PrivateRoute element={AddAdmin} />}
      />
      <Route
        path="/addhr"
        element={<PrivateRoute element={AddHR} />}
      />
      <Route
        path="/addemployee"
        element={<PrivateRoute element={AddEmployee} />}
      />

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
        path="/license"
        element={<PrivateRoute element={License} />}
      />
      
      <Route
        path="/contact"
        element={<PrivateRoute element={ContactFormList} />}
      />
      <Route
        path="/career&manpower"
        element={<PrivateRoute element={CareerManPower} />}
      />
      <Route
        path="/actionmaterial"
        element={<PrivateRoute element={AuctionMaterial} />}
      />
      <Route
        path="/jointventure"
        element={<PrivateRoute element={JointVenture} />}
      />
      
      <Route
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
      />

      {/* Options */}
      <Route
        path="/department"
        element={<PrivateRoute element={Department} />}
      />
      <Route
        path="/category"
        element={<PrivateRoute element={Category} />}
      />
      <Route
        path="/sector"
        element={<PrivateRoute element={Sector} />}
      />
      <Route
        path="/product"
        element={<PrivateRoute element={Product} />}
      />
    </Routes>
  );
};

export default DashboardRoutes;
