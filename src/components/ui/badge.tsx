import * as React from "react";
import { cn } from "@/lib/utils";

function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("inline-flex min-h-7 items-center gap-1.5 rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs font-bold text-[var(--ink-soft)]", className)}
      {...props}
    />
  );
}

export { Badge };

