import Sidebar from "@/components/sidebar/Sidebar";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { sidebarItems } from "@/constants";
import { useGlobalContext } from "@/context/GlobalContext";
import Logo from "@/assets/icons/logo.svg";

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
      <div className="flex flex-row md:flex-col px-3 md:px-10 py-4 md:py-7 md:hidden">
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
      </div>
      <hr className="mt-2 px-3 md:mx-10 my-4 md:mt-3 md:mb-4 border-t border-gray-200" />
    </>
  );
};
