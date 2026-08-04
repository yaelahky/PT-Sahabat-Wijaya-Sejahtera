import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl, normalizeWhatsAppNumber } from "@/lib/whatsapp";

describe("WhatsApp URL", () => {
  it("normalizes a valid international number", () => {
    expect(normalizeWhatsAppNumber("+62 812-3456-7890")).toBe("6281234567890");
  });

  it("encodes the message exactly once", () => {
    expect(buildWhatsAppUrl("Halo, perlu Wi-Fi & router", "6281234567890")).toBe(
      `https://wa.me/6281234567890?text=${encodeURIComponent("Halo, perlu Wi-Fi & router")}`,
    );
  });

  it("returns null for empty or invalid configuration", () => {
    expect(buildWhatsAppUrl("Halo", "")).toBeNull();
    expect(buildWhatsAppUrl("Halo", "nomor-belum-ada")).toBeNull();
  });
});

