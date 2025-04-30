"use client";

import HeroSection from "@/components/HeroSection";
import ParallaxSection from "@/components/ParalaxSection";
import ProjectsSection from "@/components/ProjectSection";
import SkillsSection from "@/components/SkillSection";
import ContactForm from "@/components/ContactForm";
import { useEffect } from "react";

export default function Home() {
  // Setup parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const pageHeight = document.body.scrollHeight - viewportHeight;

      // Update scroll progress CSS variable
      document.documentElement.style.setProperty(
        "--scroll-progress",
        `${(scrollY / pageHeight) * 100}%`
      );

      // Get all parallax elements
      const parallaxElements = document.querySelectorAll(".parallax-bg");

      parallaxElements.forEach((element) => {
        const elementTop = (element.parentElement as HTMLElement).offsetTop;
        const elementHeight = (element.parentElement as HTMLElement)
          .offsetHeight;
        const offset = (scrollY - elementTop) * 0.5;
        const maxOffset = elementHeight * 0.5;

        // Apply parallax only when element is in viewport
        if (
          scrollY + viewportHeight > elementTop &&
          scrollY < elementTop + elementHeight
        ) {
          const limitedOffset = Math.max(0, Math.min(offset, maxOffset));
          element.setAttribute(
            "style",
            `transform: translateY(${limitedOffset}px)`
          );
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <HeroSection />

      <ParallaxSection
        id="about"
        bgImage="/images/skills-bg.jpg"
        title="About me"
        overlay="dark"
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <p className="text-lg md:text-xl mb-8">
            I am a Fullstack Web Developer with expertise in modern web
            application development. With experience in Frontend and Backend
            development, I am able to build complete and well-integrated web
            solutions.
          </p>
          <p className="text-lg md:text-xl">
            My approach focuses on developing fast, secure, and user-friendly
            websites with an eye on best practices and the latest technology.
          </p>
        </div>
      </ParallaxSection>

      <SkillsSection />

      <ProjectsSection />

      <ParallaxSection
        id="process"
        bgImage="/images/backgorund.jpg"
        title="Working Process"
        overlay="dark"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white max-w-6xl mx-auto">
          <div className="bg-dark/50 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4">1. Planning & Design</h3>
            <p>
              Understand requirements, create wireframes, and design the
              architecture of the application to be developed.
            </p>
          </div>
          <div className="bg-dark/50 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4">2. Development</h3>
            <p>
              Write clean and structured code, with responsive frontend
              implementation and reliable backend.
            </p>
          </div>
          <div className="bg-dark/50 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4">3. Testing & Deployment</h3>
            <p>
              Perform thorough testing, performance optimization, and deployment
              with CI/CD for best results.
            </p>
          </div>
        </div>
      </ParallaxSection>

      <ContactForm />
    </>
  );
}
