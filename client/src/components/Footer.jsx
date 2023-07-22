import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="mt-8 w-full pb-16 pt-1 px-4 md:px-6 lg:px-8 xl:px-10 text-white bg-[#212121]">
        <div className="max-w-6xl mx-auto mb-[152px] mt-10">
          <div className="">
            <div className="container flex flex-col md:flex-row justify-center cursor-pointer">
              <Link
                to="/"
                className="text-white-600 hover:text-black px-3 py-2 text-lg font-medium transition-colors duration-300 rounded-md mb-3 md:mb-0 md:mr-4"
              >
                Home
              </Link>
              <Link
                to="/tenders"
                className="text-white-600 hover:text-black px-3 py-2 text-lg font-medium transition-colors duration-300 rounded-md mb-3 md:mb-0 md:mr-4"
              >
                Tenders
              </Link>
              <Link
                to="/gemregistration"
                className="text-white-600 hover:text-black px-3 py-2 text-lg font-medium transition-colors duration-300 rounded-md mb-3 md:mb-0 md:mr-4"
              >
                Gems Registration
              </Link>
              <Link
                to="/forms"
                className="text-white-600 hover:text-black px-3 py-2 text-lg font-medium transition-colors duration-300 rounded-md mb-3 md:mb-0 md:mr-4"
              >
                Apply For Tender
              </Link>
              <Link
                to="/contact"
                className="text-white-600 hover:text-black px-3 py-2 text-lg font-medium transition-colors duration-300 rounded-md"
              >
                Contact
              </Link>
            </div>
            <hr className="border-white border-b-1 mb-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
            <div>
              <h3 className="text-xl font-sans mb-4">COMPANY</h3>
              <ul className="mb-4">
                <li className="mb-2">
                  <a className="font-sans font-light" href="/about">
                    About Us
                  </a>
                </li>
                <li className="mb-2">
                  <a className="font-sans font-light" href="/partner">
                    Partner with us
                  </a>
                </li>
                <li className="mb-2">
                  <a className="font-sans font-light" href="/blog">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-sans mb-4">LEGAL</h3>
              <ul className="mb-4">
                <li className="mb-2">
                  <a className="font-sans font-light" href="/privacy">
                    Privacy Policy
                  </a>
                </li>
                <li className="mb-2">
                  <a className="font-sans font-light" href="/terms">
                    Terms of Use
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-sans mb-4">CONTACT</h3>
              <ul className="mb-4">
                <li className="mb-2">
                  <span className="inline-block w-4 mr-2">
                    <img
                      src="https://zetapp.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FEmailIcon.58cee685.png&w=32&q=75"
                      alt="Email Icon"
                      width={20}
                      height={20}
                    />
                  </span>
                  hi@tenderbig.in
                </li>
                <li className="mb-2">
                  <span className="inline-block w-4 mr-2">
                    <img
                      src="https://zetapp.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPhoneIcon.dcc030db.png&w=32&q=75"
                      alt="Call Icon"
                      width={20}
                      height={20}
                    />
                  </span>
                  +91-3453574072
                </li>
                <li className="mb-2">
                  <div className=" flex mr-2">
                    <img
                      src="https://www.svgrepo.com/show/430111/address-pin-location.svg"
                      alt="Adress"
                      width={20}
                      height={20}
                      className=""
                    />
                    <p className="ml-1">S-30, 2nd floor Dwarika tower</p>
                    </div>
                    <p className="ml-6">central spine, vidhyadhar nagar, jaipur, 302039</p>
                  
                </li>
              </ul>
            </div>
            <div>
              <div className="">
                <h3 className="text-xl font-sans mb-4">SOCIAL</h3>
              </div>
              <div className="flex space-x-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://zetapp.in/_next/static/media/linkedin.99e56649.svg"
                    alt="LinkedIn Icon"
                    width={32}
                    height={32}
                  />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://zetapp.in/_next/static/media/instagram.146ba33a.svg"
                    alt="Instagram Icon"
                    width={32}
                    height={32}
                  />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://zetapp.in/_next/static/media/facebook.cccadfff.svg"
                    alt="Facebook Icon"
                    width={32}
                    height={32}
                  />
                </a>
                <a
                  href="https://telegram.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://zetapp.in/_next/static/media/TelegramImg.2d51b03f.svg"
                    alt="Telegram Icon"
                    width={32}
                    height={32}
                  />
                </a>
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://zetapp.in/_next/static/media/WhatsappImg.a5c0a9a6.svg"
                    alt="WhatsApp Icon"
                    width={32}
                    height={32}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
