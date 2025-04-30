"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "./ThemeProviders";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Menu items
  const menuItems = [
    { label: "Home Page", href: "#" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  // Header animation variants
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 dark:bg-dark/80 backdrop-blur-md shadow-lg py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="#" className="text-2xl font-bold relative group">
          <span className="text-gradient">Portfolio</span>
          <span className="text-secondary absolute -bottom-1 right-0 text-3xl group-hover:animate-pulse">
            .
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`hover-underline font-medium relative overflow-hidden ${
                    scrolled ? "text-dark dark:text-light" : "text-light"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="bg-white/10 dark:bg-dark/10 hover:bg-primary/20 p-2 rounded-full transition-colors duration-300"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <FiSun className="text-light text-xl" />
            ) : (
              <FiMoon
                className={`text-xl ${scrolled ? "text-dark" : "text-light"}`}
              />
            )}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Theme Toggle (Mobile) */}
          <button
            onClick={toggleTheme}
            className="bg-white/10 dark:bg-dark/10 hover:bg-primary/20 p-2 rounded-full transition-colors"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <FiSun className="text-light text-xl" />
            ) : (
              <FiMoon
                className={`text-xl ${scrolled ? "text-dark" : "text-light"}`}
              />
            )}
          </button>

          <button
            className="text-2xl z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <HiX className="text-light" />
            ) : (
              <HiMenuAlt3
                className={
                  scrolled ? "text-dark dark:text-light" : "text-light"
                }
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="fixed inset-0 bg-dark/95 dark:bg-black/95 backdrop-blur-md z-40 flex items-center justify-center md:hidden"
          >
            <nav>
              <ul className="flex flex-col space-y-8 text-center">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="text-2xl font-medium text-light hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
