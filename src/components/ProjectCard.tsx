"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: "frontend" | "fullstack" | "backend";
  tech: string[];
  link?: string;
  github: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true); // Default to true for SSR

  // Detect mobile or desktop for optimized effects
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      // Perform initial check
      checkMobile();

      // Listen for resize events
      window.addEventListener("resize", checkMobile);

      return () => {
        window.removeEventListener("resize", checkMobile);
      };
    }
  }, []);

  // 3D tilt effect - only on desktop
  useEffect(() => {
    // Return early if no cardRef or if we're on mobile or SSR
    if (!cardRef.current || isMobile || typeof window === "undefined") return;

    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();

      // Calculate mouse position relative to card
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      // Apply rotation
      card.style.transform = `
        perspective(1000px) 
        rotateY(${x * 10}deg) 
        rotateX(${y * -10}deg)
        translateZ(10px)
      `;
    };

    const handleMouseLeave = () => {
      card.style.transform = `
        perspective(1000px)
        rotateY(0deg)
        rotateX(0deg)
        translateZ(0)
      `;
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile]);

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const categoryColors = {
    frontend:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300",
    backend:
      "bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-300",
    fullstack:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300",
  };

  return (
    <motion.article
      ref={cardRef}
      variants={cardVariants}
      className="glass-card bg-white/80 dark:bg-slate-800/80 rounded-xl overflow-hidden shadow-lg border border-gray-100/50 dark:border-gray-700/50 transition-all duration-500"
      style={{ transformStyle: "flat" }} // Use flat for both to avoid errors
    >
      {/* Project Image */}
      <div className="relative h-48 sm:h-60 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary/90 to-secondary/90 flex items-center justify-center gap-4 sm:gap-6"
          initial="hidden"
          whileHover="hover"
          variants={overlayVariants}
        >
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            variants={{
              hidden: { opacity: 0, y: 20 },
              hover: { opacity: 1, y: 0, transition: { delay: 0.1 } },
            }}
            className="bg-white rounded-full p-3 hover:scale-110 transition-transform shadow-lg"
            aria-label="GitHub Repository"
          >
            <FaGithub className="text-dark text-lg sm:text-xl" />
          </motion.a>
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={{
              hidden: { opacity: 0, y: 20 },
              hover: { opacity: 1, y: 0, transition: { delay: 0.2 } },
            }}
            className="bg-white rounded-full p-3 hover:scale-110 transition-transform shadow-lg"
            aria-label="Live Demo"
          >
            <FaExternalLinkAlt className="text-dark text-lg sm:text-xl" />
          </motion.a>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="flex justify-between items-center flex-wrap mb-3 sm:mb-4 gap-2">
          <h3 className="text-lg sm:text-xl font-bold">{project.title}</h3>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              categoryColors[project.category]
            }`}
          >
            {project.category}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 line-clamp-3 text-sm sm:text-base">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {project.tech.map((tech, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100/80 dark:bg-gray-700/80 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-full backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
