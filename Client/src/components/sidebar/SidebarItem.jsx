import { useGlobalContext } from "@/context/GlobalContext";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const SidebarItem = ({ item }) => {
  const { label, href, icon: Icon, isActive, children } = item;
  const { setOpen } = useGlobalContext();
  const [collapsed, setCollapsed] = useState(false);

  const handleClick = () => {
    setOpen(false);
  };

  const link = {
    href,
    label,
    icon: Icon,
    onClick: handleClick,
  };

  return (
    <div>
      {children ? (
        <>
          <button
            className={cn(
              "w-full flex items-center justify-between px-4 py-2 rounded-md text-sm font-medium",
              isActive ? "bg-[#F8F8F8] text-black" : "text-[#676767]"
            )}
            onClick={() => setCollapsed(!collapsed)}
          >
            <span className="flex items-center gap-3">
              <Icon className="w-5 h-5" color="#676767" />
              {label}
            </span>
            {collapsed ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </button>
          {!collapsed && (
            <div className="ml-8 mt-1 space-y-1">
              {children.map((child) => (
                <Link
                  key={child.label}
                  to={child.href}
                  onClick={handleClick}
                  className={cn(
                    "block px-3 py-1 text-sm rounded-md",
                    location.pathname === child.href
                      ? "bg-[#F3B34E]/10 text-black font-medium"
                      : "text-[#676767]"
                  )}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </>
      ) : isActive ? (
        <div className="rounded-full bg-[linear-gradient(90deg,#F3B34E,#FFD272,#59A4C0)] p-[2px]">
          <SidebarLink
            link={link}
            className="rounded-full text-black bg-white"
          />
        </div>
      ) : (
        <SidebarLink link={link} className="rounded-md text-[#676767]" />
      )}
    </div>
  );
};

const SidebarLink = ({ link, className = "" }) => {
  const { href, label, icon: Icon, onClick } = link;
  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        `flex w-full justify-start items-center gap-3 px-4 py-2 text-sm font-medium ${className}`
      )}
    >
      <Icon className="w-5 h-5" color="#676767" />
      {label}
    </Link>
  );
};
