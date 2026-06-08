import type { ReactNode } from "react";
import { Section } from "@/components/section";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  children: ReactNode;
};

export function PageHero({ eyebrow, title, children }: PageHeroProps) {
  return (
    <Section className="bg-slate-50" innerClassName="max-w-4xl">
      {eyebrow ? (
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">{eyebrow}</p>
      ) : null}
      <h1 className="mt-3 text-4xl font-extrabold tracking-normal text-navy sm:text-5xl">
        {title}
      </h1>
      <div className="mt-5 text-lg leading-8 text-slate-600">{children}</div>
    </Section>
  );
}
