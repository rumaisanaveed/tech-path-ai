import React, { useState, useEffect } from "react";
import { Buddy } from "./buddy";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export const BuddyConversation = () => {
  const [buddyPose, setBuddyPose] = useState("waving");
  const [conversationStep, setConversationStep] = useState("intro");
  const [showChat, setShowChat] = useState(true);
  const [userResponses, setUserResponses] = useState([]);

  // Helper to record response
  const recordResponse = (choice) => {
    const stepMessage = getStepData().message;
    const responseData = {
      step: conversationStep,
      question: stepMessage,
      answer: choice,
      timestamp: new Date().toISOString(),
    };
    setUserResponses((prev) => [...prev, responseData]);
    console.log("🧠 User Response Recorded:", responseData);
  };

  const handleChoice = async (choice) => {
    recordResponse(choice);

    // Step 1: Intro → ask if beginner
    if (conversationStep === "intro") {
      setBuddyPose("waving");
      setConversationStep("askExperience");
      return;
    }

    // Step 2: Beginner or Experienced
    if (conversationStep === "askExperience") {
      if (choice.toLowerCase().includes("beginner")) {
        setBuddyPose("explainingBook");
        setConversationStep("newbieIntro");
      } else {
        setBuddyPose("standing");
        setConversationStep("experiencedIntro");
      }
      return;
    }

    // Step 3: When user clicks "Let's Go" (final)
    if (conversationStep === "newbieIntro" && choice === "Let's Go") {
      setBuddyPose("laptop");
      setConversationStep("assigningModules");

      // Wait and hide chat
      setTimeout(() => {
        console.log("📦 Final Collected Responses:", userResponses);
        setShowChat(false);
      }, 3000);
      return;
    }

    try {
      const domainId = 3; // 🔥 hardcoded for now
      const token = localStorage.getItem("token"); // or however you store auth
      // const res = await axios.post(
      //   `http://localhost:3000/api/enrollment/module/${domainId}`,
      //   { userResponse: userResponses },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      //console.log("✅ Backend response:", res.data);
    } catch (err) {
      console.error("❌ Failed to send responses:", err);
    }

    // Step 3 (for experienced)
    if (conversationStep === "experiencedIntro" && choice === "Let's Go") {
      setBuddyPose("laptop");
      setConversationStep("assigningModules");

      // Wait and hide chat
      setTimeout(() => {
        console.log("📦 Final Collected Responses:", userResponses);
        setShowChat(false);
      }, 3000);
      return;
    }
  };

  const getStepData = () => {
    switch (conversationStep) {
      case "intro":
        return {
          message:
            "👋 Hey there! I’m Piddu, your friendly learning buddy.\nI’ll help you build your path as a developer!",
          options: ["Let's Start"],
        };

      case "askExperience":
        return {
          message:
            "Before we begin — can you tell me about your experience level?",
          options: ["I'm a Beginner", "I'm Experienced"],
        };

      case "newbieIntro":
        return {
          message:
            "Awesome! Being a beginner is exciting — let's start your journey strong 💪\n\nI'm going to find and assign the best modules for you to become a Frontend Developer.",
          options: ["Let's Go"],
        };

      case "experiencedIntro":
        return {
          message:
            "Nice! Since you already have experience, I’ll tailor modules that can level up your Frontend skills further 🚀",
          options: ["Let's Go"],
        };

      case "assigningModules":
        return {
          message:
            "✨ Perfect! I'm assigning the best modules for you to become a Frontend Developer...",
          options: [],
        };

      default:
        return {
          message: "🤔 Hmm, I’m not sure what to say here.",
          options: [],
        };
    }
  };

  const { message, options = [] } = getStepData();

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-50">
      <AnimatePresence>
        {showChat && (
          <motion.div
            className="flex flex-col items-end gap-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Chat bubble */}
            <motion.div
              key={conversationStep}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white/90 backdrop-blur-lg p-5 rounded-2xl shadow-xl border border-blue-200"
              style={{ maxWidth: "360px", minWidth: "280px" }}
            >
              <p className="text-gray-800 leading-relaxed text-sm font-medium whitespace-pre-line">
                {message}
              </p>

              {options.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {options.map((opt) => (
                    <motion.button
                      key={opt}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleChoice(opt)}
                      className="px-4 py-2 rounded-full text-sm font-medium text-white shadow-sm"
                      style={{ backgroundColor: "#E07A5F" }}
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white/90 rotate-45 border-r border-b border-blue-200"></div>
            </motion.div>

            {/* Buddy mascot */}
            <motion.div
              key={buddyPose}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 80 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className="relative flex items-center justify-center w-40 h-40 md:w-48 md:h-48"
            >
              <div className="absolute w-full h-full bg-blue-100 rounded-full blur-2xl opacity-40"></div>
              <Buddy pose={buddyPose} alt="Piddu Mascot" size="large" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button stays even when Piddu hides */}
      <motion.button
        onClick={() => setShowChat(!showChat)}
        whileTap={{ scale: 0.85, rotate: -15 }}
        whileHover={{ scale: 1.1 }}
        className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg text-xl transition-all"
        style={{
          backgroundColor: showChat ? "#E07A5F" : "#5A9BD4",
          color: "white",
        }}
        title={showChat ? "Put Piddu to sleep" : "Wake up Piddu"}
      >
        {showChat ? "😴" : "💬"}
      </motion.button>
    </div>
  );
};
