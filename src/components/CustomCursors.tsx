"use client";

import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
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
      document.body.classList.remove("cursor-active");
    };
  }, []);

  // Don't render the cursor on mobile devices
  if (typeof window !== "undefined" && window.innerWidth <= 768) {
    return null;
  }

  if (!isActive) return null;

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
