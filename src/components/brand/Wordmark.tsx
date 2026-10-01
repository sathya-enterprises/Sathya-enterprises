import { CoreMark } from "./CoreMark";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <CoreMark size={26} />
      <span className="font-display text-[0.95rem] font-extrabold leading-[0.95] tracking-[-0.01em] font-stretch-110%">
        SATHYA
        <span className="block text-red">ENTERPRISES</span>
      </span>
    </span>
  );
}
