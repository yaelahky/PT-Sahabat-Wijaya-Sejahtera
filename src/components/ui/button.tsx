import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition-[transform,background-color,color,border-color,box-shadow] outline-none focus-visible:ring-3 focus-visible:ring-[var(--ring)]/35 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[var(--primary)] text-white shadow-[0_10px_25px_rgba(29,78,216,.2)] hover:-translate-y-0.5 hover:bg-[var(--primary-strong)]",
        secondary: "bg-[var(--lime)] text-[var(--ink)] hover:-translate-y-0.5 hover:bg-[var(--lime-strong)]",
        outline: "border border-[var(--border-strong)] bg-white/70 text-[var(--ink)] hover:-translate-y-0.5 hover:bg-white",
        ghost: "text-[var(--ink-soft)] hover:bg-[var(--surface-alt)] hover:text-[var(--ink)]",
      },
      size: {
        default: "min-h-11",
        sm: "min-h-9 px-4 text-xs",
        lg: "min-h-12 px-6 text-[15px]",
        icon: "size-11 min-h-11 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };

