import { useEffect, useRef } from "react";

interface ParallaxOptions {
  speed?: number;
  reverse?: boolean;
}

/**
 * Custom hook for creating parallax scrolling effects
 * @param options Configuration options for the parallax effect
 * @returns A ref to be attached to the element that should have the parallax effect
 */
export const useParallax = ({
  speed = 0.5,
  reverse = false,
}: ParallaxOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const rect = element.getBoundingClientRect();
      const offsetY = scrollY + rect.top;
      const viewportHeight = window.innerHeight;

      // Only apply parallax when element is in viewport or close to it
      if (
        rect.bottom > -viewportHeight / 2 &&
        rect.top < viewportHeight * 1.5
      ) {
        const parallaxOffset = (scrollY - offsetY) * speed * (reverse ? -1 : 1);
        element.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;
      }
    };

    // Initial calculation
    handleScroll();

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed, reverse]);

  return ref;
};

export default useParallax;
