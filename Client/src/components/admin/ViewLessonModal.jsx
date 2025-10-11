import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useGetSingleLessonAdmin } from "@/apis/skillTracking/lessonTracking/lessonTracking.services";
import { Loader2 } from "lucide-react";

const ViewLessonModal = ({ open, onClose, lesson }) => {
  const lessonId = lesson?.id;
  const { data, isLoading, isError, refetch } = useGetSingleLessonAdmin(lessonId, {
    enabled: !!lessonId,
  });

  useEffect(() => {
    if (lessonId) refetch();
  }, [lessonId, refetch]);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-lg sm:max-w-2xl w-[90vw] sm:w-auto rounded-2xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-900">
            {data?.title || "Loading..."}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center py-10 text-gray-500">
            <Loader2 className="animate-spin mr-2" size={20} />
            Loading lesson details...
          </div>
        ) : isError ? (
          <div className="text-red-500 text-center py-6">
            Failed to load lesson details.
          </div>
        ) : (
          <div className="space-y-6 text-sm sm:text-base text-gray-700">
            {/* Lesson Info */}
            <div className="space-y-3">
              <p><strong>Description:</strong> {data?.description}</p>
              <p><strong>Mandatory:</strong> {data?.isMandatory ? "Yes" : "No"}</p>
              <p><strong>Sequence:</strong> {data?.sequence}</p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(data?.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Learning Points */}
            {data?.learningPoints?.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">
                  Learning Points
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {data.learningPoints.map((point) => (
                    <li key={point.id}>{point.point}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Examples */}
            {data?.examples?.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">
                  Examples
                </h3>
                <div className="space-y-3">
                  {data.examples.map((ex) => (
                    <div
                      key={ex.id}
                      className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-100"
                    >
                      <p className="text-gray-700 font-medium mb-1">
                        {ex.description}
                      </p>
                      <pre className="bg-gray-900 text-white text-xs sm:text-sm p-2 rounded-md overflow-x-auto">
                        {ex.codeSnippet}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resources */}
            {data?.resources?.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">
                  Resources
                </h3>
                <ul className="space-y-1 text-blue-600 underline">
                  {data.resources.map((res) => (
                    <li key={res.id}>
                      <a href={res.url} target="_blank" rel="noopener noreferrer">
                        {res.type} → {res.url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewLessonModal;
