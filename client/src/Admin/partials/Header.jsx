import React, { useState } from 'react';

import SearchModal from '../components/ModalSearch';
import Notifications from '../components/DropdownNotifications';
import Help from '../components/DropdownHelp';
import UserMenu from '../components/DropdownProfile';
import ThemeToggle from '../components/ThemeToggle';

function Header() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className={`sticky top-0 dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30 sm:flex sm:items-center sm:justify-between`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden sm:mr-2"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center">
            {/* Search Modal */}
            <SearchModal
              isOpen={searchModalOpen}
              onClose={() => setSearchModalOpen(false)}
            />

            {/* Notifications */}
            {/* <Notifications />

            {/* Help */}
            {/* <Help />

            {/* User Menu */}
            {/* <UserMenu /> */}

            {/* Theme Toggle */}
            {/* <ThemeToggle
              darkMode={darkMode}
              onToggle={() => setDarkMode(!darkMode)}
            /> */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;