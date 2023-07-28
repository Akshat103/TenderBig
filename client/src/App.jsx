import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardRoutes from './Routes/DashboardRoutes';
import MainRoutes from './Routes/MainRoutes';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        {/* Load non-private routes */}
        <Route path="/*" element={<MainRoutes />} />

        {/* Load private routes when the user is logged in */}
        <Route path="/dashboard/*" element={<DashboardRoutes />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;