import React from "react";
import { useParams } from "react-router-dom";
import { useSingleCareerDomain } from "@/apis/skillTracking/skillTracking.services";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit, ImageIcon, CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { SecondaryButton } from "../buttons/SecondaryButton";

const DomainEdit = () => {
  const { domainId } = useParams();
  const { data, isLoading } = useSingleCareerDomain(domainId);

  const formatDate = (iso) => (iso ? format(new Date(iso), "MMM d, yyyy") : "—");

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-6 animate-pulse">
        <Skeleton className="w-full h-64 rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    );
  }

  const domain = data || {};

  return (
    <Card className="shadow-md border border-gray-100 rounded-2xl bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800">
          Edit Domain
        </CardTitle>
        <CardDescription className="text-gray-500">
          Update details for this career domain
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
          {/* Left: Cover Image */}
          <div className="relative flex justify-center">
            {domain.coverImage ? (
              <img
                src={domain.coverImage}
                alt={domain.title}
                className="w-full max-w-sm h-64 object-cover rounded-xl shadow-sm border border-gray-200"
              />
            ) : (
              <div className="w-full max-w-sm h-64 rounded-xl flex flex-col items-center justify-center border border-dashed text-gray-400">
                <ImageIcon className="w-10 h-10 mb-2" />
                <p>No image uploaded</p>
              </div>
            )}

            <Button
              variant="secondary"
              size="sm"
              className="absolute bottom-3 right-3 bg-white/90 hover:bg-white shadow border border-gray-200"
            >
              <Edit className="w-4 h-4 mr-1 text-[#59A4C0]" /> Change Image
            </Button>
          </div>

          {/* Right: Domain Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {domain.title}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {domain.description}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Badge
                className={`text-xs px-3 py-1 rounded-full ${
                  domain.isActive
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-gray-100 text-gray-500 border border-gray-300"
                }`}
              >
                {domain.isActive ? "Active" : "Inactive"}
              </Badge>

              <span className="text-sm text-gray-500">
                ID: #{domain.id || "—"}
              </span>

              {domain.createdAt && (
                <div className="flex items-center text-sm text-gray-500 gap-1">
                  <CalendarDays size={14} className="text-[#F3B34E]" />
                  <span>{formatDate(domain.createdAt)}</span>
                </div>
              )}
            </div>

            <div className="pt-4">
              <SecondaryButton
                title="Save Changes"
                textSmall
                className="w-full sm:w-1/2"
                variant="dark"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DomainEdit;
