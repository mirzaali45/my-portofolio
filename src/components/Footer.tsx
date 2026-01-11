"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaLinkedinIn,
  FaHeart,
  FaArrowUp,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const menuItems = [
    { label: "Beranda", href: "#" },
    { label: "Tentang", href: "#about" },
    { label: "Keahlian", href: "#skills" },
    { label: "Proyek", href: "#projects" },
    { label: "Kontak", href: "#contact" },
  ];

  const services = [
    "Web Development",
    "Mobile Apps",
    "UI/UX Design",
    "Konsultasi",
  ];

  const socialLinks = [
    {
      icon: <FaGithub size={18} />,
      href: "https://github.com/mirzaali45",
      label: "GitHub",
    },
    {
      icon: <FaLinkedinIn size={18} />,
      href: "https://www.linkedin.com/in/mirzaaliyusuf",
      label: "LinkedIn",
    },
    {
      icon: <FaInstagram size={18} />,
      href: "https://www.instagram.com/mirzaaliyusuf/",
      label: "Instagram",
    },
  ];

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="shrink-0 text-primary" />,
      text: "Bandung, Indonesia",
      href: null,
    },
    {
      icon: <FaEnvelope className="shrink-0 text-primary" />,
      text: "mirzaaliyusuf45@gmail.com",
      href: "mailto:mirzaaliyusuf45@gmail.com",
    },
    {
      icon: <FaPhone className="shrink-0 text-primary" />,
      text: "+62 821 6486 7475",
      href: "tel:+6282164867475",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-dark/95 to-dark text-white py-12 sm:py-16 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/5 blur-2xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-secondary/5 blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-10 lg:gap-8">
          
          {/* Logo & Description - 40% on desktop */}
          <div className="text-center md:text-left lg:col-span-4">
            <Link
              href="#"
              className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary inline-block mb-4"
            >
              mirzaaliyusuf<span className="text-white">.</span>
            </Link>
            <p className="text-gray-400 mt-2 leading-relaxed text-sm sm:text-base max-w-xs mx-auto md:mx-0">
              Fullstack developer focused on developing modern web applications
              with responsive interfaces and intuitive user experiences.
            </p>

            {/* Social icons */}
            <div className="flex mt-6 space-x-3 justify-center md:justify-start">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/10 hover:bg-primary text-white p-2.5 sm:p-3 rounded-lg transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Menu - 20% on desktop */}
          <div className="text-center md:text-left lg:col-span-2">
            <h3 className="text-lg sm:text-xl font-semibold mb-5 text-gradient">
              Menu
            </h3>
            <ul className="space-y-3">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-primary transition-colors inline-flex items-center group text-sm sm:text-base"
                  >
                    <span className="h-[1px] w-0 bg-primary mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300 hidden md:block"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - 20% on desktop */}
          <div className="text-center md:text-left lg:col-span-2">
            <h3 className="text-lg sm:text-xl font-semibold mb-5 text-gradient">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((item, index) => (
                <li key={index}>
                  <Link
                    href="#contact"
                    className="text-gray-400 hover:text-primary transition-colors inline-flex items-center group text-sm sm:text-base"
                  >
                    <span className="h-[1px] w-0 bg-primary mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300 hidden md:block"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact - 20% on desktop */}
          <div className="text-center md:text-left lg:col-span-2">
            <h3 className="text-lg sm:text-xl font-semibold mb-5 text-gradient">
              Contact
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index}>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-gray-400 hover:text-primary transition-colors inline-flex items-center gap-3 text-sm sm:text-base"
                    >
                      {info.icon}
                      <span>{info.text}</span>
                    </a>
                  ) : (
                    <span className="text-gray-400 inline-flex items-center gap-3 text-sm sm:text-base">
                      {info.icon}
                      <span>{info.text}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-10 sm:mt-12 pt-6 sm:pt-8">
          {/* Bottom section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-center sm:text-left text-xs sm:text-sm flex flex-wrap items-center justify-center sm:justify-start gap-1">
              <span>&copy; {currentYear} mirzaaliyusuf.</span>
              <span>All rights reserved.</span>
              <span className="flex items-center gap-1">
                Made with
                <FaHeart className="text-red-500 animate-pulse" />
                using Next.js & TailwindCSS
              </span>
            </p>

            <div className="text-gray-500 text-xs sm:text-sm flex gap-4 sm:gap-6">
              <Link
                href="#"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="#" 
                className="hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 bg-gradient-to-r from-primary to-secondary text-white p-3 rounded-full shadow-lg hover:shadow-xl"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
