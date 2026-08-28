'use client';

import * as React from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';

export function ReadingGuide() {
  const { readingGuide } = useAccessibility();
  const [mouseY, setMouseY] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!readingGuide) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      setMouseY(null);
    };
  }, [readingGuide]);

  if (!readingGuide || mouseY === null) return null;

  return (
    <div
      aria-hidden="true"
      className="hidden [@media(hover:hover)_and_(pointer:fine)]:block pointer-events-none fixed left-0 right-0 z-9999 h-12 -mt-6 border-y-2 border-primary/60 bg-primary/10 shadow-[0_0_0_9999px_rgba(0,0,0,0.15)] transition-transform duration-75 ease-out"
      style={{
        top: `${mouseY}px`,
      }}
    />
  );
}





// 'use client';

// import * as React from 'react';
// import { useAccessibility } from '@/context/AccessibilityContext';

// export function ReadingGuide() {
//   const { readingGuide } = useAccessibility();
//   const [mouseY, setMouseY] = React.useState<number | null>(null);

//   React.useEffect(() => {
//     if (!readingGuide) {
//       setMouseY(null);
//       return;
//     }

//     const handleMouseMove = (e: MouseEvent) => {
//       setMouseY(e.clientY);
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, [readingGuide]);

//   if (!readingGuide || mouseY === null) return null;

//   return (
//     <div
//       aria-hidden="true"
//       className="hidden md:block pointer-events-none fixed left-0 right-0 z-[9999] h-12 -mt-6 border-y-2 border-primary/60 bg-primary/10 shadow-[0_0_0_9999px_rgba(0,0,0,0.15)] transition-transform duration-75 ease-out"
//       style={{
//         top: `${mouseY}px`,
//       }}
//     />
//   );
// }