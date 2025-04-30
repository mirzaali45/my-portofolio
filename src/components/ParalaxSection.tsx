"use client";

import { useRef, useEffect } from "react";
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
    threshold: 0.2,
  });

  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Enhanced parallax effect with smooth lerping
  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    let frameId: number;
    let targetY = 0;
    let currentY = 0;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only process when section is in or close to the viewport
      if (rect.bottom > -windowHeight / 2 && rect.top < windowHeight * 1.5) {
        const scrolled = window.scrollY;
        const sectionTop = rect.top + scrolled;
        const viewportMiddle = scrolled + windowHeight / 2;
        const sectionMiddle = sectionTop + rect.height / 2;

        // Calculate target parallax offset
        const relativeScroll = (viewportMiddle - sectionMiddle) * 0.15;
        targetY = relativeScroll;
      }
    };

    // Smooth animation update
    const animate = () => {
      // Lerp (linear interpolation) for smooth movement
      currentY += (targetY - currentY) * 0.06;

      if (Math.abs(targetY - currentY) > 0.01) {
        bg.style.transform = `translateY(${currentY}px) scale(1.15)`;
        frameId = requestAnimationFrame(animate);
      } else {
        bg.style.transform = `translateY(${targetY}px) scale(1.15)`;
      }
    };

    const update = () => {
      handleScroll();
      if (!frameId) {
        frameId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    // Initial call
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative ${
        height === "full" ? "min-h-screen" : "min-h-[60vh]"
      } py-24 flex items-${alignItems} justify-center parallax-container overflow-hidden ${
        overlay === "light"
          ? "overlay-light"
          : overlay === "dark"
          ? "overlay-dark"
          : "overlay-gradient"
      }`}
    >
      {/* Enhanced parallax background with hover effect */}
      <div
        ref={bgRef}
        className="parallax-bg transition-transform duration-300"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 parallax-content">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.h2
            variants={textVariants}
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-8 ${textColor} relative inline-block`}
          >
            {title}
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
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
