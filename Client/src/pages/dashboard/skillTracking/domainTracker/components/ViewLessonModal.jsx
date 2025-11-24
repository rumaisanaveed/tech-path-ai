import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import {
  useGetSingleLessonDetails,
  useUpdateStatusLesson,
} from "@/apis/skillTracking/lessonTracking/lessonTracking.services";

const ViewLessonModal = ({ open, onClose, lesson }) => {
  const lessonId = lesson?.id;

  // ⭐ FIX: Add status state
  const [status, setStatus] = useState("pending");

  const { data, isLoading, isError, refetch } = useGetSingleLessonDetails(
    lessonId,
    { enabled: !!lessonId }
  );

  const { mutate: updateStatus } = useUpdateStatusLesson();

  useEffect(() => {
    if (data?.userProgress?.status) {
      setStatus(data.userProgress.status);
    }
  }, [data]);

  useEffect(() => {
    if (lessonId) refetch();
  }, [lessonId, refetch]);

  if (!open) return null;

  const handleChangeStatus = (newStatus) => {
    setStatus(newStatus);
    updateStatus({ lessonId: lesson.id, status: newStatus });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:w-[90vw] md:w-[80vw] max-w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-5 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-semibold text-gray-900 text-center">
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
          <div className="space-y-8 text-sm sm:text-base text-gray-700">
            {/* Lesson Info */}
            <section>
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                Lesson Information
              </h3>
              <p>
                <strong>Description:</strong>{" "}
                {data?.description || "No description available."}
              </p>
            </section>

            <Separator />

            {/* Learning Points */}
            {data?.learningPoints?.length > 0 && (
              <section>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                  Learning Points
                </h3>
                <ol className="list-decimal list-inside space-y-2 pl-2">
                  {data.learningPoints.map((point) => (
                    <li key={point.id}>
                      <span className="font-medium">{point.point}</span>

                      {point.subPoints?.length > 0 && (
                        <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                          {point.subPoints.map((sp, i) => (
                            <li key={i}>
                              {sp.label && <strong>{sp.label}:</strong>}{" "}
                              {sp.description}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <Separator />

            {/* Examples */}
            {data?.examples?.length > 0 && (
              <section>
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">
                  Examples
                </h3>
                <div className="space-y-6">
                  {data.examples.map((ex, idx) => (
                    <div
                      key={ex.id}
                      className="p-4 sm:p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
                    >
                      <h4 className="font-semibold mb-2">Example {idx + 1}</h4>

                      {ex.description && (
                        <p className="text-gray-800 mb-2">{ex.description}</p>
                      )}

                      {ex.descriptionPoints?.length > 0 && (
                        <ul className="list-disc list-inside ml-4 space-y-1 mb-3">
                          {ex.descriptionPoints.map((dp, i) => (
                            <li key={i}>
                              {dp.label && <strong>{dp.label}: </strong>}
                              {dp.description}
                            </li>
                          ))}
                        </ul>
                      )}

                      {ex.codeSnippet && (
                        <pre className="bg-gray-900 text-white text-xs sm:text-sm p-3 rounded-lg overflow-x-auto whitespace-pre-wrap break-words">
                          {ex.codeSnippet}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Resources */}
            {data?.resources?.length > 0 && (
              <section>
                <Separator className="my-3" />
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                  Resources
                </h3>
                <ul className="space-y-2 text-sm">
                  {data.resources.map((res) => (
                    <li key={res.id}>
                      <a
                        href={res.url}
                        target="_blank"
                        className="text-blue-600 hover:underline break-all"
                      >
                        {res.type} → {res.url}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* ⭐ FIXED STATUS SECTION */}
            <section className="pt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Lesson Status
              </h3>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <label className="text-sm text-gray-700">Select Status:</label>

                <select
                  value={status}
                  onChange={(e) => handleChangeStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 text-sm w-full sm:w-40 bg-white"
                >
                  <option value="not_started">Not Started</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </section>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewLessonModal;
