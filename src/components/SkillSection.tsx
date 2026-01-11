"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaDocker,
  FaGitAlt,
  FaAws,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiSupabase,
} from "react-icons/si";

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
  description: string;
}

const SkillsSection = () => {
  // Changed to triggerOnce: true and lowered threshold to ensure it stays visible
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: "0px 0px -10% 0px", // Trigger earlier
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const skillVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const frontendSkills: Skill[] = [
    {
      name: "React",
      icon: <FaReact size={30} />,
      level: 90,
      description:
        "Component-based UI development with React hooks and context API.",
    },
    {
      name: "TypeScript",
      icon: <SiTypescript size={30} />,
      level: 85,
      description:
        "Type-safe JavaScript with interfaces, generics, and utility types.",
    },
    {
      name: "Next.js",
      icon: <SiNextdotjs size={30} />,
      level: 80,
      description:
        "Server-side rendering, static site generation, and API routes.",
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss size={30} />,
      level: 95,
      description: "Utility-first CSS framework for rapid UI development.",
    },
  ];

  const backendSkills: Skill[] = [
    {
      name: "Node.js",
      icon: <FaNodeJs size={30} />,
      level: 85,
      description:
        "JavaScript runtime for building scalable server-side applications.",
    },
    {
      name: "Express",
      icon: <SiExpress size={30} />,
      level: 85,
      description: "Fast, unopinionated, minimalist web framework for Node.js.",
    },
    {
      name: "Supabase",
      icon: <SiSupabase size={30} />,
      level: 80,
      description:
        "Relational (PostgreSQL), Complete BaaS platform with relational database.",
    },
    {
      name: "PostgreSQL",
      icon: <SiPostgresql size={30} />,
      level: 75,
      description: "Powerful, open source object-relational database system.",
    },
  ];

  const otherSkills: Skill[] = [
    {
      name: "Git",
      icon: <FaGitAlt size={30} />,
      level: 90,
      description:
        "Version control system for tracking changes and collaborating on code.",
    },
    {
      name: "Docker",
      icon: <FaDocker size={30} />,
      level: 75,
      description:
        "Containerization platform for building, shipping and running applications.",
    },
    {
      name: "AWS",
      icon: <FaAws size={30} />,
      level: 70,
      description:
        "Cloud computing platform with wide variety of services and global infrastructure.",
    },
    {
      name: "Database Design",
      icon: <FaDatabase size={30} />,
      level: 80,
      description: "Database modeling, schema design, and query optimization.",
    },
  ];

  return (
    <section
      id="skills"
      className="py-24 bg-white dark:bg-dark relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/70 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-secondary/70 blur-3xl"></div>
      </div>

      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={titleVariants}
            className="text-4xl font-bold mb-4 text-gradient"
          >
            Expertise
          </motion.h2>
          <motion.p
            variants={titleVariants}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Technologies and tools that I am proficient in modern web
            development
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-16"
        >
          {/* Frontend Skills */}
          <motion.div
            variants={skillVariants}
            className="glass-card p-6 sm:p-8 rounded-xl backdrop-blur-sm"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 w-14 h-14 md:w-16 md:h-16 rounded-xl mb-4">
                <FaReact size={28} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold">Frontend</h3>
            </div>

            <div className="space-y-6 md:space-y-8">
              {frontendSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={skillVariants}
                  className="hover-card transition-all duration-300"
                >
                  <div className="flex items-center mb-2">
                    <span className="text-primary mr-3">{skill.icon}</span>
                    <span className="font-medium text-base md:text-lg">
                      {skill.name}
                    </span>
                    <span className="ml-auto text-sm text-gray-500">
                      {skill.level}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={
                        inView ? { width: `${skill.level}%` } : { width: 0 }
                      }
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                    ></motion.div>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {skill.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Backend Skills */}
          <motion.div
            variants={skillVariants}
            className="glass-card p-6 sm:p-8 rounded-xl backdrop-blur-sm"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 w-14 h-14 md:w-16 md:h-16 rounded-xl mb-4">
                <FaNodeJs size={28} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold">Backend</h3>
            </div>

            <div className="space-y-6 md:space-y-8">
              {backendSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={skillVariants}
                  className="hover-card transition-all duration-300"
                >
                  <div className="flex items-center mb-2">
                    <span className="text-primary mr-3">{skill.icon}</span>
                    <span className="font-medium text-base md:text-lg">
                      {skill.name}
                    </span>
                    <span className="ml-auto text-sm text-gray-500">
                      {skill.level}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={
                        inView ? { width: `${skill.level}%` } : { width: 0 }
                      }
                      transition={{ duration: 1, delay: index * 0.1 + 0.4 }}
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                    ></motion.div>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {skill.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Other Skills */}
          <motion.div
            variants={skillVariants}
            className="glass-card p-6 sm:p-8 rounded-xl backdrop-blur-sm"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-14 h-14 md:w-16 md:h-16 rounded-xl mb-4">
                <FaGitAlt size={28} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold">Tools & Others</h3>
            </div>

            <div className="space-y-6 md:space-y-8">
              {otherSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={skillVariants}
                  className="hover-card transition-all duration-300"
                >
                  <div className="flex items-center mb-2">
                    <span className="text-primary mr-3">{skill.icon}</span>
                    <span className="font-medium text-base md:text-lg">
                      {skill.name}
                    </span>
                    <span className="ml-auto text-sm text-gray-500">
                      {skill.level}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={
                        inView ? { width: `${skill.level}%` } : { width: 0 }
                      }
                      transition={{ duration: 1, delay: index * 0.1 + 0.8 }}
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                    ></motion.div>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {skill.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
