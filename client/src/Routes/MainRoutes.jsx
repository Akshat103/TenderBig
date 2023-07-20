import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import AdvancedSearch from '../pages/AdvancedSearch';
import TenderListingPage from '../pages/TenderListingPage';
import ContactUsPage from '../pages/ContactPage';
import Tender from '../pages/Tender';
import TenderForm from '../components/Forms';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import TenderByCategaries from '../pages/TenderByCategaries';
import NotFound from '../components/NotFound';
import EarnGems from '../pages/GemRegistration';
import CareerAndManpower from '../pages/sub-pages/CareerAndManpower';
import Seeker from '../pages/sub-pages/Seeker';
import Employer from '../pages/sub-pages/Employer';
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

const MainRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path='/gems' element={<GemListing />} />
        <Route path='/tenderfilling' element={<TenderFilling />}></Route>
        <Route path='/tenderfillingonline' element={<TenderFillingOnline />}></Route>
        <Route path='/tenderfillingoffline' element={<TenderFillingOffline />}></Route>
        <Route path='/regandcert' element={<RegAndCert />}></Route>
        <Route path='/registration' element={<Registration />}></Route>
        <Route path='/auctionmaterial' element={<AuctionMaterialForm />}></Route>
        <Route path='/jointventure' element={<JointVenture />}></Route>
        <Route path='/certification' element={<Certification />}></Route>
        <Route path='/regandcert' element={<RegAndCert />}></Route>
        <Route path='/seeker' element={<Seeker />}></Route>
        <Route path='/employer' element={<Employer />}></Route>
        <Route path='/careerandmanpower' element={<CareerAndManpower />}></Route>
        <Route path="/gemregistration" element={<EarnGems />}></Route>
        <Route path="/advance-search" element={<AdvancedSearch />} />
        <Route path="/category" element={<TenderByCategaries />} />
        <Route path="/tenders" element={<TenderListingPage />} />
        <Route path="/tender/:referenceNo" element={<Tender />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/forms" element={<TenderForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/tenderResults" element={<TenderResults />} />
      </Routes>
      <Footer />
    </>
  );
};

export default MainRoutes;
