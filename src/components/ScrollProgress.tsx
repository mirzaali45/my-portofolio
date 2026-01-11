"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Menggunakan framer-motion untuk smooth scroll tracking
  const { scrollYProgress } = useScroll();
  
  // Menambahkan spring animation untuk efek smooth
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Skip during SSR
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      // Tampilkan progress bar setelah scroll sedikit
      if (window.scrollY > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Update CSS variable untuk komponen lain yang mungkin membutuhkan
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      document.documentElement.style.setProperty(
        "--scroll-progress",
        `${scrollProgress}%`
      );
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary z-[100] origin-left"
      style={{
        scaleX,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    />
  );
};

export default ScrollProgress;
