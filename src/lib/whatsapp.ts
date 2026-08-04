const WHATSAPP_NUMBER_PATTERN = /^\d{8,15}$/;

export function normalizeWhatsAppNumber(raw?: string | null) {
  if (!raw) return null;
  const normalized = raw.replace(/[^\d]/g, "");
  if (!WHATSAPP_NUMBER_PATTERN.test(normalized)) return null;
  return normalized;
}

export function buildWhatsAppUrl(
  message: string,
  rawNumber: string | null | undefined = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
): string | null {
  const number = normalizeWhatsAppNumber(rawNumber);
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

