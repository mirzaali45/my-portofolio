"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

// ==========================================
// KONFIGURASI EMAILJS - MASUKKAN CREDENTIALS ANDA
// ==========================================
const EMAILJS_SERVICE_ID = "service_fdvfxaa"; // Ganti dengan Service ID Anda
const EMAILJS_TEMPLATE_ID = "template_y4hyp0b"; // Template ID Anda
const EMAILJS_PUBLIC_KEY = "NN2bIEAVjCaQYNsf2"; // Public Key Anda
// ==========================================

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: "idle" | "submitting" | "success" | "error";
  message: string;
}

const ContactForm = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px",
  });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: "idle",
    message: "",
  });

  const formRef = useRef<HTMLFormElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFocusedInput(e.target.name);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  // Validasi email sederhana
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validasi form
  const validateForm = (): string | null => {
    if (!formData.name.trim()) {
      return "Please enter your name";
    }
    if (!formData.email.trim()) {
      return "Please enter your email";
    }
    if (!isValidEmail(formData.email)) {
      return "Please enter a valid email address";
    }
    if (!formData.subject.trim()) {
      return "Please enter a subject";
    }
    if (!formData.message.trim()) {
      return "Please enter your message";
    }
    if (formData.message.trim().length < 10) {
      return "Message must be at least 10 characters";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi
    const validationError = validateForm();
    if (validationError) {
      setFormStatus({
        type: "error",
        message: validationError,
      });
      return;
    }

    setFormStatus({ type: "submitting", message: "" });

    try {
      // Kirim email menggunakan EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: "Mirza Ali Yusuf",
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setFormStatus({
          type: "success",
          message: "Message sent successfully! I will contact you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Reset status setelah 5 detik
        setTimeout(() => {
          setFormStatus({ type: "idle", message: "" });
        }, 5000);
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setFormStatus({
        type: "error",
        message:
          "Failed to send message. Please try again or contact me directly via email.",
      });

      // Reset error setelah 5 detik
      setTimeout(() => {
        setFormStatus({ type: "idle", message: "" });
      }, 5000);
    }
  };

  // Animated background effect - only on desktop
  useEffect(() => {
    const container = formContainerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth <= 768) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();

      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      const gradientEl = container.querySelector(
        ".form-gradient"
      ) as HTMLElement;

      if (gradientEl) {
        gradientEl.style.background = `radial-gradient(circle at ${x * 100}% ${
          y * 100
        }%, rgba(14, 165, 233, 0.15), rgba(99, 102, 241, 0.05), transparent)`;
      }
    };

    let ticking = false;
    const throttledMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleMouseMove(e);
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener("mousemove", throttledMouseMove);

    return () => {
      container.removeEventListener("mousemove", throttledMouseMove);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: "Email",
      value: "mirzaaliyusuf45@gmail.com",
      link: "mailto:mirzaaliyusuf45@gmail.com",
    },
    {
      icon: <FaPhoneAlt />,
      title: "Phone",
      value: "+62 821 6486 7475",
      link: "tel:+6282164867475",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
      value: "Bandung, Indonesia",
      link: "https://maps.app.goo.gl/DYzXPbdV5wnGfx1L7",
    },
  ];

  const isSubmitting = formStatus.type === "submitting";

  return (
    <section
      id="contact"
      className="py-24 bg-light dark:bg-dark relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/70 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-secondary/70 blur-3xl"></div>
      </div>

      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold mb-4 text-gradient"
          >
            Contact Me
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Interested in working together? Feel free to contact me through the
            form or contact below.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="glass-card p-6 sm:p-8 rounded-xl backdrop-blur-sm h-full flex flex-col">
              <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center lg:text-left">
                Contact Information
              </h3>

              <div className="space-y-6 md:space-y-8 flex-grow">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-lg text-white shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300">
                        {info.title}
                      </h4>
                      <a
                        href={info.link}
                        className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors break-all"
                        target={
                          info.link.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          info.link.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-medium mb-4 text-center lg:text-left">
                  Let's Get Connected
                </h4>
                <div className="flex justify-center lg:justify-start space-x-4">
                  <motion.a
                    href="mailto:mirzaaliyusuf45@gmail.com"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg"
                    aria-label="Send email"
                  >
                    <FaEnvelope />
                  </motion.a>
                  <motion.a
                    href="tel:+6282164867475"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg"
                    aria-label="Call phone"
                  >
                    <FaPhoneAlt />
                  </motion.a>
                  <motion.a
                    href="https://maps.app.goo.gl/DYzXPbdV5wnGfx1L7"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-3 rounded-lg"
                    aria-label="View location"
                  >
                    <FaMapMarkerAlt />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div
              ref={formContainerRef}
              className="glass-card p-6 sm:p-8 rounded-xl backdrop-blur-sm relative overflow-hidden"
            >
              {/* Interactive gradient background */}
              <div className="form-gradient absolute inset-0 opacity-50"></div>

              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">
                  Send Message
                </h3>

                {/* Success Message */}
                {formStatus.type === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-300 p-4 rounded-lg mb-6 flex items-center"
                  >
                    <FaCheckCircle className="w-5 h-5 mr-3 shrink-0" />
                    <span>{formStatus.message}</span>
                  </motion.div>
                )}

                {/* Error Message */}
                {formStatus.type === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300 p-4 rounded-lg mb-6 flex items-center"
                  >
                    <FaExclamationCircle className="w-5 h-5 mr-3 shrink-0" />
                    <span>{formStatus.message}</span>
                  </motion.div>
                )}

                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                    {/* Name Input */}
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className={`absolute left-3 transition-all duration-300 pointer-events-none z-10 ${
                          focusedInput === "name" || formData.name
                            ? "-top-2 text-xs bg-light dark:bg-dark px-2 text-primary rounded"
                            : "top-3 text-gray-500 px-1"
                        }`}
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-dark/50 backdrop-blur-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className={`absolute left-3 transition-all duration-300 pointer-events-none z-10 ${
                          focusedInput === "email" || formData.email
                            ? "-top-2 text-xs bg-light dark:bg-dark px-2 text-primary rounded"
                            : "top-3 text-gray-500 px-1"
                        }`}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-dark/50 backdrop-blur-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div className="mb-4 md:mb-6 relative">
                    <label
                      htmlFor="subject"
                      className={`absolute left-3 transition-all duration-300 pointer-events-none z-10 ${
                        focusedInput === "subject" || formData.subject
                          ? "-top-2 text-xs bg-light dark:bg-dark px-2 text-primary rounded"
                          : "top-3 text-gray-500 px-1"
                      }`}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-dark/50 backdrop-blur-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Message Input */}
                  <div className="mb-4 md:mb-6 relative">
                    <label
                      htmlFor="message"
                      className={`absolute left-3 transition-all duration-300 pointer-events-none z-10 ${
                        focusedInput === "message" || formData.message
                          ? "-top-2 text-xs bg-light dark:bg-dark px-2 text-primary rounded"
                          : "top-3 text-gray-500 px-1"
                      }`}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-dark/50 backdrop-blur-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                      required
                      disabled={isSubmitting}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={
                      !isSubmitting
                        ? {
                            scale: 1.02,
                            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
                          }
                        : {}
                    }
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                    <FaPaperPlane
                      className={isSubmitting ? "animate-bounce" : ""}
                    />
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
