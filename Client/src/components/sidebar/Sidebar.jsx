import Logo from "@/assets/icons/logo.svg";
import Logout from "@/assets/icons/sidebar/logout.svg";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useGlobalContext } from "@/context/GlobalContext";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { SidebarItem } from "./SidebarItem";
import { getInitials, truncateText } from "@/utils/helpers";

export default function Sidebar({ items, variant = "sidebar" }) {
  const location = useLocation();
  const { open, setOpen } = useGlobalContext();
  const { logout, user, isAdmin, isUser } = useAuth();

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
        <Link
          className="text-base font-normal flex items-center gap-2 pl-4"
          to="/"
        >
          <img src={Logo} alt="career mentor" className="w-6 h-6" />
          Career Mentor
        </Link>

        {/* Nav Links */}
        <nav className="space-y-1">
          {items.map((item) => {
            // handling active states differently on mobile menu and sidebar
            const isActive =
              variant === "sidebar"
                ? item.href === "/user/dashboard" ||
                  item.href === "/admin/dashboard"
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
          <div className="flex items-center justify-between absolute bottom-3 left-6 right-6">
            <div className="flex items-center gap-2 text-custom-black">
              <div className="bg-custom-gray rounded-lg p-2">
                <p className="font-bold text-lg">
                  {getInitials(user?.firstName, user?.lastName) || "N/A"}
                </p>
              </div>
              <div>
                <p className="font-bold truncate text-sm">
                  {user?.firstName && user?.lastName
                    ? truncateText(`${user.firstName} ${user.lastName}`, 15)
                    : "N/A"}
                </p>
                <p className="font-medium text-sm">
                  {isAdmin ? "Admin" : isUser ? "User" : ""}
                </p>
              </div>
            </div>
            <div className="cursor-pointer" onClick={logout}>
              <img src={Logout} className="w-5 h-5" alt="logout" />
            </div>
          </div>
        ) : null}
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
