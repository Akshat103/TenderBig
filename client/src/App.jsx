import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardRoutes from './Routes/DashboardRoutes';
import MainRoutes from './Routes/MainRoutes';
// import {
//   Button,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
// } from "@material-tailwind/react";
import { useEffect, useState } from 'react';
// import UserCards from './userCards/UserDetails';
// import {Dialog} from 'headlessui/react'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainRoutes />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        {/* <Route path="/demo" element={<UserCards />}></Route> */}
      </Routes>
      {/* <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel>
          <Dialog.Title>Deactivate account</Dialog.Title>
          <Dialog.Description>
            This will permanently deactivate your account
          </Dialog.Description>

          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p>

          <button onClick={() => setIsOpen(false)}>Deactivate</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </Dialog> */}
    </BrowserRouter>
  );
};

export default App;