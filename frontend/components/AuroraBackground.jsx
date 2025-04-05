"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

const AuroraBackground = ({ children, className }) => {
  const auroraRef = useRef(null);

  useEffect(() => {
    const aurora = auroraRef.current;

    const animate = () => {
      if (!aurora) return;

      aurora.animate(
        [
          { transform: "translate(0%, 0%)" },
          { transform: "translate(100%, -100%)" },
          { transform: "translate(-100%, 100%)" },
          { transform: "translate(0%, 0%)" },
        ],
        {
          duration: 30000,
          iterations: Infinity,
        }
      );
    };

    animate();
  }, []);

  return (
    <div
      className={cn("relative w-full min-h-screen overflow-hidden", className)}
    >
      <div
        ref={auroraRef}
        className="absolute inset-0 z-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-30 blur-3xl"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AuroraBackground;
