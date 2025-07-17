"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!scope.current) return; // 🛡️ Prevent animation errors during static build
    animate(
      "span",
      { opacity: 1 },
      {
        duration: 2,
        delay: stagger(0.2),
      }
    );
  }, [scope, animate]);

  const renderWords = () => {
    const wordsArray = words.split(" "); // ⬅️ now scoped to client render only
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className={`${
              idx > 3 ? "text-purple" : "dark:text-white text-black"
            } opacity-0`}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="my-4">
        <div className="dark:text-white text-black leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
