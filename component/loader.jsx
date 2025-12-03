"use client";
import { motion } from "framer-motion";

export default function WrkrBnCLoader() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      
      {/* Multi-layered spinning rings */}
      <motion.div
        className="absolute w-40 h-40 rounded-full border-4 border-t-amber-400 border-b-blue-500 opacity-60"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      ></motion.div>

      <motion.div
        className="absolute w-32 h-32 rounded-full border-4 border-t-blue-500 border-b-emerald-400 opacity-60"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
      ></motion.div>

      <motion.div
        className="absolute w-24 h-24 rounded-full border-4 border-t-emerald-500 border-b-amber-400 opacity-60"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
      ></motion.div>

      {/* Inner glowing text */}
      <motion.div
        className="absolute text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-blue-500 to-emerald-500 drop-shadow-xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 1, 1], scale: [0.8, 1, 1.05] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        WrkrBnC
      </motion.div>

      {/* Optional soft glowing background circle */}
      <div className="absolute w-60 h-60 bg-gradient-to-tr from-amber-300 via-blue-400 to-emerald-300 rounded-full blur-3xl opacity-20"></div>
    </div>
  );
}
