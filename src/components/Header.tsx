"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "./ThemeProviders";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fix hydration mismatch - wait until component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu when clicking anywhere on the page
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen) {
        const target = e.target as HTMLElement;
        if (!target.closest("[data-menu-container]")) {
          setIsOpen(false);
        }
      }
    };

    timeoutRef.current = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 100);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  // Handle scroll event to change header style
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  // Menu items
  const menuItems = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  // Social links - Update dengan URL profil Anda yang sebenarnya
  const socialLinks = [
    { platform: "github", url: "https://github.com/mirzaaliyusuf" },
    { platform: "linkedin", url: "https://linkedin.com/in/mirzaaliyusuf" },
    { platform: "twitter", url: "https://twitter.com/mirzaaliyusuf" },
  ];

  // Stop body scroll when mobile menu is open
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      // FIX: Tambahkan ini untuk memastikan scroll position tetap
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isOpen]);

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

  // Render theme toggle icon - prevents hydration mismatch
  const renderThemeIcon = (isMobile = false) => {
    if (!mounted) {
      return <div className="w-5 h-5" />;
    }

    if (theme === "dark") {
      return <FiSun className="text-light text-xl" />;
    }

    if (isMobile) {
      return (
        <FiMoon
          className={`text-xl ${
            isOpen
              ? "text-light"
              : scrolled
              ? "text-dark dark:text-light"
              : "text-light"
          }`}
        />
      );
    }

    return (
      <FiMoon
        className={`text-xl ${scrolled ? "text-dark" : "text-light"}`}
      />
    );
  };

  return (
    <>
      {/* FIX: Mobile Menu Overlay - Dipindahkan ke luar header dan diberi z-index lebih tinggi */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] md:hidden"
            data-menu-container
          >
            {/* Background overlay - sekarang 100% solid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-dark dark:bg-black"
            />
            
            {/* Menu content dengan animasi slide */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="relative z-10 h-full flex items-center justify-center"
            >
              <nav className="w-full max-w-sm mx-auto px-4">
                <ul className="flex flex-col space-y-6 text-center">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="text-2xl font-medium text-light hover:text-primary transition-colors block py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Social icons for mobile menu */}
                <div className="mt-12 flex justify-center">
                  <div className="flex space-x-6">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-light hover:text-primary transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        aria-label={`Visit ${social.platform} profile`}
                      >
                        {social.platform === "github" && (
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        {social.platform === "linkedin" && (
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        )}
                        {social.platform === "twitter" && (
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.531A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        )}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className={`fixed top-0 left-0 w-full z-[70] transition-all duration-500 ${
          isOpen
            ? "bg-transparent py-4" // FIX: Header transparan saat menu terbuka
            : scrolled
            ? "bg-white/80 dark:bg-dark/80 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-4 md:py-6"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="#" className="text-2xl font-bold relative group z-[80]">
            <span
              className={`${
                scrolled || isOpen ? "text-primary" : "text-gradient"
              }`}
            >
              mirzaaliyusuf
            </span>
            <span
              className={`absolute -bottom-1 right-0 text-3xl group-hover:animate-pulse ${
                isOpen ? "text-white" : "text-secondary"
              }`}
            >
              .
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <ul className="flex space-x-4 lg:space-x-8">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`hover-underline font-medium relative overflow-hidden transition-colors duration-300 ${
                      scrolled ? "text-dark dark:text-light" : "text-light"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Theme Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleTheme();
              }}
              className="bg-white/10 dark:bg-dark/10 hover:bg-primary/20 p-2 rounded-full transition-colors duration-300"
              aria-label={
                theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {renderThemeIcon()}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div
            className="md:hidden flex items-center space-x-4 z-[80]"
            data-menu-container
          >
            {/* Theme Toggle (Mobile) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleTheme();
              }}
              className="bg-white/10 dark:bg-dark/10 hover:bg-primary/20 p-2 rounded-full transition-colors"
              aria-label={
                theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {renderThemeIcon(true)}
            </button>

            <button
              className="text-2xl"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
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
      </motion.header>
    </>
  );
};

export default Header;
