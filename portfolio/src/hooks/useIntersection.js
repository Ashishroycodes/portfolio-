import { useState, useEffect, useRef } from 'react';

/**
 * Hook to trigger animations when element enters viewport
 * @param {Object} options - IntersectionObserver options
 * @returns {[React.RefObject, boolean]}
 */
export function useIntersection(options = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Once visible, keep visible (unobserve)
        observer.unobserve(element);
      }
    }, options);

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [options]);

  return [ref, isVisible];
}
