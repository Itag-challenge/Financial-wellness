"use client";

import { useEffect, useState } from "react";

/**
 * AnimatedTextProps defines the props for the AnimatedText component.
 * @property text - The text to animate.
 * @property className - Additional Tailwind or CSS classes.
 * @property as - The HTML tag or React component to render as (default: span).
 */
interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

/**
 * AnimatedText animates text character-by-character.
 */
export default function AnimatedText({
  text,
  className = "",
  as: Tag = "span",
}: AnimatedTextProps) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayed((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust speed as needed

    return () => clearInterval(interval);
  }, [text]);

  return <Tag className={className}>{displayed}</Tag>;
}