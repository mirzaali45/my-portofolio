"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedText from "./AnimatedText";
import Socials from "./Social";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  // Effect for parallax and interactive background - only on desktop
  useEffect(() => {
    // Skip effect during SSR
    if (typeof window === "undefined") return;

    const hero = heroRef.current;
    if (!hero) return;

    // Check if it's mobile
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = hero.getBoundingClientRect();

      // Calculate relative position
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      // Apply movement to various elements
      const profileImg = hero.querySelector(".profile-image") as HTMLElement;
      const bgElement = hero.querySelector(".hero-bg") as HTMLElement;
      const contentElement = hero.querySelector(".hero-content") as HTMLElement;

      if (profileImg) {
        profileImg.style.transform = `translate(${(x - 0.5) * -20}px, ${
          (y - 0.5) * -20
        }px)`;
      }

      if (bgElement) {
        bgElement.style.transform = `translate(${(x - 0.5) * -50}px, ${
          (y - 0.5) * -50
        }px) scale(1.1)`;
      }

      if (contentElement) {
        contentElement.style.transform = `translate(${(x - 0.5) * 10}px, ${
          (y - 0.5) * 10
        }px)`;
      }
    };

    // Add resize listener to disable effect on mobile
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        hero.removeEventListener("mousemove", handleMouseMove);

        // Reset transformations
        const profileImg = hero.querySelector(".profile-image") as HTMLElement;
        const bgElement = hero.querySelector(".hero-bg") as HTMLElement;
        const contentElement = hero.querySelector(
          ".hero-content"
        ) as HTMLElement;

        if (profileImg) profileImg.style.transform = "";
        if (bgElement) bgElement.style.transform = "";
        if (contentElement) contentElement.style.transform = "";
      } else {
        hero.addEventListener("mousemove", handleMouseMove);
      }
    };

    // Add event listeners
    if (!isMobile) {
      hero.addEventListener("mousemove", handleMouseMove);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-24 sm:py-0"
    >
      {/* Background with parallax effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="hero-bg absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/70 to-dark/90" />

        {/* Animated particles effect - reduced for mobile */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 1}px`,
                height: `${Math.random() * 6 + 1}px`,
                animation: `floatParticle ${
                  Math.random() * 10 + 10
                }s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:w-2/5 flex justify-center relative order-first lg:order-last"
          >
            <div className="profile-image relative w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-72 lg:h-72">
              {/* Decorative elements */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary to-secondary opacity-30 animate-pulse" />
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white/30 p-2">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/images/Fotomirza.jpg"
                    alt="Profile"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, (max-width: 1024px) 224px, 288px"
                    priority
                  />
                </div>
              </div>

              {/* Floating elements - only visible on larger screens */}
              <div className="absolute -right-2 sm:-right-4 lg:-right-6 -top-2 sm:-top-4 lg:-top-6 bg-white/10 backdrop-blur-md rounded-lg p-2 sm:p-3 glass-card animate-float hidden sm:block">
                <div className="text-white text-xs sm:text-sm lg:text-base font-semibold">
                  1+ Years
                </div>
                <div className="text-white/70 text-xs sm:text-sm">
                  Experience
                </div>
              </div>

              <div className="absolute -left-2 sm:-left-4 lg:-left-6 -bottom-2 sm:-bottom-4 lg:-bottom-6 bg-white/10 backdrop-blur-md rounded-lg p-2 sm:p-3 glass-card animate-float-delay hidden sm:block">
                <div className="text-white text-xs sm:text-sm lg:text-base font-semibold">
                  5+
                </div>
                <div className="text-white/70 text-xs sm:text-sm">Projects</div>
              </div>
            </div>
          </motion.div>

          {/* Hero text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content text-center lg:text-left text-white lg:w-3/5 mt-6 sm:mt-8 lg:mt-0 w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="w-full"
            >
              <h2 className="text-sm sm:text-lg md:text-xl font-semibold mb-1 sm:mb-3 text-primary">
                Halo, I am a
              </h2>

              {/* FIX: Wrapper untuk centering AnimatedText di mobile */}
              <div className="w-full mb-3 sm:mb-5">
                <div className="flex justify-center lg:justify-start">
                  <AnimatedText
                    text="Fullstack Web Developer"
                    className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight"
                  />
                </div>
              </div>

              <p className="text-sm sm:text-base md:text-lg mb-5 sm:mb-6 text-gray-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0">
                Creating modern web solutions with a focus on performance,
                security, and user experience. Expertise includes Frontend
                Development, Backend Development, and Database Management.
              </p>
            </motion.div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="animated-button bg-primary hover:bg-primary/90 text-white font-medium py-2.5 sm:py-3 px-5 sm:px-6 md:px-8 rounded-md text-sm sm:text-base"
              >
                Contact me
              </motion.a>

              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="animated-button bg-transparent border-2 border-white/30 hover:border-white text-white font-medium py-2.5 sm:py-3 px-5 sm:px-6 md:px-8 rounded-md text-sm sm:text-base"
              >
                View the Project
              </motion.a>
            </div>

            {/* Social icons - hidden on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-6 sm:mt-8 hidden sm:block"
            >
              <Socials className="justify-center lg:justify-start" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - Original design */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-4 sm:bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center text-white"
        >
          <span className="mb-1 sm:mb-2 text-xs sm:text-sm font-light">
            Scroll
          </span>
          <div className="w-[20px] h-[30px] sm:w-[30px] sm:h-[50px] rounded-full border-2 border-white/30 flex justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 sm:h-3 bg-white rounded-full mt-1 sm:mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
