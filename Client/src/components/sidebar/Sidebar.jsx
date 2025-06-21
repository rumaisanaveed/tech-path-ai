import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "@/assets/icons/logo.svg";
import Logout from "@/assets/icons/sidebar/logout.svg";
import { Settings } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { useGlobalContext } from "@/context/GlobalContext";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar({ items, variant = "sidebar" }) {
  const location = useLocation();
  const { open, setOpen } = useGlobalContext();
  const { logout } = useAuth();

  // TODO : fix the active item styling on admin screens
  // Fix the width of sidebar on admin pages

  return (
    <>
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed z-50 top-0 left-0 h-full bg-white border-r w-64 p-6 space-y-10 md:relative md:translate-x-0 md:block transition-transform",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="text-base font-normal flex items-center gap-2 pl-4">
          <img src={Logo} alt="logo" className="w-6 h-6" />
          Career Mentor
        </div>

        {/* Nav Links */}
        <nav className="space-y-1">
          {items.map((item) => {
            // handling active states differently on mobile menu and sidebar
            const isActive =
              variant === "sidebar"
                ? item.href === "/user/dashboard"
                  ? location.pathname === item.href
                  : location.pathname.startsWith(item.href)
                : location.pathname === item.href;

            return (
              <SidebarItem key={item.label} item={{ ...item, isActive }} />
            );
          })}
        </nav>

        {/* Bottom buttons */}
        {variant === "sidebar" ? (
          <div className="absolute bottom-6 left-6 right-6">
            <SidebarItem
              item={{
                label: "Settings",
                href: "/user/dashboard/settings",
                icon: Settings,
                isActive: location.pathname === "/dashboard/settings",
              }}
            />

            <Button
              variant="ghost"
              className="w-full flex justify-start gap-3 text text-muted-foreground text-sm font-medium"
              onClick={logout}
            >
              <img src={Logout} className="w-5 h-5" alt="logout" />
              Logout
            </Button>
          </div>
        ) : (
          <></>
        )}
      </aside>

      {/* Dimmed overlay for mobile menu */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
