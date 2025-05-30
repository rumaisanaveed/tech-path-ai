import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "../constants";
import Logo from "../assets/icons/logo.svg";

const Header = () => {
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // to hide some UI parts on auth pages
  const isAuthPage = location.pathname.startsWith("/auth/");

  useEffect(() => {
    const onScroll = () => {
      setIsScrolledPast(window.scrollY > 0);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleGetStarted = () => {
    navigate("/auth/signup");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolledPast ? "bg-white/20 backdrop-blur-xl shadow-lg" : "bg-white"
      }`}
    >
      <nav className="z-50 py-6 px-4 md:px-6 lg:px-10 w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="logo" />
          <h1
            className="text-2xl hidden md:block font-medium anonymous-font text-logo"
            to="/"
          >
            <span className="font-semibold">C</span>areer
            <span className="font-semibold">M</span>entor
          </h1>
        </div>

        {/* Desktop Navigation */}

        {!isAuthPage && (
          <>
            <div className="hidden md:flex items-center space-x-6 text-custom-gray-dark">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-600 hover:text-gray-900"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <button
              onClick={handleGetStarted}
              className="border border-custom-black-dark text-sm md:text-base font-normal rounded-full text-custom-black-dark anonymous-font px-3 py-1 md:px-6 md:py-2"
            >
              Get Started
            </button>
          </>
        )}
      </nav>
      <hr className="bg-custom-gray-dark w-11/12 block md:hidden mx-auto" />
    </header>
  );
};

export default Header;
