import { useGlobalContext } from "@/context/GlobalContext";
import { cn } from "@/lib/utils";
import React from "react";
import { Link } from "react-router-dom";

export const SidebarItem = ({ item }) => {
  const { label, href, icon: Icon, isActive } = item;
  const { setOpen } = useGlobalContext();

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
    <>
      {isActive ? (
        <div
          className={`rounded-full bg-[linear-gradient(90deg,#F3B34E,#FFD272,#59A4C0)] ${
            isActive ? "p-[2px]" : ""
          }`}
        >
          <SidebarLink
            link={link}
            className="rounded-full text-black bg-white"
          />
        </div>
      ) : (
        <SidebarLink link={link} className="rounded-md text-[#676767]" />
      )}
    </>
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
