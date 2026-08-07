import { Star } from "lucide-react";

type TestimonialCardProps = {
  quote: string;
  name: string;
  location: string;
};

export function TestimonialCard({ quote, name, location }: TestimonialCardProps) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
      <div className="flex gap-1 text-[#63cd26]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="mt-5 flex-1 text-base leading-relaxed text-[#202e25]/75">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-6 border-t border-black/5 pt-4">
        <p className="text-sm font-bold text-[#202e25]">{name}</p>
        <p className="text-xs text-[#202e25]/50">{location}</p>
      </div>
    </div>
  );
}
