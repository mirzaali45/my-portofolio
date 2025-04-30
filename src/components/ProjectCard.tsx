'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: 'frontend' | 'fullstack' | 'backend';
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

  // 3D tilt effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
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
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
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
    frontend: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300',
    backend: 'bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-300',
    fullstack: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300',
  };

  return (
    <motion.article
      ref={cardRef}
      variants={cardVariants}
      className="glass-card bg-white/80 dark:bg-slate-800/80 rounded-xl overflow-hidden shadow-lg border border-gray-100/50 dark:border-gray-700/50 transition-all duration-500"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Project Image */}
      <div className="relative h-60 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary/90 to-secondary/90 flex items-center justify-center gap-6"
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
              hover: { opacity: 1, y: 0, transition: { delay: 0.1 } }
            }}
            className="bg-white rounded-full p-4 hover:scale-110 transition-transform shadow-lg"
            aria-label="GitHub Repository"
          >
            <FaGithub className="text-dark text-xl" />
          </motion.a>
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={{
              hidden: { opacity: 0, y: 20 },
              hover: { opacity: 1, y: 0, transition: { delay: 0.2 } }
            }}
            className="bg-white rounded-full p-4 hover:scale-110 transition-transform shadow-lg"
            aria-label="Live Demo"
          >
            <FaExternalLinkAlt className="text-dark text-xl" />
          </motion.a>
        </motion.div>
      </div>
      
      {/* Content */}
      <div className="p-6" style={{ transform: 'translateZ(20px)' }}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <span className={`text-xs px-3 py-1 rounded-full ${categoryColors[project.category]}`}>
            {project.category}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100/80 dark:bg-gray-700/80 text-gray-800 dark:text-gray-300 px-3 py-1 rounded-full backdrop-blur-sm"
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