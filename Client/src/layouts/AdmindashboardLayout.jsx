import { adminSidebarItems } from "@/constants";
import { useGlobalContext } from "@/context/GlobalContext";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Bell } from "lucide-react";
import Logo from "@/assets/icons/logo.svg";
import { Button } from "@/components/ui/button";

// TEMPORARY: You should replace this with real auth context
const name = "John";

export default function AdminDashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar items={adminSidebarItems} />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <DashboardHeader />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

const DashboardHeader = () => {
  const { open, setOpen } = useGlobalContext();

  return (
    <div className="w-full bg-white px-4 md:px-10 py-4 md:py-6 flex items-center justify-between shadow-sm border-b">
      {/* Left: Sidebar Toggle & Greeting */}
      <div className="flex items-center gap-4">
        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center"
          >
            <img src={Logo} alt="Menu" className="h-6 w-6" />
          </Button>
        </div>

        {/* Greeting */}
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">
            Hello, {name} 👋
          </h2>
          <p className="text-sm text-muted-foreground">
            Here’s what’s happening today.
          </p>
        </div>
      </div>

      {/* Right: Notifications + Profile */}
      <div className="flex items-center gap-4">
        <button className="relative bg-gray-100 hover:bg-gray-200 transition rounded-full h-10 w-10 flex items-center justify-center">
          <Bell className="h-5 w-5 text-gray-800" />
          {/* Optional Notification Dot */}
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-800 shadow-inner">
          {name.charAt(0)}
        </div>
      </div>
    </div>
  );
};

