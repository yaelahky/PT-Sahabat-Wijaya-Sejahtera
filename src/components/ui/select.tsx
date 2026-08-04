"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;

function SelectTrigger({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={cn("flex min-h-12 w-full items-center justify-between gap-2 rounded-xl border border-[var(--border-strong)] bg-white px-4 py-2 text-left text-sm text-[var(--ink)] outline-none focus-visible:border-[var(--primary)] focus-visible:ring-3 focus-visible:ring-[var(--ring)]/20 data-[placeholder]:text-[var(--muted)]", className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild><ChevronDown className="size-4 opacity-60" /></SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({ className, children, position = "popper", ...props }: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position={position}
        className={cn("z-[100] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-[var(--border)] bg-white p-1 text-[var(--ink)] shadow-xl", className)}
        {...props}
      >
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn("relative flex min-h-10 cursor-default select-none items-center rounded-lg py-2 pr-8 pl-3 text-sm outline-none focus:bg-[var(--surface-alt)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <span className="absolute right-2 grid size-5 place-items-center"><SelectPrimitive.ItemIndicator><Check className="size-4" /></SelectPrimitive.ItemIndicator></span>
    </SelectPrimitive.Item>
  );
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };

