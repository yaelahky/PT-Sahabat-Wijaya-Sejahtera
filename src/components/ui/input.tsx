import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn("flex min-h-12 w-full rounded-xl border border-[var(--border-strong)] bg-white px-4 py-2 text-sm text-[var(--ink)] outline-none transition-shadow placeholder:text-[var(--muted)] focus-visible:border-[var(--primary)] focus-visible:ring-3 focus-visible:ring-[var(--ring)]/20 disabled:cursor-not-allowed disabled:opacity-50", className)}
      {...props}
    />
  );
}

export { Input };

