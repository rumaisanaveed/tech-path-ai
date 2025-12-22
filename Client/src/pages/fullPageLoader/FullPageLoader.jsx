import React from "react";
import Logo from "@/assets/icons/logo.svg";
import { motion } from "framer-motion";

export const FullPageLoader = () => {
  return (
    <motion.div
      className="h-screen flex gap-2 items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.img
        src={Logo}
        alt="Logo"
        className="h-8 w-8 md:h-12 md:w-12"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
      />
      <motion.h1
        className="text-black text-3xl md:text-5xl anonymous-font"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <span className="font-bold">C</span>areer
        <span className="font-bold">M</span>entor
      </motion.h1>
    </motion.div>
  );
};
