"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Brand } from "@/components/site/brand";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { SiteConfig } from "@/content/site-content";

export function SiteHeader({ navigation }: { navigation: SiteConfig["navigation"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("beranda");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const ids = navigation.map((item) => item.href.slice(1));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0));
        const visible = [...ratios.entries()].filter((entry) => entry[1] > 0).sort((a, b) => b[1] - a[1])[0];
        const nextActive = visible?.[0] ?? "";
        setActive(nextActive);
        if (nextActive && window.location.hash !== `#${nextActive}`) {
          window.history.replaceState(null, "", `#${nextActive}`);
        }
      },
      { rootMargin: "-22% 0px -58% 0px", threshold: [0.05, 0.2, 0.5, 0.8] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [navigation]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled ? "border-b border-[var(--border)] bg-white/92 shadow-[0_8px_28px_rgba(20,40,80,.06)] backdrop-blur-xl" : "bg-transparent")}>
      <div className="site-container flex h-[4.75rem] items-center justify-between gap-6">
        <Link href="#beranda" aria-label="Kembali ke beranda PT Sahabat Wijaya Sejahtera" className="rounded-md outline-none focus-visible:ring-3 focus-visible:ring-[var(--ring)]/30">
          <Brand />
        </Link>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const id = item.href.slice(1);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active === id ? "page" : undefined}
                className={cn("relative rounded-full px-3 py-2 text-sm font-semibold text-[var(--ink-soft)] outline-none transition-colors hover:text-[var(--primary)] focus-visible:ring-3 focus-visible:ring-[var(--ring)]/30", item.href === "#beranda" && "hidden xl:inline-flex", active === id && "text-[var(--primary)] after:absolute after:right-3 after:bottom-0 after:left-3 after:h-0.5 after:rounded-full after:bg-[var(--lime-strong)]")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button asChild size="sm"><Link href="#konsultasi">Ceritakan Kebutuhan</Link></Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden" aria-label="Buka menu navigasi"><Menu className="size-5" /></Button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="sr-only">Menu navigasi</SheetTitle>
            <SheetDescription className="sr-only">Pilih bagian halaman yang ingin Anda lihat.</SheetDescription>
            <Brand className="mt-1" />
            <nav aria-label="Navigasi seluler" className="mt-10 flex flex-col gap-1">
              {navigation.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link href={item.href} className="flex min-h-12 items-center rounded-xl px-4 text-base font-bold text-[var(--ink)] outline-none hover:bg-[var(--surface-alt)] focus-visible:ring-3 focus-visible:ring-[var(--ring)]/30">{item.label}</Link>
                </SheetClose>
              ))}
            </nav>
            <SheetClose asChild><Button asChild size="lg" className="mt-auto"><Link href="#konsultasi">Ceritakan Kebutuhan</Link></Button></SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
