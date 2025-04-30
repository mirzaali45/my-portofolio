"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedText from "./AnimatedText";
import Socials from "./Social";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  // Effect for parallax and interactive background
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

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

    hero.addEventListener("mousemove", handleMouseMove);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
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

        {/* Animated particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
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
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Hero text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content text-center lg:text-left text-white lg:w-3/5"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h2 className="text-lg md:text-xl font-semibold mb-4 text-primary">
                Halo, I am a
              </h2>

              <AnimatedText
                text="Fullstack Web Developer"
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
              />

              <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Creating modern web solutions with a focus on performance,
                security, and user experience. Expertise includes Frontend
                Development, Backend Development, and Database Management.
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-6 justify-center lg:justify-start mt-8">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="animated-button bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-md"
              >
                Contact Me
              </motion.a>

              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="animated-button bg-transparent border-2 border-white/30 hover:border-white text-white font-medium py-3 px-8 rounded-md"
              >
                View the Project
              </motion.a>
            </div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-12"
            >
              <Socials className="justify-center lg:justify-start" />
            </motion.div>
          </motion.div>

          {/* Right side - Profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:w-2/5 flex justify-center relative"
          >
            <div className="profile-image relative w-64 h-64 md:w-80 md:h-80">
              {/* Decorative elements */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary to-secondary opacity-30 animate-pulse" />
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white/30 p-2">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/images/Fotomirza.jpg"
                    alt="Profile"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -right-6 -top-6 bg-white/10 backdrop-blur-md rounded-lg p-3 glass-card animate-float">
                <div className="text-white font-semibold">1+ Years</div>
                <div className="text-white/70 text-sm">Experience</div>
              </div>

              <div className="absolute -left-6 -bottom-6 bg-white/10 backdrop-blur-md rounded-lg p-3 glass-card animate-float-delay">
                <div className="text-white font-semibold">5+</div>
                <div className="text-white/70 text-sm">Projects</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center text-white"
        >
          <span className="mb-2 text-sm font-light">Scroll</span>
          <div className="w-[30px] h-[50px] rounded-full border-2 border-white/30 flex justify-center">
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
