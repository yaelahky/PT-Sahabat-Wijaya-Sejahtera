import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, CircleCheck, Sparkles } from "lucide-react";
import { ConsultationForm } from "@/components/site/forms";
import { FaqList } from "@/components/site/faq-list";
import { SiteHeader } from "@/components/site/header";
import { SiteIcon } from "@/components/site/icon";
import { RevealObserver } from "@/components/site/reveal-observer";
import { Brand } from "@/components/site/brand";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/content/site-content";
import { withBasePath } from "@/lib/base-path";

function SectionHeading({ eyebrow, title, description, align = "left", id }: { eyebrow: string; title: string; description?: string; align?: "left" | "center"; id?: string }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="section-title mt-3">{title}</h2>
      {description ? <p className="section-copy mt-5">{description}</p> : null}
    </div>
  );
}

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: siteConfig.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.company.legalName,
    description: siteConfig.company.description,
    ...(process.env.SITE_URL ? { url: process.env.SITE_URL } : {}),
  };

  return (
    <>
      <SiteHeader navigation={siteConfig.navigation} />
      <RevealObserver />
      <main>
        <section id="beranda" className="hero-section relative flex min-h-[48rem] items-center overflow-hidden pt-28 pb-16 lg:min-h-[50rem] lg:pt-24">
          <div className="hero-orb hero-orb-one" aria-hidden="true" />
          <div className="hero-orb hero-orb-two" aria-hidden="true" />
          <div className="site-container relative grid items-center gap-12 lg:grid-cols-[1.06fr_.94fr] lg:gap-8 xl:grid-cols-[1.08fr_.92fr] xl:gap-12">
            <div className="relative z-10 max-w-[44rem]" data-reveal>
              <Badge className="border-blue-200 bg-blue-50/80 text-[var(--primary)]"><Sparkles className="size-3.5" />{siteConfig.hero.eyebrow}</Badge>
              <h1 className="mt-6 text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.04] font-extrabold tracking-[-0.06em] text-[var(--ink)]">
                {siteConfig.hero.title} <span className="text-[var(--primary)]">{siteConfig.hero.highlight}</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-[var(--ink-soft)] md:text-lg">{siteConfig.hero.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg"><Link href={siteConfig.hero.primaryCta.href}>{siteConfig.hero.primaryCta.label}<ArrowRight /></Link></Button>
                <Button asChild size="lg" variant="outline"><Link href={siteConfig.hero.secondaryCta.href}>{siteConfig.hero.secondaryCta.label}</Link></Button>
              </div>
              <p className="mt-5 flex items-center gap-2 text-xs font-semibold text-[var(--ink-soft)]"><CircleCheck className="size-4 text-[var(--success)]" />Isi formulir sekali, lalu lanjutkan percakapannya di WhatsApp.</p>
            </div>

            <div className="relative mx-auto w-full max-w-[44rem]" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
              <div className="relative aspect-square">
                <Image src={withBasePath("/images/sahabat-solutions-hero-transparent.webp")} alt="Tim sedang membahas kebutuhan perangkat dan jaringan kantor" fill priority sizes="(max-width: 1024px) 92vw, 45vw" className="object-contain drop-shadow-[0_30px_40px_rgba(22,64,135,.16)]" />
              </div>
              <div className="absolute right-0 -bottom-5 w-[min(82%,20rem)] rounded-2xl border border-white/80 bg-white/94 p-4 shadow-[0_18px_50px_rgba(18,52,110,.16)] backdrop-blur-md sm:right-3 lg:right-0 lg:bottom-4">
                <div className="flex items-center justify-between gap-4">
                  <div><p className="text-xs font-extrabold tracking-[.12em] text-[var(--primary)] uppercase">Produk & Dukungan</p><p className="mt-1 text-sm font-bold text-[var(--ink)]">Dari kebutuhan harian sampai proyek khusus</p></div>
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--lime-soft)] text-[var(--ink)]"><SiteIcon name="network" className="size-5" /></span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2"><Badge className="bg-[var(--surface-alt)]"><Check />Pengadaan</Badge><Badge className="bg-[var(--surface-alt)]"><Check />Pemasangan</Badge></div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="industry-strip-title" className="border-y border-[var(--border)] bg-white py-7">
          <div className="site-container">
            <p id="industry-strip-title" className="text-center text-xs font-extrabold tracking-[.15em] text-[var(--muted)] uppercase">Untuk usaha, kantor, properti, dan institusi</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2.5">
              {siteConfig.industries.map((industry) => <Badge key={industry.label} className="px-4 py-2"><SiteIcon name={industry.icon} />{industry.label}</Badge>)}
            </div>
          </div>
        </section>

        <section id="manfaat" className="section-space bg-[var(--surface)]" aria-labelledby="benefit-title">
          <div className="site-container">
            <SectionHeading id="benefit-title" eyebrow="Kenapa Satu Partner?" title="Tak perlu menghubungi banyak vendor untuk kebutuhan yang berbeda" description="Sebutkan apa yang Anda perlukan. Kami bantu merapikan daftarnya, membahas pilihan yang ada, lalu menentukan langkah berikutnya." align="center" />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {siteConfig.benefits.map((benefit, index) => (
                <Card key={benefit.title} className="card-lift overflow-hidden" data-reveal style={{ "--reveal-delay": `${Math.min(index, 3) * 70}ms` } as React.CSSProperties}>
                  <CardHeader><span className="icon-tile"><SiteIcon name={benefit.icon} /></span><CardTitle className="mt-3">{benefit.title}</CardTitle><CardDescription>{benefit.description}</CardDescription></CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="layanan" className="section-space bg-white">
          <div className="site-container">
            <SectionHeading eyebrow="Produk & Layanan" title="Apa saja yang bisa kami bantu?" description="Pilih kelompok yang paling mendekati kebutuhan Anda. Daftar di setiap kartu bisa menjadi panduan sebelum Anda menghubungi kami." />
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-6">
              {siteConfig.services.map((service, index) => (
                <Card key={service.title} data-service-card className={`card-lift group flex h-full flex-col overflow-hidden ${index < 3 ? "xl:col-span-2" : "xl:col-span-3"} ${index === 4 ? "md:col-span-2" : ""}`} data-reveal style={{ "--reveal-delay": `${Math.min(index, 3) * 60}ms` } as React.CSSProperties}>
                  <div className="relative aspect-[3/2] overflow-hidden border-b border-[var(--border)] bg-[var(--surface-warm)]">
                    <Image src={withBasePath(service.image)} alt={service.imageAlt} fill sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 34vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-center gap-3"><span className="icon-tile shrink-0 group-hover:bg-[var(--primary)] group-hover:text-white"><SiteIcon name={service.icon} /></span><CardTitle>{service.title}</CardTitle></div>
                    <CardDescription className="mt-4">{service.description}</CardDescription>
                    <ul className="mt-5 grid gap-2.5 text-sm leading-6 text-[var(--ink-soft)]" aria-label={`Daftar produk dan layanan ${service.title}`}>
                      {service.items.map((item) => <li key={item} className="flex gap-2.5"><Check className="mt-1 size-4 shrink-0 text-[var(--success)]" /><span>{item}</span></li>)}
                    </ul>
                    <Link href="#konsultasi" className="mt-auto inline-flex min-h-11 items-center gap-2 rounded-full pt-5 text-sm font-bold text-[var(--primary)] outline-none hover:gap-3 focus-visible:ring-3 focus-visible:ring-[var(--ring)]/30">{service.cta}<ArrowRight className="size-4" /></Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="keunggulan" className="bg-[var(--ink)] py-20 text-white md:py-24" aria-labelledby="advantage-title">
          <div className="site-container">
            <div className="max-w-3xl" data-reveal>
              <p className="eyebrow dark-eyebrow">Cara Kami Bekerja</p>
              <h2 id="advantage-title" className="dark-section-title mt-3">Anda ceritakan kebutuhannya. Kami bantu membereskan detailnya.</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-blue-100/75">Tidak harus langsung punya daftar yang lengkap. Mulai dari kebutuhan yang paling mendesak, lalu kita bahas satu per satu.</p>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {siteConfig.advantages.map((item, index) => (
                <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/[.06] p-6" data-reveal style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}><span className="grid size-11 place-items-center rounded-xl bg-[var(--lime)] text-[var(--ink)]"><SiteIcon name={item.icon} /></span><h3 className="mt-5 text-lg font-bold">{item.title}</h3><p className="mt-2 text-sm leading-7 text-blue-100/70">{item.description}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section id="tentang" className="section-space overflow-hidden bg-[var(--surface-warm)]">
          <div className="site-container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative" data-reveal>
              <div className="aspect-[4/3] rounded-[2.25rem] bg-[var(--primary)] p-7 text-white sm:p-10">
                <div className="flex h-full flex-col justify-between">
                  <span className="grid size-14 place-items-center rounded-2xl bg-white/12"><SiteIcon name="handshake" className="size-7" /></span>
                  <div><p className="text-sm font-semibold text-blue-100">{siteConfig.company.tagline}</p><p className="mt-3 max-w-sm text-[clamp(1.75rem,4vw,2.8rem)] leading-[1.12] font-extrabold tracking-[-.04em]">Banyak kebutuhan. Cukup satu partner.</p></div>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-5 rounded-2xl bg-[var(--lime)] p-5 text-[var(--ink)] shadow-xl sm:right-6"><SiteIcon name="badge-check" className="size-8" /></div>
            </div>
            <div><SectionHeading eyebrow={siteConfig.about.eyebrow} title={siteConfig.about.title} />{siteConfig.about.paragraphs.map((paragraph) => <p key={paragraph} className="section-copy mt-5" data-reveal>{paragraph}</p>)}<div className="mt-7 grid gap-3">{siteConfig.about.points.map((point) => <p key={point} className="flex items-center gap-3 text-sm font-bold text-[var(--ink)]"><span className="grid size-6 place-items-center rounded-full bg-[var(--lime-soft)]"><Check className="size-3.5" /></span>{point}</p>)}</div></div>
          </div>
        </section>

        <section id="cara-kerja" className="section-space bg-white">
          <div className="site-container">
            <SectionHeading eyebrow="Dari Mana Mulainya?" title="Ceritakan kebutuhannya. Kami lanjutkan lewat WhatsApp." description="Tidak perlu membuat dokumen panjang. Isi nama, lokasi, dan kebutuhan Anda, lalu lengkapi detailnya saat berbicara dengan tim kami." align="center" />
            <ol className="relative mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {siteConfig.process.map((item, index) => (
                <li key={item.title} className="relative rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-6" data-reveal style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}>
                  <div className="flex items-center justify-between"><span className="icon-tile"><SiteIcon name={item.icon} /></span><span className="text-xs font-extrabold tracking-[.12em] text-[var(--muted)]">LANGKAH {index + 1}</span></div><h3 className="mt-6 text-lg font-bold text-[var(--ink)]">{item.title}</h3><p className="mt-2 text-sm leading-7 text-[var(--ink-soft)]">{item.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section-space bg-[var(--blue-soft)]" aria-labelledby="use-case-title">
          <div className="site-container">
            <SectionHeading id="use-case-title" eyebrow="Biar Lebih Kebayang" title="Contoh kebutuhan yang bisa Anda sampaikan" description="Kebutuhan Anda tidak harus sama persis dengan contoh di bawah. Gunakan sebagai gambaran saat menulis pesan." />
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {siteConfig.useCases.map((item, index) => <div key={item.title} className="card-lift flex gap-5 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-6" data-reveal style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}><span className="icon-tile shrink-0"><SiteIcon name={item.icon} /></span><div><h3 className="font-bold text-[var(--ink)]">{item.title}</h3><p className="mt-2 text-sm leading-7 text-[var(--ink-soft)]">{item.description}</p></div></div>)}
            </div>
          </div>
        </section>

        <section id="faq" className="section-space bg-[var(--surface)]">
          <div className="site-container grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
            <div><SectionHeading eyebrow="Sebelum Menghubungi Kami" title="Mungkin ini juga yang ingin Anda tanyakan" description="Berikut jawaban singkat tentang jenis kebutuhan, lokasi, harga, dan waktu pengerjaan." /><Button asChild variant="outline" className="mt-7"><Link href="#konsultasi">Tanyakan Lewat Formulir<ArrowRight /></Link></Button></div>
            <div data-reveal><FaqList items={siteConfig.faqs} /></div>
          </div>
        </section>

        <section id="konsultasi" className="section-space relative overflow-hidden bg-[var(--primary)] text-white">
          <div className="cta-orb" aria-hidden="true" />
          <div className="site-container relative grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start lg:gap-20">
            <div className="consultation-intro lg:sticky lg:top-28" data-reveal>
              <Badge className="border-white/20 bg-white/10 text-white">Mulai dari Sini</Badge>
              <h2 className="section-title mt-5">Ceritakan apa yang sedang Anda butuhkan.</h2>
              <p className="consultation-copy mt-5 max-w-lg text-base leading-8">Tidak harus langsung lengkap. Isi informasi yang sudah Anda punya, periksa pesannya, lalu lanjutkan pembicaraan di WhatsApp.</p>
              <div className="consultation-points mt-8 grid gap-3 text-sm font-semibold"><p className="flex items-center gap-3"><Check className="size-4 text-[var(--lime)]" />Cukup isi informasi yang Anda tahu</p><p className="flex items-center gap-3"><Check className="size-4 text-[var(--lime)]" />Pesan bisa diperiksa sebelum dikirim</p><p className="flex items-center gap-3"><Check className="size-4 text-[var(--lime)]" />Data tidak disimpan di website</p></div>
            </div>
            <div data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}><ConsultationForm whatsappNumber={siteConfig.contact.whatsappNumber} serviceOptions={siteConfig.serviceOptions} /></div>
          </div>
        </section>
      </main>

      <footer className="bg-[var(--ink)] py-12 text-white">
        <div className="site-container">
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-start">
            <div><Brand className="text-white" /><p className="mt-5 max-w-md text-sm leading-7 text-blue-100/65">{siteConfig.company.description}</p></div>
            <div><p className="text-sm font-bold">Navigasi</p><nav aria-label="Navigasi footer" className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3">{siteConfig.navigation.map((item) => <Link key={item.href} href={item.href} className="text-sm text-blue-100/65 hover:text-white">{item.label}</Link>)}</nav></div>
          </div>
          <Separator className="my-9 bg-white/10" />
          <div className="flex flex-col gap-3 text-xs text-blue-100/55 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} {siteConfig.company.legalName}.</p><p>{siteConfig.company.tagline}</p></div>
        </div>
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
