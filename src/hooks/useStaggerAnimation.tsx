import { useEffect, useRef, useState } from "react";

interface StaggerAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  staggerDelay?: number; // delay between each item in ms
}

export const useStaggerAnimation = (options: StaggerAnimationOptions = {}) => {
  const { threshold = 0.1, triggerOnce = true, staggerDelay = 100 } = options;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, triggerOnce]);

  const getItemStyle = (index: number) => ({
    animationDelay: `${index * staggerDelay}ms`,
  });

  return { ref, isVisible, getItemStyle, staggerDelay };
};
