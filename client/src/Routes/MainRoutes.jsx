import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import AdvancedSearch from '../pages/AdvancedSearch';
import TenderListingPage from '../pages/TenderListingPage';
import ContactUsPage from '../pages/ContactPage';
import Tender from '../pages/Tender';
import TenderForm from '../components/Forms';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import TenderByCategaries from '../pages/TenderByCategaries';
import NotFound from '../components/NotFound';
import EarnGems from '../pages/GemRegistration';
import CareerAndManpower from '../pages/sub-pages/CareerAndManpower';
import Seeker from '../pages/sub-pages/Seeker';
import RegAndCert from '../pages/sub-pages/RegAndCert';
import Registration from '../pages/sub-pages/Registration';
import Certification from '../pages/sub-pages/Certification';
import TenderFilling from '../pages/sub-pages/TenderFilling';
import TenderFillingOnline from '../pages/sub-pages/TenderFillingOnline';
import TenderFillingOffline from '../pages/sub-pages/TenderFillingOffline';
import GemListing from '../pages/GemListing';
import Projects from '../pages/ProjectListing';
import AuctionMaterialForm from '../pages/Services/Auction-Material/AuctionMaterialForm'
import JointVenture from '../pages/Services/Joint-Venture/JointVenture';
import TenderResults from '../pages/TenderResults';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Gems from '../pages/Gems';
import GemRegistration from '../pages/GemRegistration';
import GemDetailingListing from '../pages/GemDetailingListing';
// import TenderResults from '../pages/TenderResults';
import Employer from '../pages/sub-pages/Employer';
import UserDetails from '../Admin/partials/dashboard/users/DashboardUserDetail';
import SubscribePage from '../pages/Subscription/Subscribe';
import DasboardUserDetails from "../Admin/partials/dashboard/userDashboards/UserDetails";

import PrivateRoute from './PrivateRoute';
import NotLogedIn from '../components/NotLogedIn';

const MainRoutes = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/gems' element={<Gems />} />
        <Route path="/subscribe" element={<SubscribePage />} />
        <Route path='/tenderfilling' element={<TenderFilling />}></Route>
        <Route path='/regandcert' element={<RegAndCert />}></Route>
        <Route path='/regandcert' element={<RegAndCert />}></Route>
        <Route path='/careerandmanpower' element={<CareerAndManpower />}></Route>
        <Route path="/advance-search" element={<AdvancedSearch />} />
        <Route path="/category" element={<TenderByCategaries />} />
        <Route path="/tender/:referenceNo" element={<Tender />} />
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
        <Route path="/projects" element={<PrivateRoute element={Projects} />} />
        <Route path='/gemslist' element={<PrivateRoute element={GemListing} />} />
        <Route path="/tenderResults" element={<PrivateRoute element={TenderResults} />} />

      </Routes>
      <Footer />
    </>
  );
};

export default MainRoutes;
