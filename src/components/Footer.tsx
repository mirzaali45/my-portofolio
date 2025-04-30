"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
  FaHeart,
  FaArrowUp,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Detect scroll position to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-gradient-to-br from-dark/95 to-dark text-white py-16 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/5 blur-2xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-secondary/5 blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Logo & Description */}
          <div className="md:col-span-5">
            <Link
              href="#"
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary inline-block mb-6"
            >
              Portfolio<span className="text-white">.</span>
            </Link>
            <p className="text-gray-400 mt-4 leading-relaxed max-w-md">
              Fullstack developer focused on developing modern web applications
              with responsive interfaces and intuitive user experiences.
            </p>

            {/* Social icons */}
            <div className="flex mt-8 space-x-4">
              <motion.a
                href="https://github.com/mirzaali45"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/10 hover:bg-primary text-white p-3 rounded-lg transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/mirzaaliyusuf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/10 hover:bg-primary text-white p-3 rounded-lg transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={18} />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/mirzaaliyusuf/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/10 hover:bg-primary text-white p-3 rounded-lg transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-xl font-semibold mb-6 text-gradient">Menu</h3>
            <ul className="space-y-4">
              {["Home Page", "About", "Expertise", "Project", "Contact"].map(
                (item, index) => (
                  <li key={index}>
                    <Link
                      href={`#${
                        item.toLowerCase() === "Home Page"
                          ? ""
                          : item.toLowerCase()
                      }`}
                      className="text-gray-400 hover:text-primary transition-colors flex items-center group"
                    >
                      <span className="h-[1px] w-0 bg-primary mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></span>
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-6 text-gradient">
              Services
            </h3>
            <ul className="space-y-4">
              {[
                "Web Development",
                "Mobile Apps",
                "UI/UX Design",
                "Konsultasi",
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href="#contact"
                    className="text-gray-400 hover:text-primary transition-colors flex items-center group"
                  >
                    <span className="h-[1px] w-0 bg-primary mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-6 text-gradient">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="text-gray-400 flex items-start">
                <span className="mt-1 mr-2">🏠</span>
                <span>Bandung, Indonesia</span>
              </li>
              <li>
                <a
                  href="mailto:contact@example.com"
                  className="text-gray-400 hover:text-primary transition-colors flex items-start"
                >
                  <span className="mt-1 mr-2">✉️</span>
                  <span>mirzaaliyusuf45@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+6281234567890"
                  className="text-gray-400 hover:text-primary transition-colors flex items-start"
                >
                  <span className="mt-1 mr-2">📱</span>
                  <span>+62 821 6486 7475</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 mb-4 md:mb-0 flex items-center">
            &copy; {currentYear} Portfolio. All rights reserved. Made with
            <FaHeart className="inline-block text-red-500 mx-2 animate-pulse" />
            using Next.js & TailwindCSS
          </p>

          <div className="text-gray-500 text-sm">
            <Link
              href="#"
              className="hover:text-primary transition-colors mr-4"
            >
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-primary to-secondary text-white p-3 rounded-full shadow-lg"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0.5,
          y: showScrollTop ? 0 : 20,
        }}
        transition={{ duration: 0.3 }}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </motion.button>
    </footer>
  );
};

export default Footer;
