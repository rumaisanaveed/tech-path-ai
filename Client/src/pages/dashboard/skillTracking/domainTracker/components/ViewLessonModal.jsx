import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Loader2, X } from "lucide-react";
import {
  useGetSingleLessonDetails,
  useUpdateStatusLesson,
} from "@/apis/skillTracking/lessonTracking/lessonTracking.services";

import thumbsUp from "@/assets/mascot/thumbsUp.webp";

const ViewLessonModal = ({ open, onClose, lesson }) => {
  const lessonId = lesson?.id;

  const [status, setStatus] = useState("pending");
  const [unlockMessage, setUnlockMessage] = useState("");
  const [showMascotNotification, setShowMascotNotification] = useState(false);

  const { data, isLoading, isError, refetch } = useGetSingleLessonDetails(
    lessonId,
    { enabled: !!lessonId }
  );

  const { mutateAsync: updateStatus } = useUpdateStatusLesson();

  useEffect(() => {
    if (data?.userProgress?.status) {
      setStatus(data.userProgress.status);
    }
  }, [data]);

  useEffect(() => {
    if (lessonId) refetch();
  }, [lessonId, refetch]);

  useEffect(() => {
    if (unlockMessage) {
      setShowMascotNotification(true);
      // Auto-hide after 4 seconds
      const timer = setTimeout(() => {
        setShowMascotNotification(false);
        setTimeout(() => setUnlockMessage(""), 300);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [unlockMessage]);

  if (!open) return null;

  const handleChangeStatus = async (newStatus) => {
    setStatus(newStatus);

    const response = await updateStatus({
      lessonId: lesson.id,
      status: newStatus,
      sequence: data?.sequence,
    });

    console.log("Status update response:", response);

    if (response?.unlockMessage) {
      setUnlockMessage(response.unlockMessage);
    }
  };

  const handleCloseMascotNotification = () => {
    setShowMascotNotification(false);
    setTimeout(() => setUnlockMessage(""), 1000);
  };

  return (
    <>
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
                        <h4 className="font-semibold mb-2">
                          Example {idx + 1}
                        </h4>

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

              {/* Status Section */}
              <section className="pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Lesson Status
                </h3>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <label className="text-sm text-gray-700">
                    Select Status:
                  </label>

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

      {/* Mascot Notification Modal */}
      {unlockMessage && (
        <Dialog
          open={showMascotNotification}
          onOpenChange={handleCloseMascotNotification}
        >
          <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 shadow-2xl">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 overflow-hidden">
              <div
                className={`
            h-full 
            bg-gradient-to-r 
            from-[#F3B34E] 
            via-[#FFD272] 
            to-[#59A4C0]
          `}
                style={{
                  animation: showMascotNotification
                    ? "lessonProgressBar 8s linear forwards"
                    : "none",
                }}
              />
            </div>

            {/* Close Button */}
            <button
              onClick={handleCloseMascotNotification}
              className="absolute top-3 right-3 z-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full p-1.5 transition-colors shadow-sm"
              aria-label="Close notification"
            >
              <X size={16} />
            </button>

            {/* Content */}
            <div className="pt-8 pb-6 px-6">
              <div className="flex justify-center mb-4">
                <img
                  src={thumbsUp}
                  alt="Mascot"
                  className="w-60 h-60 object-contain drop-shadow-xl"
                />
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  🎉 Congratulations!
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {unlockMessage}
                </p>
              </div>
            </div>

            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 -z-10 opacity-50" />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ViewLessonModal;
