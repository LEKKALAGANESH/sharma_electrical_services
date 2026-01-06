import { useState, useEffect } from 'react';

/**
 * Custom hook to track the currently active section based on scroll position
 * @param {string[]} sectionIds - Array of section IDs to track
 * @param {number} offset - Offset from top of viewport (default: 100px)
 * @returns {string} - Currently active section ID
 */
const useActiveSection = (sectionIds = [], offset = 100) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          return;
        }
      }

      setActiveSection(sectionIds[0]);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
};

export default useActiveSection;
