import type { LucideIcon } from "lucide-react";

type DeliveryInfoCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function DeliveryInfoCard({
  icon: Icon,
  title,
  description,
}: DeliveryInfoCardProps) {
  return (
    <div className="flex gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#18af8a]/10 text-[#18af8a]">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <h3 className="text-base font-bold text-[#202e25]">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-[#202e25]/60">
          {description}
        </p>
      </div>
    </div>
  );
}
