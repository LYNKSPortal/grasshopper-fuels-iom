import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider",
            light
              ? "bg-white/10 text-[#63cd26]"
              : "bg-[#18af8a]/10 text-[#18af8a]"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl",
          light ? "text-white" : "text-[#202e25]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            light ? "text-white/70" : "text-[#202e25]/65"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
