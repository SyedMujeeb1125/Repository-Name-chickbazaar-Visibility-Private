import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export function InfoCard({
  title,
  children,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h3 className="mb-4 font-bold text-slate-700">
        {title}
      </h3>

      {children}
    </div>
  );
}