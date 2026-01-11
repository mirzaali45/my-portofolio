"use client";

import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // Default to true for SSR

  // Check if it's a mobile device - safely
  useEffect(() => {
    // Skip the effect during SSR
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return;
    }

    const checkMobile = () => {
      // Check if browser has touch capability - use standards-compliant properties
      const hasTouchScreen =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

      // Check if viewport is small
      const isSmallScreen = window.innerWidth <= 768;

      setIsMobile(hasTouchScreen || isSmallScreen);
    };

    // Perform initial check
    checkMobile();

    // Set up window resize listener
    window.addEventListener("resize", checkMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Set up cursor tracking - only when not on mobile
  useEffect(() => {
    // Skip effect during SSR or on mobile
    if (typeof window === "undefined" || isMobile) {
      return;
    }

    // Add cursor tracking
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Update CSS variables for custom animations
      document.documentElement.style.setProperty(
        "--cursor-x",
        `${e.clientX}px`
      );
      document.documentElement.style.setProperty(
        "--cursor-y",
        `${e.clientY}px`
      );
    };

    // Detect hovering over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.classList.contains("interactive") ||
        target.closest("a") !== null ||
        target.closest("button") !== null;

      setIsHovering(isInteractive);
    };

    // Wait to activate cursor to avoid flash during page load
    const timer = setTimeout(() => {
      setIsActive(true);
      document.body.classList.add("cursor-active");
    }, 1000);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      clearTimeout(timer);
      if (document.body) {
        document.body.classList.remove("cursor-active");
      }
    };
  }, [isMobile]);

  // Don't render the cursor on mobile devices or during SSR
  if (isMobile || !isActive || typeof window === "undefined") {
    return null;
  }

  return (
    <>
      <div
        className={`custom-cursor ${isHovering ? "scale-150" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      <div
        className="custom-cursor-point"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      <div className={isHovering ? "cursor-hover" : ""}></div>
    </>
  );
};

export default CustomCursor;
