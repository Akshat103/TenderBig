import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardRoutes from './Routes/DashboardRoutes';
import MainRoutes from './Routes/MainRoutes';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
          <Route path="/*" element={<MainRoutes />} />
       </Routes>
    </BrowserRouter>
  );
};

export default App;