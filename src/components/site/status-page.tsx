import type { ReactNode } from "react";
import { Boxes, CircleCheck, FileQuestion, Wrench, Wifi } from "lucide-react";
import { Brand } from "@/components/site/brand";

type StatusPageProps = {
  code: string;
  eyebrow: string;
  title: string;
  description: string;
  kind: "not-found" | "error";
  children: ReactNode;
};

export function StatusPage({ code, eyebrow, title, description, kind, children }: StatusPageProps) {
  const MainIcon = kind === "not-found" ? FileQuestion : Wrench;

  return (
    <main className="status-page relative isolate min-h-svh overflow-hidden">
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />

      <div className="site-container flex min-h-svh flex-col">
        <header className="flex h-24 items-center">
          <Brand />
        </header>

        <section className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[1fr_.8fr] lg:gap-20 lg:py-16">
          <div className="relative z-10 max-w-2xl">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-4 text-[clamp(2.6rem,7vw,5.6rem)] leading-[1.02] font-extrabold tracking-[-0.065em] text-[var(--ink)]">
              {title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--ink-soft)] md:text-lg">{description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>
            <p className="mt-6 flex items-center gap-2 text-xs font-semibold text-[var(--ink-soft)]">
              <CircleCheck className="size-4 text-[var(--success)]" aria-hidden="true" />
              Partner tepat untuk kebutuhan perangkat, jaringan, dan pengadaan Anda.
            </p>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[29rem]" aria-hidden="true">
            <span className="status-code absolute inset-0 grid place-items-center text-[clamp(7rem,25vw,13rem)] font-extrabold tracking-[-0.1em]">
              {code}
            </span>
            <div className="absolute inset-[18%] grid place-items-center rounded-[2.75rem] border border-white/80 bg-white/85 shadow-[0_30px_80px_rgba(18,52,110,.14)] backdrop-blur-xl">
              <div className="grid size-28 place-items-center rounded-[2rem] bg-[var(--primary)] text-white shadow-[0_18px_40px_rgba(25,78,216,.28)]">
                <MainIcon className="size-14" strokeWidth={1.8} />
              </div>
            </div>
            <span className="status-float status-float-one"><Wifi /></span>
            <span className="status-float status-float-two"><Boxes /></span>
            <span className="status-float status-float-three"><CircleCheck /></span>
          </div>
        </section>

        <footer className="flex min-h-20 items-center border-t border-[var(--border)] text-xs font-semibold text-[var(--muted)]">
          © {new Date().getFullYear()} PT Sahabat Wijaya Sejahtera
        </footer>
      </div>
    </main>
  );
}
