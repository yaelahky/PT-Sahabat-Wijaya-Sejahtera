"use client";

import { useRef, useState } from "react";
import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2, LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { consultationSchema, formatConsultationMessage } from "@/lib/forms";
import { buildWhatsAppUrl, normalizeWhatsAppNumber } from "@/lib/whatsapp";

type ErrorMap = Record<string, string>;

function errorMap(issues: Array<{ path: PropertyKey[]; message: string }>): ErrorMap {
  return Object.fromEntries(issues.map((issue) => [String(issue.path[0]), issue.message]));
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-red-700"><AlertCircle className="size-3.5" />{message}</p>;
}

function ConfigurationStatus({ configured }: { configured: boolean }) {
  return configured ? (
    <p className="flex items-center gap-2 text-xs font-semibold text-[var(--success)]"><CheckCircle2 className="size-4" />Setelah dilanjutkan, pesan akan terbuka di WhatsApp.</p>
  ) : (
    <p role="status" className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs font-semibold leading-5 text-amber-900"><AlertCircle className="mt-0.5 size-4 shrink-0" />Nomor WhatsApp tujuan belum tersedia, jadi formulir belum bisa dilanjutkan.</p>
  );
}

export function ConsultationForm({ whatsappNumber, serviceOptions }: { whatsappNumber: string | null; serviceOptions: string[] }) {
  const [consent, setConsent] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [errors, setErrors] = useState<ErrorMap>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);
  const configured = Boolean(normalizeWhatsAppNumber(whatsappNumber));

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;
    const form = new FormData(event.currentTarget);
    const result = consultationSchema.safeParse({
      name: form.get("name"),
      whatsapp: form.get("whatsapp"),
      email: form.get("email"),
      location: form.get("location"),
      serviceType,
      details: form.get("details"),
      targetTime: form.get("targetTime"),
      consent,
    });
    if (!result.success) {
      setErrors(errorMap(result.error.issues));
      toast.error("Mohon periksa kembali kolom yang masih kosong atau belum sesuai.");
      return;
    }
    const url = buildWhatsAppUrl(formatConsultationMessage(result.data), whatsappNumber);
    if (!url) {
      toast.error("Pesan belum bisa dibuka karena nomor WhatsApp tujuan tidak tersedia.");
      return;
    }
    submittingRef.current = true;
    setIsSubmitting(true);
    setErrors({});
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("WhatsApp sudah terbuka. Periksa pesan Anda sebelum mengirim.");
    window.setTimeout(() => {
      submittingRef.current = false;
      setIsSubmitting(false);
    }, 900);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-[2rem] bg-white p-5 shadow-[0_30px_90px_rgba(3,20,62,.2)] md:p-8" aria-label="Formulir konsultasi kebutuhan">
      <div className="mb-6">
        <p className="text-xs font-extrabold tracking-[0.14em] text-[var(--primary)] uppercase">Formulir Kebutuhan</p>
        <h3 className="mt-2 text-xl font-bold tracking-[-0.03em] text-[var(--ink)]">Ceritakan kebutuhan Anda</h3>
        <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">Isi yang Anda tahu. Email dan waktu kebutuhan boleh dikosongkan.</p>
      </div>
      <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
        <div><Label htmlFor="consult-name">Nama</Label><Input id="consult-name" name="name" autoComplete="name" placeholder="Nama Anda" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "consult-name-error" : undefined} /><FieldError id="consult-name-error" message={errors.name} /></div>
        <div><Label htmlFor="consult-whatsapp">Nomor WhatsApp</Label><Input id="consult-whatsapp" name="whatsapp" inputMode="tel" autoComplete="tel" placeholder="Contoh: 62812…" aria-invalid={Boolean(errors.whatsapp)} aria-describedby={errors.whatsapp ? "consult-whatsapp-error" : undefined} /><FieldError id="consult-whatsapp-error" message={errors.whatsapp} /></div>
        <div><Label htmlFor="consult-email">Email <span className="font-normal text-[var(--muted)]">(opsional)</span></Label><Input id="consult-email" name="email" type="email" autoComplete="email" placeholder="nama@perusahaan.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "consult-email-error" : undefined} /><FieldError id="consult-email-error" message={errors.email} /></div>
        <div><Label htmlFor="consult-location">Kota/kabupaten</Label><Input id="consult-location" name="location" autoComplete="address-level2" placeholder="Lokasi kebutuhan" aria-invalid={Boolean(errors.location)} aria-describedby={errors.location ? "consult-location-error" : undefined} /><FieldError id="consult-location-error" message={errors.location} /></div>
        <div className="sm:col-span-2">
          <Label htmlFor="consult-service">Kebutuhan utama</Label>
          <Select value={serviceType} onValueChange={setServiceType}><SelectTrigger id="consult-service" aria-invalid={Boolean(errors.serviceType)} aria-describedby={errors.serviceType ? "consult-service-error" : undefined}><SelectValue placeholder="Pilih yang paling sesuai" /></SelectTrigger><SelectContent>{serviceOptions.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>
          <FieldError id="consult-service-error" message={errors.serviceType} />
        </div>
        <div className="sm:col-span-2"><Label htmlFor="consult-details">Apa yang Anda butuhkan?</Label><Textarea id="consult-details" name="details" placeholder="Contoh: 10 unit komputer untuk kantor baru, termasuk pemasangan jaringan." aria-invalid={Boolean(errors.details)} aria-describedby={errors.details ? "consult-details-error" : undefined} /><FieldError id="consult-details-error" message={errors.details} /></div>
        <div className="sm:col-span-2"><Label htmlFor="consult-target">Kapan dibutuhkan? <span className="font-normal text-[var(--muted)]">(opsional)</span></Label><Input id="consult-target" name="targetTime" placeholder="Contoh: sebelum 30 September" /></div>
      </div>
      <div className="mt-5 flex items-start gap-3">
        <Checkbox id="consult-consent" checked={consent} onCheckedChange={(value) => setConsent(value === true)} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consult-consent-error" : undefined} />
        <div><Label htmlFor="consult-consent" className="block cursor-pointer text-xs leading-5 text-[var(--ink-soft)]">Saya setuju informasi ini dipakai untuk menghubungi saya dan membahas kebutuhan di atas.</Label><FieldError id="consult-consent-error" message={errors.consent} /></div>
      </div>
      <div className="mt-6 grid gap-3"><ConfigurationStatus configured={configured} /><Button type="submit" size="lg" disabled={!configured || isSubmitting}>{isSubmitting ? <><Loader2 className="animate-spin" />Membuka WhatsApp…</> : <>Lanjutkan ke WhatsApp<ArrowUpRight /></>}</Button><p className="flex items-center justify-center gap-1.5 text-center text-[11px] leading-5 text-[var(--muted)]"><LockKeyhole className="size-3.5" />Informasi digunakan untuk membuat pesan WhatsApp dan tidak disimpan di website.</p></div>
    </form>
  );
}
