import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { useGetSingleLessonAdmin } from "@/apis/skillTracking/lessonTracking/lessonTracking.services";

const ViewLessonModal = ({ open, onClose, lesson }) => {
  const lessonId = lesson?.id;
  const { data, isLoading, isError, refetch } = useGetSingleLessonAdmin(
    lessonId,
    { enabled: !!lessonId }
  );

  useEffect(() => {
    if (lessonId) refetch();
  }, [lessonId, refetch]);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-2xl p-5 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            {data?.title || "Lesson Details"}
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
          <>
            <Separator className="my-3" />

            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <strong>Description:</strong> {data?.description}
              </p>
              <p>
                <strong>Mandatory:</strong> {data?.isMandatory ? "Yes" : "No"}
              </p>
              <p>
                <strong>Sequence:</strong> {data?.sequence}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(data?.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Learning Points */}
            {data?.learningPoints?.length > 0 && (
              <div className="mt-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Learning Points
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  {data.learningPoints.map((point) => (
                    <li key={point.id}>{point.point}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Examples */}
            {data?.examples?.length > 0 && (
              <div className="mt-5">
                <h3 className="font-semibold text-gray-900 mb-2">Examples</h3>
                <div className="space-y-3">
                  {data.examples.map((ex) => (
                    <div
                      key={ex.id}
                      className="p-3 bg-gray-50 rounded-lg border border-gray-100"
                    >
                      <p className="text-sm text-gray-700 mb-1 font-medium">
                        {ex.description}
                      </p>
                      <pre className="bg-gray-900 text-white text-xs p-2 rounded-md overflow-x-auto">
                        {ex.codeSnippet}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resources */}
            {data?.resources?.length > 0 && (
              <div className="mt-5">
                <h3 className="font-semibold text-gray-900 mb-2">Resources</h3>
                <ul className="space-y-1 text-sm text-blue-600 underline">
                  {data.resources.map((res) => (
                    <li key={res.id}>
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {res.type} → {res.url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewLessonModal;
