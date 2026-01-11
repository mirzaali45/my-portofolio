"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ParallaxSectionProps {
  id: string;
  bgImage: string;
  title: string;
  children: React.ReactNode;
  overlay?: "light" | "dark" | "gradient";
  height?: "half" | "full";
  textColor?: string;
  alignItems?: "center" | "start" | "end";
}

const ParallaxSection = ({
  id,
  bgImage,
  title,
  children,
  overlay = "gradient",
  height = "half",
  textColor = "text-white",
  alignItems = "center",
}: ParallaxSectionProps) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.05, // Lower threshold for better mobile experience
  });

  const [isMobile, setIsMobile] = useState(true); // Default to true for SSR

  // Detect if we're on a mobile device
  useEffect(() => {
    // Skip on server-side rendering
    if (typeof window === "undefined") return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check initially
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  // Determine correct alignment class
  const alignClass =
    alignItems === "start"
      ? "items-start"
      : alignItems === "end"
      ? "items-end"
      : "items-center";

  // Generate overlay class
  const overlayClass =
    overlay === "light"
      ? "after:bg-white/60"
      : overlay === "dark"
      ? "after:bg-black/60"
      : "after:bg-gradient-to-b after:from-black/70 after:to-black/30";

  return (
    <section
      id={id}
      className={`relative ${
        height === "full"
          ? "py-20 md:py-24 min-h-[50vh] md:min-h-[60vh]"
          : "py-16 md:py-20 min-h-[40vh] md:min-h-[50vh]"
      } flex ${alignClass} justify-center overflow-hidden`}
    >
      {/* Simple background without complex parallax for mobile */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat parallax-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 after:absolute after:inset-0 after:z-0 ${overlayClass}`}
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.h2
            variants={textVariants}
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-6 ${textColor} relative inline-block`}
          >
            {title}
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
          </motion.h2>

          <motion.div variants={textVariants} className="relative">
            {children}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ParallaxSection;
