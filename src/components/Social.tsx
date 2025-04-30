"use client";

import { FaGithub, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

interface SocialsProps {
  className?: string;
  iconSize?: number;
  vertical?: boolean;
}

const Socials = ({
  className = "",
  iconSize = 20,
  vertical = false,
}: SocialsProps) => {
  const socialLinks = [
    {
      icon: <FaGithub size={iconSize} />,
      url: "https://github.com/mirzaali45",
      label: "GitHub",
    },
    {
      icon: <FaLinkedinIn size={iconSize} />,
      url: "https://www.linkedin.com/in/mirzaaliyusuf",
      label: "LinkedIn",
    },
    {
      icon: <FaInstagram size={iconSize} />,
      url: "https://www.instagram.com/mirzaaliyusuf/",
      label: "Instagram",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className={`flex ${vertical ? "flex-col" : "flex-row"} ${
        vertical ? "space-y-4" : "space-x-4"
      } ${className}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {socialLinks.map((social, index) => (
        <motion.a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/10 hover:bg-primary p-3 rounded-full transition-colors"
        >
          {social.icon}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default Socials;
