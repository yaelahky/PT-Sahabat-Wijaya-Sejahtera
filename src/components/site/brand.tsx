import Image from "next/image";
import { cn } from "@/lib/utils";
import { withBasePath } from "@/lib/base-path";

export function Brand({ className }: { className?: string }) {
  return (
    <span className={cn("flex h-11 w-[220px] shrink-0 items-center gap-2.5 text-[var(--ink)]", className)}>
      <Image src={withBasePath("/brand/logo.png")} alt="" width={44} height={44} sizes="44px" className="size-11 shrink-0 object-contain" priority />
      <span className="min-w-0 leading-none">
        <span className="block text-[11px] font-extrabold tracking-[.02em]">SAHABAT WIJAYA</span>
        <span className="mt-1 block text-[9px] font-bold tracking-[.16em] opacity-65">SEJAHTERA</span>
      </span>
    </span>
  );
}
