"use client";

import katex from "katex";

type EquationProps = {
  latex: string;
  display?: boolean;
  className?: string;
};

export function Equation({ latex, display = false, className }: EquationProps) {
  const html = katex.renderToString(latex, {
    displayMode: display,
    throwOnError: false,
    output: "html",
  });

  return (
    <span
      className={className}
      role="math"
      aria-label={latex}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
