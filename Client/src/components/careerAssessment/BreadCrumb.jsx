import { useGlobalContext } from "@/context/GlobalContext";
import React from "react";

export const BreadCrumb = () => {
  const { breadcrumbText } = useGlobalContext();
  return <p className="text-sm font-normal text-[#A2A2A2]">{breadcrumbText}</p>;
};
