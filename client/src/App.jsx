import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardRoutes from './Routes/DashboardRoutes';
import MainRoutes from './Routes/MainRoutes';
// import UserCards from './userCards/UserDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainRoutes />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        {/* <Route path="/demo" element={<UserCards />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;