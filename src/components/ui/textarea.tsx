import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn("flex min-h-28 w-full resize-y rounded-xl border border-[var(--border-strong)] bg-white px-4 py-3 text-sm text-[var(--ink)] outline-none transition-shadow placeholder:text-[var(--muted)] focus-visible:border-[var(--primary)] focus-visible:ring-3 focus-visible:ring-[var(--ring)]/20 disabled:cursor-not-allowed disabled:opacity-50", className)}
      {...props}
    />
  );
}

export { Textarea };

