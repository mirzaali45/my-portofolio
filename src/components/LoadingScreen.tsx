"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-light dark:bg-dark"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.7, ease: "easeInOut" },
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5 },
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.3 },
            }}
            className="text-center"
          >
            <div className="logo-loading mb-6"></div>
            <motion.h1
              className="text-3xl font-bold text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.3, duration: 0.5 },
              }}
            >
              Portfolio<span className="text-secondary">.</span>
            </motion.h1>
            <motion.div
              className="mt-10 w-64 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.5, duration: 0.5 },
              }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: "0%" }}
                animate={{
                  width: "100%",
                  transition: {
                    duration: 1.5,
                    ease: "easeInOut",
                  },
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
