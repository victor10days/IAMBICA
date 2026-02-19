import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '../styles/theme';

export function useMobile() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile =
    Math.min(dimensions.width, dimensions.height) < BREAKPOINTS.mobile ||
    dimensions.width < BREAKPOINTS.tablet;

  return { isMobile, ...dimensions };
}
