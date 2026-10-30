"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

// Aceternity's Layout Text Flip, adapted: the leading text is optional, the
// box uses the site's theme tokens, and passing `index` makes it controlled
// (it shows that word and stops cycling on its own)
export const LayoutTextFlip = ({
  text,
  words = ["Landing Pages", "Component Blocks", "Page Sections", "3D Shaders"],
  duration = 3000,
  index,
  className,
}: {
  text?: string;
  words: string[];
  duration?: number;
  index?: number;
  className?: string;
}) => {
  const [autoIndex, setAutoIndex] = useState(0);
  const currentIndex = index ?? autoIndex;

  useEffect(() => {
    if (index !== undefined) return;
    const interval = setInterval(() => {
      setAutoIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [index, duration, words.length]);

  return (
    <>
      {text && (
        <motion.span
          layoutId="subtext"
          className="text-2xl font-bold tracking-tight drop-shadow-lg md:text-4xl"
        >
          {text}
        </motion.span>
      )}

      <motion.span
        layout
        className={cn(
          "relative w-fit overflow-hidden rounded-md border border-line-strong bg-panel px-4 py-2 font-mono text-[13px] text-ink shadow-lg shadow-black/20",
          className,
        )}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentIndex}
            initial={{ y: -40, filter: "blur(10px)" }}
            animate={{
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{ y: 50, filter: "blur(10px)", opacity: 0 }}
            transition={{
              duration: 0.5,
            }}
            className={cn("inline-block whitespace-nowrap")}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
};
