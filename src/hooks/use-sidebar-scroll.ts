"use client";

import { useState, useEffect, RefObject, useLayoutEffect, useRef } from "react";

export function useSidebarScroll(
  sidebarRef: RefObject<HTMLDivElement | null>,
  footerRef: RefObject<HTMLElement | null>
) {
  const [sidebarStyle, setSidebarStyle] = useState<React.CSSProperties>({});
  const [initialTop, setInitialTop] = useState<number | null>(null);
  const lastPositionRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  // Save the initial position of the sidebar once only
  useLayoutEffect(() => {
    if (sidebarRef.current && initialTop === null) {
      const top = sidebarRef.current.getBoundingClientRect().top + window.scrollY;
      setInitialTop(top);
    }
  }, [initialTop, sidebarRef]);

  useEffect(() => {
    if (!sidebarRef.current || !footerRef.current || initialTop === null) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      // Cancel previous animation frame if exists
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        const sidebar = sidebarRef.current;
        const footer = footerRef.current;

        // Early return if either ref is null
        if (!sidebar || !footer) {
          ticking = false;
          return;
        }

        const footerRect = footer.getBoundingClientRect();
        const sidebarRect = sidebar.getBoundingClientRect();
        const headerHeight = 90;
        const safetyMargin = 50;
        
        // If scrolled past the initial position of the sidebar
        if (window.scrollY > initialTop - headerHeight) {
          // Calculate footer position in viewport
          const footerTopFromViewport = footerRect.top;
          // Sidebar height
          const sidebarHeight = sidebarRect.height;
          
          // Check if sidebar is close to touching the footer
          const willOverlap = headerHeight + sidebarHeight + safetyMargin > footerTopFromViewport;
          
          if (willOverlap) {
            // Calculate new position for sidebar to avoid touching footer
            const newTopPosition = footerTopFromViewport - sidebarHeight - safetyMargin;
            
            // Only update style if position has changed significantly
            if (lastPositionRef.current === null || Math.abs(lastPositionRef.current - newTopPosition) > 2) {
              setSidebarStyle({
                position: "fixed",
                top: `${newTopPosition}px`,
                width: `${sidebar.offsetWidth}px`,
                transition: "top 0.1s ease-out",
              });
              lastPositionRef.current = newTopPosition;
            }
          } else {
            // If not close to touching footer, keep normal fixed position
            if (lastPositionRef.current !== headerHeight) {
              setSidebarStyle({
                position: "fixed",
                top: `${headerHeight}px`,
                width: `${sidebar.offsetWidth}px`,
                transition: "top 0.2s ease-out",
              });
              lastPositionRef.current = headerHeight;
            }
          }
        } else {
          // If not scrolled past initial position, keep static
          if (lastPositionRef.current !== null) {
            setSidebarStyle({
              position: "static",
              transition: "none", // No transition needed when returning to static
            });
            lastPositionRef.current = null;
          }
        }

        frameRef.current = null;
        ticking = false;
      });
    };

    // Use passive event listener to improve scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Call once initially
    handleScroll();

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [initialTop, sidebarRef, footerRef]);

  return sidebarStyle;
} 
