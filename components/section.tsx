import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

export function Section({ children, className = "", innerClassName = "" }: SectionProps) {
  return (
    <section className={`px-4 py-14 sm:px-6 lg:px-8 lg:py-20 ${className}`}>
      <div className={`mx-auto max-w-7xl ${innerClassName}`}>{children}</div>
    </section>
  );
}
