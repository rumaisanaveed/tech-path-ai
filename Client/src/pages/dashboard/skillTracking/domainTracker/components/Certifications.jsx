import React from "react";
import { Heading } from "../../components/Heading";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActionDropdown } from "@/components/dropdowns/ActionDropdown";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import Certification from "@/assets/images/certification.webp";

const certificationDropdownMenuItems = [
  {
    label: "Edit",
    key: "edit",
  },
  {
    label: "Delete",
    key: "delete",
  },
];

export const Certifications = () => {
  return (
    <div className="flex flex-col gap-5">
      <Heading heading="Certifications" />
      <div className="flex flex-col gap-9">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={Certification} alt="certification" />
              <div className="flex flex-col gap-1 text-black">
                <h3 className="font-medium text-xs md:text-sm">Dec 19, 2022</h3>
                <h2 className="text-2xl md:text-3xl font-medium">
                  CS50’s Introduction to Computer Science
                </h2>
                <p className="font-normal text-sm md:text-base py-3">
                  An introduction to the intellectual enterprises of computer
                  science and the art of programming
                </p>
                <SecondaryButton
                  variant="dark"
                  title="View Credentials"
                  textSmall={true}
                />
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Ellipsis className="cursor-pointer" />
              </DropdownMenuTrigger>
              <ActionDropdown items={certificationDropdownMenuItems} />
            </DropdownMenu>
          </div>
        ))}
      </div>
    </div>
  );
};
