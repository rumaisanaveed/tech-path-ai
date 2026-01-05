import { GetSingleRoadmap } from "@/apiService/Roadmaps";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ViewRoadMap = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = GetSingleRoadmap(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading roadmap...
      </div>
    );
  }

  if (isError || !data?.career) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Roadmap not available
      </div>
    );
  }

  const { career, modules } = data;

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background px-4 md:px-10 lg:px-16 py-10">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {/* Header */}
          <div className="mb-14">
            <h1
              className="text-3xl md:text-4xl font-semibold tracking-tight"
              style={{ color: "#59A4C0" }}
            >
              {career.title}
            </h1>

            <p className="mt-4 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              {career.description}
            </p>

            <div
              className="mt-8 h-[2px] w-28 rounded-full"
              style={{ backgroundColor: "#F3B34E" }}
            />
          </div>

          {/* Roadmap Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-[14px] top-0 bottom-0 w-px"
              style={{ backgroundColor: "rgba(89,164,192,0.25)" }}
            />

            <ul className="space-y-10">
              {modules.map((module, index) => (
                <li key={module.id} className="relative pl-12">
                  {/* Dot */}
                  <div
                    className="absolute left-[9px] top-2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: "#59A4C0" }}
                  />

                  {/* Content */}
                  <div className="group">
                    <span
                      className="text-xs font-medium tracking-wider"
                      style={{ color: "#ED846B" }}
                    >
                      STEP {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="mt-1 text-lg font-medium text-foreground group-hover:underline underline-offset-4 transition">
                      {module.title}
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                      {module.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewRoadMap;
