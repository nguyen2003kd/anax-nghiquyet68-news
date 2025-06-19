"use client";

import { useState, useEffect, RefObject, useLayoutEffect, useRef, useCallback } from "react";

/**
 * Custom hook to keep a sidebar fixed on scroll, but prevent it from overlapping the footer.
 * The sidebar will stick below the header and stop before touching the footer.
 *
 * @param sidebarRef - ref to the sidebar element
 * @param footerRef - ref to the footer element
 * @param headerSelector - (optional) CSS selector for the header, default is 'header'
 * @returns sidebarStyle - style object to apply to the sidebar
 */
export function useSidebarScroll(
  sidebarRef: RefObject<HTMLDivElement | null>,
  footerRef: RefObject<HTMLElement | null>,
  headerSelector: string = "header"
) {
  // Sidebar style state
  const [sidebarStyle, setSidebarStyle] = useState<React.CSSProperties>({});
  // Initial top position of the sidebar (relative to the page)
  const [initialTop, setInitialTop] = useState<number | null>(null);
  // Store the last position to avoid unnecessary style updates
  const lastPositionRef = useRef<number | null>(null);
  // Store the animation frame id for cleanup
  const frameRef = useRef<number | null>(null);

  // Margin to keep between the sidebar and the footer
  const safetyMargin = 50;

  // Save the initial position of the sidebar only once
  useLayoutEffect(() => {
    if (sidebarRef.current && initialTop === null) {
      const top = sidebarRef.current.getBoundingClientRect().top + window.scrollY;
      setInitialTop(top);
    }
  }, [initialTop, sidebarRef]);

  // Main scroll/resize handler
  const handleScroll = useCallback(() => {
    // Helper to get the header height dynamically
    const getHeaderHeight = () => {
      const header = document.querySelector(headerSelector);
      return header ? header.getBoundingClientRect().height : 0;
    };
    if (!sidebarRef.current || !footerRef.current || initialTop === null) return;

    // Cancel previous animation frame if exists
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      const sidebar = sidebarRef.current;
      const footer = footerRef.current;
      const headerHeight = getHeaderHeight();

      if (!sidebar || !footer) return;

      const footerRect = footer.getBoundingClientRect();
      const sidebarRect = sidebar.getBoundingClientRect();

      // If the user has scrolled past the initial sidebar position (minus header height)
      if (window.scrollY > initialTop - headerHeight) {
        // Calculate the top of the footer relative to the viewport
        const footerTopFromViewport = footerRect.top;
        // Sidebar height
        const sidebarHeight = sidebarRect.height;
        // Check if the sidebar would overlap the footer
        const willOverlap = headerHeight + sidebarHeight + safetyMargin > footerTopFromViewport;

        let newStyle: React.CSSProperties;
        let newPosition: number | null;

        if (willOverlap) {
          // Sidebar is close to the footer, stick it just above the footer
          const newTopPosition = footerTopFromViewport - sidebarHeight - safetyMargin;
          newStyle = {
            position: "fixed",
            top: `${newTopPosition}px`,
            width: `${sidebar.offsetWidth}px`,
            transition: "top 0.1s ease-out",
          };
          newPosition = newTopPosition;
        } else {
          // Sidebar is not close to the footer, stick it below the header
          newStyle = {
            position: "fixed",
            top: `${headerHeight}px`,
            width: `${sidebar.offsetWidth}px`,
            transition: "top 0.2s ease-out",
          };
          newPosition = headerHeight;
        }

        // Only update style if the position has changed
        if (lastPositionRef.current !== newPosition) {
          setSidebarStyle(newStyle);
          lastPositionRef.current = newPosition;
        }
      } else {
        // If not scrolled past the initial position, keep sidebar static
        if (lastPositionRef.current !== null) {
          setSidebarStyle({
            position: "static",
            transition: "none",
          });
          lastPositionRef.current = null;
        }
      }

      frameRef.current = null;
    });
  }, [initialTop, sidebarRef, footerRef, safetyMargin, headerSelector]);

  // Attach scroll and resize listeners
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Call once initially to set the correct position
    handleScroll();

    // Cleanup listeners and animation frame on unmount
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  // Return the style object to apply to the sidebar
  return sidebarStyle;
} 
