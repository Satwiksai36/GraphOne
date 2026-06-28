'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollAnimator() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Create an intersection observer to trigger fade-in animations on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Unobserve once element is visible
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -60px 0px', // Trigger slightly before it enters viewport
      }
    );

    // Target all sections, leaderboards, and large layout containers
    const sections = document.querySelectorAll('section, footer');
    sections.forEach((section) => {
      section.classList.add('animate-fade-in');
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, [pathname]); // Re-run when pathname changes to hook newly rendered elements

  return null;
}
