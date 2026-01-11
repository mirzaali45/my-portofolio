"use client";

import HeroSection from "@/components/HeroSection";
import ParallaxSection from "@/components/ParalaxSection";
import ProjectsSection from "@/components/ProjectSection";
import SkillsSection from "@/components/SkillSection";
import ContactForm from "@/components/ContactForm";
import { useEffect, useState } from "react";

export default function Home() {
  // Detect if we're on a mobile device
  const [isMobile, setIsMobile] = useState(true); // Default to true for SSR

  useEffect(() => {
    // Check if we're on a mobile device
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    // Check initially
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Setup parallax effect on scroll - only for desktop
  useEffect(() => {
    // Skip on mobile for better performance
    if (isMobile || typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const pageHeight = document.body.scrollHeight - viewportHeight;

      // Update scroll progress CSS variable
      document.documentElement.style.setProperty(
        "--scroll-progress",
        `${(scrollY / pageHeight) * 100}%`
      );

      // Simpler parallax implementation for better performance
      const parallaxElements = document.querySelectorAll(".parallax-bg");

      parallaxElements.forEach((element) => {
        const bgElement = element as HTMLElement;
        const container = bgElement.closest(
          ".parallax-container"
        ) as HTMLElement;

        if (!container) return;

        const rect = container.getBoundingClientRect();

        // Apply parallax only when element is visible
        if (rect.top < viewportHeight && rect.bottom > 0) {
          const scrollRatio =
            (scrollY - (rect.top + scrollY - viewportHeight * 0.5)) * 0.1;
          // Use translate3d for hardware acceleration
          bgElement.style.transform = `translate3d(0, ${scrollRatio}px, 0)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <>
      <HeroSection />

      <ParallaxSection
        id="about"
        bgImage="/images/skills-bg.jpg"
        title="About Me"
        overlay="dark"
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <p className="text-base sm:text-lg mb-6">
            I am a Fullstack Web Developer with expertise in modern web application development. With experience in Frontend and Backend development, I am capable of building complete and well-integrated web solutions.
          </p>
          <p className="text-base sm:text-lg">
            My approach focuses on developing fast, secure, and user-friendly websites while adhering to best practices and leveraging the latest technologies.
          </p>
        </div>
      </ParallaxSection>

      <SkillsSection />

      <ProjectsSection />

      <ParallaxSection
        id="process"
        bgImage="/images/hero-bg.jpg"
        title="My Development Process"
        overlay="dark"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-white max-w-6xl mx-auto">
          <div className="bg-dark/50 p-4 sm:p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">
              1. Planning & Design
            </h3>
            <p className="text-sm sm:text-base">
              Understanding requirements, creating wireframes, and designing the architecture of the application to be developed.
            </p>
          </div>
          <div className="bg-dark/50 p-4 sm:p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">
              2. Development
            </h3>
            <p className="text-sm sm:text-base">
              Writing clean and structured code, with implementation of responsive frontend and reliable backend.
            </p>
          </div>
          <div className="bg-dark/50 p-4 sm:p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">
              3. Testing & Deployment
            </h3>
            <p className="text-sm sm:text-base">
              Performing comprehensive testing, performance optimization, and deployment
              with CI/CD for optimal results.
            </p>
          </div>
        </div>
      </ParallaxSection>

      <ContactForm />
    </>
  );
}
