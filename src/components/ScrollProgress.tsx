"use client";

const ScrollProgress = () => {
  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
      style={{ width: "var(--scroll-progress)" }}
    ></div>
  );
};

export default ScrollProgress;
