import { Truck } from "lucide-react";

export function AnnouncementBanner() {
  return (
    <div className="fixed top-0 z-[60] flex h-10 w-full items-center justify-center bg-[#202e25] px-4 text-center">
      <p className="flex items-center gap-2 text-xs font-semibold text-white sm:text-sm">
        <Truck className="h-4 w-4 shrink-0 text-[#63cd26]" />
        <span>
          Remember, we offer{" "}
          <span className="text-[#63cd26]">free island-wide delivery</span>
          &nbsp;&mdash; we bring it to you!
        </span>
      </p>
    </div>
  );
}
