"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;

function SheetContent({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-[80] bg-[#071634]/45 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in" />
      <DialogPrimitive.Content
        className={cn("fixed inset-y-0 right-0 z-[90] flex w-[min(88vw,24rem)] flex-col border-l border-[var(--border)] bg-white p-6 shadow-2xl outline-none data-[state=closed]:animate-out data-[state=open]:animate-in", className)}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute top-4 right-4 grid size-11 place-items-center rounded-full text-[var(--ink-soft)] outline-none hover:bg-[var(--surface-alt)] focus-visible:ring-3 focus-visible:ring-[var(--ring)]/30">
          <X className="size-5" /><span className="sr-only">Tutup menu</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

const SheetTitle = DialogPrimitive.Title;
const SheetDescription = DialogPrimitive.Description;

export { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger };

