import Image from "next/image";
import logo from "../../../public/logo-512.png";

/** The original Sathya Enterprises whale emblem (round, transparent corners). */
export function Logo({ size = 44, eager, className }: { size?: number; eager?: boolean; className?: string }) {
  return (
    <Image
      src={logo}
      alt="Sathya Enterprises logo"
      width={size}
      height={size}
      loading={eager ? "eager" : "lazy"}
      className={className}
    />
  );
}
