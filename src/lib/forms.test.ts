import { describe, expect, it } from "vitest";
import { consultationSchema, formatConsultationMessage } from "@/lib/forms";

describe("form schemas", () => {
  it("validates, normalizes, and formats complete consultation data", () => {
    const result = consultationSchema.parse({
      name: "  Dita  ",
      whatsapp: "+62 812-0000-1234",
      email: "dita@example.com",
      location: "Bekasi",
      serviceType: "Peralatan & Elektronik",
      details: "Membutuhkan printer dan scanner untuk kantor baru.",
      targetTime: "September 2026",
      consent: true,
    });
    expect(result.name).toBe("Dita");
    expect(result.whatsapp).toBe("6281200001234");
    expect(formatConsultationMessage(result)).toBe([
      "Halo, saya ingin menanyakan kebutuhan berikut kepada PT Sahabat Wijaya Sejahtera.",
      "",
      "Nama: Dita",
      "Nomor WhatsApp: 6281200001234",
      "Email: dita@example.com",
      "Lokasi: Bekasi",
      "Kebutuhan utama: Peralatan & Elektronik",
      "Detail kebutuhan: Membutuhkan printer dan scanner untuk kantor baru.",
      "Dibutuhkan pada: September 2026",
    ].join("\n"));
  });

  it("rejects invalid consent and a short requirement", () => {
    const result = consultationSchema.safeParse({
      name: "Budi",
      whatsapp: "0812",
      email: "bukan-email",
      location: "Depok",
      serviceType: "ATK & Perlengkapan Kantor",
      details: "Pendek",
      targetTime: "",
      consent: false,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.map((issue) => String(issue.path[0]))).toEqual(
        expect.arrayContaining(["whatsapp", "email", "details", "consent"]),
      );
    }
  });

  it("omits optional lines from consultation messages", () => {
    const result = consultationSchema.parse({
      name: "Dita",
      whatsapp: "6281200001234",
      email: "",
      location: "Bekasi",
      serviceType: "Konektivitas & Jaringan",
      details: "Membutuhkan koneksi untuk ruang kantor baru.",
      targetTime: "",
      consent: true,
    });
    const message = formatConsultationMessage(result);
    expect(message).not.toContain("Email:");
    expect(message).toContain("Dibutuhkan pada: Belum ditentukan");
    expect(message).toContain("Kebutuhan utama: Konektivitas & Jaringan");
  });
});
