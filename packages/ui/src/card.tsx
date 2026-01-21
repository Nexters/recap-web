import { type JSX } from "react";

export function Card({
  className,
  title,
  children,
  href,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}): JSX.Element {
  return (
    <a
      className={`block p-6 rounded-xl border border-primary-200 bg-white hover:border-primary-400 hover:shadow-lg transition-all ${className ?? ""}`}
      href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <h2 className="text-xl font-semibold text-primary-900 mb-2">
        {title} <span className="text-primary-500">→</span>
      </h2>
      <p className="text-primary-600">{children}</p>
    </a>
  );
}
