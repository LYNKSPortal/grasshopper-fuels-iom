import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type PlaceholderImageProps = {
  className?: string;
  label?: string;
  iconClassName?: string;
};

export function PlaceholderImage({
  className,
  label = "Image Coming Soon",
  iconClassName,
}: PlaceholderImageProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-hidden bg-gradient-to-br from-[#18af8a]/15 via-[#f7faf9] to-[#63cd26]/15",
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #202e25 0, #202e25 1px, transparent 0, transparent 12px)",
        }}
      />
      <ImageIcon
        className={cn("relative h-8 w-8 text-[#202e25]/25", iconClassName)}
        strokeWidth={1.5}
      />
      <span className="relative text-xs font-bold uppercase tracking-wider text-[#202e25]/35">
        {label}
      </span>
    </div>
  );
}
