import Sidebar from "@/components/sidebar/Sidebar";
import { Bell, Search, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import PersonProfile from "@/assets/icons/person-profile.svg";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/context/GlobalContext";
import Logo from "@/assets/icons/logo.svg";
import { TooltipProvider } from "@/components/ui/tooltip";
import { sidebarItems } from "@/constants";

export default function DashboardLayout({ children }) {
  return (
    <TooltipProvider>

    <div className="flex h-screen overflow-hidden">
      <Sidebar items={sidebarItems} />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <DashboardHeader />
        <main className="flex-1">{children}</main>
      </div>
    </div>
    </TooltipProvider>
  );
}

const DashboardHeader = () => {
  const { open, setOpen } = useGlobalContext();
  return (
    <>
      <div className="flex flex-row md:flex-col px-3 md:px-10 py-4 md:py-7">
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center"
          >
            <img src={Logo} alt="mobile menu" />
          </Button>
        </div>
        <header className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 md:w-3/4">
            <div className="p-[2px] rounded-full bg-[#F8F8F8] md:w-full max-w-xs sm:max-w-sm">
              <div className="flex items-center bg-[#F8F8F8] rounded-full px-4 py-2 md:py-2.5 gap-2">
                <Search className="w-4 h-4 text-black" />
                <input
                  type="text"
                  className="w-full outline-none bg-transparent text-sm md:text-base text-black font-normal placeholder:text-black placeholder:font-normal"
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="p-[2px] rounded-full bg-[linear-gradient(90deg,#F3B34E,#FFD272,#59A4C0)] hidden md:block w-64 lg:max-w-40">
              <Link className="flex items-center justify-center gap-2 bg-white text-black rounded-full px-4 py-3">
                <p className="text-sm font-normal">AI Assistant</p>
                <Sparkles color="#000000" size={15} />
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button className="bg-[#F8F8F8] rounded-full h-9 w-9 md:w-12 md:h-12 flex items-center justify-center">
              <Bell color="#000000" size={17} />
            </button>
            <div className="h-8 w-8 md:h-10 md:w-10">
              <img
                src={PersonProfile}
                alt="profile"
                className="h-8 w-8 md:h-10 md:w-10"
              />
            </div>
          </div>
        </header>
      </div>
      <hr className="mt-2 px-3 md:mx-10 my-4 md:mt-3 md:mb-4 border-t border-gray-200" />
    </>
  );
};
