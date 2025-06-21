import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "../constants";
import Logo from "../assets/icons/logo.svg";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useGlobalContext } from "@/context/GlobalContext";
import Sidebar from "./sidebar/Sidebar";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const { isMediumScreen } = useScreenSize();
  const { open, setOpen } = useGlobalContext();

  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = location.pathname.startsWith("/auth/");

  const { user } = useAuth();

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

  const handleNavigateToHome = () => {
    navigate("/");
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolledPast ? "bg-white/20 backdrop-blur-xl shadow-lg" : "bg-white"
        }`}
      >
        <nav className="z-40 py-6 px-4 md:px-6 lg:px-10 w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* Mobile Logo */}
            <img
              src={Logo}
              alt="logo"
              className="cursor-pointer md:cursor-default"
              onClick={
                isAuthPage
                  ? handleNavigateToHome
                  : () => {
                      if (isMediumScreen) setOpen(true);
                    }
              }
            />
            {/* Desktop Navigation */}
            {/* should redirect the unauthenticated users to home page */}
            {/* else the auth pages won't be visible to authenticated users */}
            <Link
              className="text-2xl hidden md:block font-medium anonymous-font text-logo"
              to={isAuthPage ? "/" : ""}
            >
              <span className="font-semibold">C</span>areer
              <span className="font-semibold">M</span>entor
            </Link>
          </div>

          {/* don't show it on auth pages */}
          {!isAuthPage && (
            <>
              <div
                className={`hidden md:flex items-center space-x-6 text-custom-gray-dark`}
              >
                {navLinks.map((link, index) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={index}
                      to={link.href}
                      className={`relative transition-colors ${
                        isScrolledPast ? "text-black" : "text-custom-gray-dark"
                      } ${
                        isActive
                          ? `after:content-[''] after:absolute after:left-0 after:w-full after:h-[1px] ${
                              isScrolledPast
                                ? "after:bg-black"
                                : "after:bg-custom-gray-dark"
                            } after:-bottom-1 after:translate-y-[3px]`
                          : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              {user ? (
                <Link
                  to={
                    user.role === "admin"
                      ? "/admin/dashboard"
                      : "/user/dashboard"
                  }
                  className="border border-custom-black-dark text-sm md:text-base font-normal rounded-full text-custom-black-dark anonymous-font px-3 py-1 md:px-6 md:py-2"
                >
                  Dashboard
                </Link>
              ) : (
                <button
                  onClick={handleGetStarted}
                  className="border border-custom-black-dark text-sm md:text-base font-normal rounded-full text-custom-black-dark anonymous-font px-3 py-1 md:px-6 md:py-2"
                >
                  Get Started
                </button>
              )}
            </>
          )}
        </nav>
        <hr className="bg-custom-gray-dark w-11/12 block md:hidden mx-auto" />
      </header>

      {/* Mobile Sidebar Menu */}
      {open && <MobileMenu setOpen={setOpen} isAuthPage={isAuthPage} />}
    </>
  );
};

const MobileMenu = ({ setOpen, isAuthPage }) => {
  const { screenSize } = useScreenSize();

  useEffect(() => {
    if (screenSize >= 768) {
      setOpen(false);
    }
  }, [screenSize]);

  return (
    <>
      {!isAuthPage && (
        <Sidebar
          items={navLinks}
          variant="mobile"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
