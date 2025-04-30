"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

const ContactForm = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  // Perbaikan: mengubah tipe ref menjadi HTMLDivElement
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulasi pengiriman form
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset pesan sukses setelah 5 detik
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  // Add animated bg effect
  useEffect(() => {
    if (!formContainerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } =
        formContainerRef.current!.getBoundingClientRect();

      // Calculate relative mouse position
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      // Update gradient position
      const gradientEl = formContainerRef.current!.querySelector(
        ".form-gradient"
      ) as HTMLElement;
      if (gradientEl) {
        gradientEl.style.background = `radial-gradient(circle at ${x * 100}% ${
          y * 100
        }%, rgba(14, 165, 233, 0.15), rgba(99, 102, 241, 0.05), transparent)`;
      }
    };

    formContainerRef.current.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (formContainerRef.current) {
        formContainerRef.current.removeEventListener(
          "mousemove",
          handleMouseMove
        );
      }
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

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
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
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="glass-card p-8 rounded-xl backdrop-blur-sm h-full flex flex-col">
              <h3 className="text-2xl font-bold mb-8 text-center lg:text-left">
                Contact Information
              </h3>

              <div className="space-y-8 flex-grow">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary p-4 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300">
                        {info.title}
                      </h4>
                      <a
                        href={info.link}
                        className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-medium mb-4 text-center lg:text-left">
                  Let's Get Connected
                </h4>
                <div className="flex justify-center lg:justify-start space-x-4">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg"
                  >
                    <FaEnvelope />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg"
                  >
                    <FaPhoneAlt />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-3 rounded-lg"
                  >
                    <FaMapMarkerAlt />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            {/* Perbaikan: menggunakan formContainerRef bukan formRef */}
            <div
              ref={formContainerRef}
              className="glass-card p-8 rounded-xl backdrop-blur-sm relative overflow-hidden"
            >
              {/* Interactive gradient background */}
              <div className="form-gradient absolute inset-0 opacity-50"></div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-8">Send Message</h3>

                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-300 p-4 rounded-lg mb-6 flex items-center"
                  >
                    <span className="inline-flex items-center justify-center bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300 w-8 h-8 rounded-full mr-3">
                      ✓
                    </span>
                    <span>
                      Message sent successfully! I will contact you soon.
                    </span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className={`absolute left-4 transition-all duration-300 ${
                          focusedInput === "name" || formData.name
                            ? "-top-2.5 text-xs bg-white dark:bg-dark px-2 text-primary"
                            : "top-3 text-gray-500"
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
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-dark/50 backdrop-blur-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className={`absolute left-4 transition-all duration-300 ${
                          focusedInput === "email" || formData.email
                            ? "-top-2.5 text-xs bg-white dark:bg-dark px-2 text-primary"
                            : "top-3 text-gray-500"
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
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-dark/50 backdrop-blur-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-6 relative">
                    <label
                      htmlFor="subject"
                      className={`absolute left-4 transition-all duration-300 ${
                        focusedInput === "subject" || formData.subject
                          ? "-top-2.5 text-xs bg-white dark:bg-dark px-2 text-primary"
                          : "top-3 text-gray-500"
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
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-dark/50 backdrop-blur-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="mb-6 relative">
                    <label
                      htmlFor="message"
                      className={`absolute left-4 transition-all duration-300 ${
                        focusedInput === "message" || formData.message
                          ? "-top-2.5 text-xs bg-white dark:bg-dark px-2 text-primary"
                          : "top-3 text-gray-500"
                      }`}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-dark/50 backdrop-blur-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    ></textarea>
                  </div>

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
