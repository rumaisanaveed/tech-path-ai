import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { Ellipsis } from "lucide-react";
import React from "react";
import Domain from "@/assets/images/domain.webp";
import { Heading } from "../../components/Heading";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActionDropdown } from "@/components/dropdowns/ActionDropdown";
import { projectDropdownItems } from "@/constants";

export const Projects = () => {
  const handleActions = (action) => {
    switch (action) {
      case "edit":
        // edit modal will open
        break;
      case "delete":
        // delete api call
        break;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Heading heading="Projects" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-4 text-black">
            <div className="relative">
              <img
                alt="career domain"
                src={Domain}
                className="w-full h-full object-cover rounded-md"
              />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Ellipsis
                    color="#FDFDFD"
                    size={20}
                    className="absolute top-2 right-2 cursor-pointer"
                  />
                </DropdownMenuTrigger>
                <ActionDropdown
                  items={projectDropdownItems}
                  onAction={handleActions}
                  variant="light"
                />
              </DropdownMenu>
            </div>
            <div>
              <h1 className="font-medium text-base md:text-xl">
                Ardonyx Clothing Store
              </h1>
              <p className="font-normal text-xs md:text-sm">
                Ardonyx is a design-forward, cutting-edge eCommerce platform
                built for a contemporary clothing brand.
              </p>
            </div>
            <SecondaryButton
              variant="dark"
              title="View Project"
              className="py-1"
              textSmall={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
