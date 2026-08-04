"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn("peer size-5 shrink-0 rounded-md border border-[var(--border-strong)] bg-white outline-none transition-colors focus-visible:ring-3 focus-visible:ring-[var(--ring)]/30 data-[state=checked]:border-[var(--primary)] data-[state=checked]:bg-[var(--primary)] data-[state=checked]:text-white disabled:cursor-not-allowed disabled:opacity-50", className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="grid place-items-center">
        <Check className="size-3.5" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };

