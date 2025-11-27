import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Image imports
import mentor1 from "@/assets/mentors/mentor1.webp";
import mentor2 from "@/assets/mentors/mentor2.png";
import mentor3 from "@/assets/mentors/mentor3.png";
import mentor4 from "@/assets/mentors/mentor4.png";
import mentor5 from "@/assets/mentors/mentor5.png";
import mentor6 from "@/assets/mentors/mentor6.png";
import DashboardLayout from "@/layouts/DashboardLayout";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";

const mentors = [
  {
    id: 1,
    name: "NovaBot",
    img: mentor1,
    description:
      "A structured robotic mentor that boosts consistency, discipline, and deep learning clarity.",
    detailedDescription:
      "NovaBot is your systematic learning companion, designed to help you build strong study habits and maintain unwavering focus. With precision-guided learning paths and data-driven insights, NovaBot excels at breaking down complex topics into digestible modules. Perfect for students who thrive on structure, accountability, and measurable progress. NovaBot tracks your consistency, celebrates your streaks, and pushes you to maintain discipline even when motivation fades.",
  },
  {
    id: 2,
    name: "SageWing",
    img: mentor2,
    description:
      "A wise owl mentor who guides you with patience, insights, and long-term vision.",
    detailedDescription:
      "SageWing brings centuries of wisdom to your learning journey, offering patient guidance and thoughtful perspectives. This mentor specializes in deep understanding over quick wins, encouraging you to ask 'why' and develop critical thinking skills. SageWing is ideal for reflective learners who value wisdom, context, and the bigger picture. With a calm and nurturing approach, SageWing helps you connect knowledge across disciplines and see patterns others might miss.",
  },
  {
    id: 3,
    name: "CoreX",
    img: mentor3,
    description:
      "A future-tech mentor focused on strategic thinking and organized growth.",
    detailedDescription:
      "CoreX represents the cutting edge of learning optimization, combining strategic planning with efficient execution. This mentor helps you set ambitious goals, create actionable roadmaps, and track key performance metrics. CoreX is perfect for goal-oriented students who want to maximize their learning ROI and stay ahead of the curve. With advanced analytics and personalized recommendations, CoreX ensures every study session moves you closer to your objectives.",
  },
  {
    id: 4,
    name: "ByteBelle",
    img: mentor4,
    description:
      "A creative mentor who helps you learn visually, stay motivated, and think differently.",
    detailedDescription:
      "ByteBelle transforms learning into a vibrant, creative experience filled with visual aids, colorful mnemonics, and engaging activities. This mentor understands that creativity fuels retention and makes studying enjoyable. ByteBelle is ideal for visual learners and creative minds who need inspiration and variety. Through gamification, artistic expression, and innovative techniques, ByteBelle keeps your learning journey fresh, fun, and deeply memorable.",
  },
  {
    id: 5,
    name: "AstraGuide",
    img: mentor5,
    description:
      "A mentor who inspires exploration, ambition, and limitless imagination.",
    detailedDescription:
      "AstraGuide opens doors to infinite possibilities, encouraging you to dream big and explore uncharted territories. This mentor specializes in fostering curiosity, embracing challenges, and pushing beyond comfort zones. AstraGuide is perfect for ambitious learners who want to discover their full potential and aren't afraid to take the road less traveled. With inspirational guidance and expansive thinking, AstraGuide helps you reach for the stars.",
  },
  {
    id: 6,
    name: "FluxFox",
    img: mentor6,
    description:
      "A clever problem-solving mentor who helps you learn smartly and stay curious.",
    detailedDescription:
      "FluxFox is your witty companion in the quest for knowledge, using clever tricks, smart shortcuts, and creative problem-solving to make learning efficient and fun. This mentor excels at finding unconventional solutions and keeping your curiosity alive. FluxFox is ideal for adaptive learners who enjoy puzzles, challenges, and thinking outside the box. With a playful yet focused approach, FluxFox teaches you to work smarter, not just harder.",
  },
];

export const Mentors = () => {
  const [selectedMentor, setSelectedMentor] = React.useState(null);

  const handleSelectMentor = (mentor) => {
    console.log(`Selected mentor: ${mentor.name}`);
    // Add your mentor selection logic here
    // For example: save to state, call API, navigate to chat, etc.
    setSelectedMentor(null);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-8xl mx-auto">
          <div className="w-full flex flex-col gap-6 animate-fadeIn">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                Choose Your Mentor
              </h1>
              <p className="text-gray-600 text-sm sm:text-base max-w-2xl">
                Pick a mentor that fits your learning style. Each mentor has a
                unique personality to guide your journey.
              </p>

              {/* Separator */}
              <div className="h-[2px] w-full bg-gradient-to-r from-[#F3B34E] via-[#FFD272] to-[#59A4C0] rounded-full"></div>
            </div>

            {/* Mentor Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((m) => (
                <motion.div
                  key={m.id}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="rounded-2xl shadow-md bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:shadow-xl transition-all cursor-pointer h-full">
                    <CardContent className="p-5 flex flex-col items-center text-center gap-3 h-full">
                      <motion.img
                        src={m.img}
                        alt={m.name}
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.3 }}
                        className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full shadow-lg"
                      />

                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                        {m.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 flex-grow">
                        {m.description}
                      </p>

                      <div className="w-full flex flex-col gap-2 mt-auto">
                        {/* View Details */}
                        <Button
                          variant="outline"
                          className="w-full rounded-xl font-medium shadow-sm text-sm hover:bg-gray-100"
                          onClick={() => setSelectedMentor(m)}
                        >
                          View Details
                        </Button>

                        {/* Select Mentor */}
                        <SecondaryButton
                          title={`Select ${m.name}`}
                          className="w-full justify-center !px-5 !py-3 rounded-xl"
                          onClickHandler={() => handleSelectMentor(m)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Modal */}
          <AnimatePresence>
            {selectedMentor && (
              <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedMentor(null)}
              >
                <motion.div
                  className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg relative max-h-[90vh] overflow-y-auto"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedMentor(null)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close modal"
                  >
                    ✕
                  </button>

                  <div className="flex flex-col items-center text-center gap-4 sm:gap-5">
                    <motion.img
                      src={selectedMentor.img}
                      alt={selectedMentor.name}
                      className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full shadow-lg"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {selectedMentor.name}
                    </h2>

                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed px-2">
                      {selectedMentor.detailedDescription}
                    </p>

                    <div className="w-full flex flex-col gap-3 mt-2">
                      <SecondaryButton
                        title={`Select ${selectedMentor.name}`}
                        className="w-full justify-center !px-5 !py-3 rounded-xl text-base"
                        onClickHandler={() =>
                          handleSelectMentor(selectedMentor)
                        }
                      />

                      <Button
                        variant="outline"
                        className="w-full rounded-xl font-medium text-sm sm:text-base"
                        onClick={() => setSelectedMentor(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Mentors;
