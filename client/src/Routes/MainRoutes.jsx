import { Route, Routes, useNavigate } from 'react-router-dom';

import { lazy, Suspense } from 'react';

// Lazy-loaded components for non-private routes
const Home = lazy(() => import('../pages/Home/Home'));
const Login = lazy(() => import('../pages/auth/Login'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const Signup = lazy(() => import('../pages/auth/Signup'));
const Gems = lazy(() => import('../pages/Gems'));
const SubscribePage = lazy(() => import('../pages/Subscription/Subscribe'));
const TenderFilling = lazy(() => import('../pages/sub-pages/TenderFilling'));
const RegAndCert = lazy(() => import('../pages/sub-pages/RegAndCert'));
const CareerAndManpower = lazy(() => import('../pages/sub-pages/CareerAndManpower'));
const AdvancedSearch = lazy(() => import('../pages/AdvancedSearch'));
const TenderByCategaries = lazy(() => import('../pages/TenderByCategaries'));
const Tender = lazy(() => import('../pages/Tender'));
const GemDetailingListing = lazy(() => import('../pages/GemDetailingListing'));
const ContactUsPage = lazy(() => import('../pages/ContactPage'));
const UserDetails = lazy(() => import('../Admin/partials/dashboard/users/DashboardUserDetail'));
const NotFound = lazy(() => import('../components/NotFound'));
const NotLogedIn = lazy(() => import('../components/NotLogedIn'));

const TenderListingPage = lazy(() => import('../pages/TenderListingPage'));
const TenderForm = lazy(() => import('../components/Forms'));
const EarnGems = lazy(() => import('../pages/GemRegistration'));
const Seeker = lazy(() => import('../pages/sub-pages/Seeker'));
const Registration = lazy(() => import('../pages/sub-pages/Registration'));
const Certification = lazy(() => import('../pages/sub-pages/Certification'));
const TenderFillingOnline = lazy(() => import('../pages/sub-pages/TenderFillingOnline'));
const TenderFillingOffline = lazy(() => import('../pages/sub-pages/TenderFillingOffline'));
const GemListing = lazy(() => import('../pages/GemListing'));
const Projects = lazy(() => import('../pages/ProjectListing'));
const AuctionMaterialForm = lazy(() => import('../pages/Services/Auction-Material/AuctionMaterialForm'));
const JointVenture = lazy(() => import('../pages/Services/Joint-Venture/JointVenture'));
const TenderResults = lazy(() => import('../pages/TenderResults'));
const Navbar = lazy(() => import('../components/Navbar'));
const Footer = lazy(() => import('../components/Footer'));
const Employer = lazy(() => import('../pages/sub-pages/Employer'));
const DasboardUserDetails = lazy(() => import('../Admin/partials/dashboard/userDashboards/UserDetails'));

import PrivateRoute from './PrivateRoute';

const MainRoutes = () => {

  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen">
          <img
            src={`${import.meta.env.BASE_URL}loader.gif`}
            alt="Loading..."
            className="w-24 h-24"
          />
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/gems' element={<Gems />} />
          <Route path="/subscribe" element={<SubscribePage />} />
          <Route path='/tenderfilling' element={<TenderFilling />}></Route>
          <Route path='/regandcert' element={<RegAndCert />}></Route>
          <Route path='/regandcert' element={<RegAndCert />}></Route>
          <Route path='/careerandmanpower' element={<CareerAndManpower />}></Route>
          <Route path="/advance-search" element={<AdvancedSearch />} />
          <Route path="/category" element={<TenderByCategaries />} />
          <Route path="/gem/:referenceNos" element={<GemDetailingListing />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/userDetails" element={<UserDetails />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/user-not-found" element={<NotLogedIn />} />

          {/* Private Routes */}
          <Route path="/userDashboard" element={<PrivateRoute element={DasboardUserDetails} />} />
          <Route path='/seeker' element={<PrivateRoute element={Seeker} />}></Route>
          <Route path='/employer' element={<PrivateRoute element={Employer} />}></Route>
          <Route path='/registration' element={<PrivateRoute element={Registration} />}></Route>
          <Route path='/certification' element={<PrivateRoute element={Certification} />}></Route>
          <Route path='/auctionmaterial' element={<PrivateRoute element={AuctionMaterialForm} />}></Route>
          <Route path='/jointventure' element={<PrivateRoute element={JointVenture} />}></Route>
          <Route path='/tenderfillingonline' element={<PrivateRoute element={TenderFillingOnline} />}></Route>
          <Route path='/tenderfillingoffline' element={<PrivateRoute element={TenderFillingOffline} />}></Route>
          <Route path="/gemregistration" element={<PrivateRoute element={EarnGems} />}></Route>
          <Route path="/forms" element={<PrivateRoute element={TenderForm} />} />
          <Route path="/tenders" element={<PrivateRoute element={TenderListingPage} />} />
          <Route path="/tender/:referenceNo" element={<PrivateRoute element={Tender} />} />
          <Route path="/projects" element={<PrivateRoute element={Projects} />} />
          <Route path='/gemslist' element={<PrivateRoute element={GemListing} />} />
          <Route path="/tenderResults" element={<PrivateRoute element={TenderResults} />} />

        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

export default MainRoutes;
