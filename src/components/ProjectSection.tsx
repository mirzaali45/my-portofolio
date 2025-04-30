"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProjectCard from "./ProjectCard";

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

const ProjectsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [filter, setFilter] = useState<string>("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    // Sample projects data
    const projectsData: Project[] = [
      {
        id: 1,
        title: "Invoice Management",
        description:
          "An application designed to simplify the process of creating and managing invoices for small businesses and freelancers.",
        image: "/images/project1.jpg",
        category: "fullstack", 
        tech: ["Typescript", "Nextjs", "Tailwindcss", "Node.js", "Supabase", "Prisma", "Express", "PostgreSQL"],
        link: "https://invoicepro-five.vercel.app",
        github: "https://github.com/mirzaali45/Finpro_Individual_FE",
      },
      {
        id: 2,
        title: "Online Grocerry",
        description:
          "An e-commerce application that has a function to shop online, where the buyer can choose the location of the store. this project is done by the team.",
        image: "/images/project2.jpg",
        category: "fullstack",
        tech: ["Typescript", "Nextjs", "Tailwindcss", "Node.js", "Supabase", "Prisma", "Express", "PostgreSQL"],
        link: "https://techlive-three.vercel.app",
        github: "https://github.com/mirzaali45/Finpro_Online-Grocery-Web-App_Frontend",
      },
      {
        id: 3,
        title: "Ticketing Event",
        description:
          "create a simple and functional event management platform that allows event organizers to create and promote events. this project is done by the team.",
        image: "/images/project3.jpg",
        category: "fullstack",
        tech: ["Typescript", "Nextjs", "Tailwindcss", "Node.js", "Supabase", "Prisma", "Express", "PostgreSQL"],
        link: "https://matchtix.vercel.app/",
        github: "https://github.com/muhammadwildansapoetro/ticketing-frontend",
      },
      {
        id: 4,
        title: "Company Profile",
        description:
          "a website with a company profile theme by creating a responsive website at purwadhika digital technology school by implementing the use of Library nextjs, tailwindcss, and Blog-CMS using Contentful.",
        image: "/images/project5.jpg",
        category: "frontend",
        tech: ["Typescript", "Nextjs", "Tailwindcss", "Blog-CMS"],
        link: "https://code-challange-yvho.vercel.app",
        github: "https://github.com/mirzaali45/code-challange",
      },
      {
        id: 5,
        title: "Domino Manipulation",
        description:
          "Create a single page application to show domino cards.",
        image: "/images/project6.jpg",
        category: "frontend",
        tech: ["Typescript", "Nextjs", "Tailwindcss"],
        link: "https://selection-test-dominos.vercel.app/",
        github: "https://github.com/mirzaali45/selection-test",
      },
      {
        id: 6,
        title: "API Payment Gateway",
        description:
          "RESTful API untuk payment gateway dengan integrasi multiple provider dan validasi keamanan. Termasuk dokumentasi API yang lengkap dan otorisasi JWT.",
        image: "/images/project4.jpg",
        category: "backend",
        tech: ["Node.js", "Express", "PostgreSQL", "Prisma", "Supabase"],
        github: "https://github.com/mirzaali45/Finpro_Online-Grocery-Web-App_Backend",
      },
    ];

    setProjects(projectsData);
    setFilteredProjects(projectsData);

    // Add small delay before animation
    setTimeout(() => {
      setAnimateCards(true);
    }, 500);
  }, []);

  useEffect(() => {
    // Update filtered projects when filter changes
    const filtered =
      filter === "all"
        ? projects
        : projects.filter((project) => project.category === filter);

    setFilteredProjects(filtered);
  }, [filter, projects]);

  const categories = [
    { value: "all", label: "Semua" },
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
    { value: "fullstack", label: "Fullstack" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const titleVariants = {
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
      id="projects"
      className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl font-bold mb-4 text-gradient"
            variants={titleVariants}
          >
            Recent Projects
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8"
            variants={titleVariants}
          >
            An exploration of some recent projects I've worked on using various
            modern technologies
          </motion.p>

          {/* Filter Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-8"
            variants={titleVariants}
          >
            {categories.map((category) => (
              <motion.button
                key={category.value}
                onClick={() => setFilter(category.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === category.value
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                    : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 shadow"
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        <div ref={ref}>
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Show more button (if needed) */}
        {projects.length > 3 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-full font-medium border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all"
            >
              View All Projects
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
