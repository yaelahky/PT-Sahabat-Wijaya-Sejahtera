import { z } from "zod";

const requiredText = (message: string, min = 2) =>
  z.string().trim().min(min, message);

const whatsappField = z
  .string()
  .trim()
  .transform((value) => value.replace(/[^\d]/g, ""))
  .refine((value) => /^62\d{8,13}$/.test(value), {
    message: "Masukkan nomor WhatsApp dengan kode negara 62, misalnya 62812…",
  });

export const consultationSchema = z.object({
  name: requiredText("Masukkan nama Anda."),
  whatsapp: whatsappField,
  email: z
    .string()
    .trim()
    .refine((value) => value === "" || z.email().safeParse(value).success, {
      message: "Masukkan alamat email yang valid atau kosongkan kolom ini.",
    }),
  location: requiredText("Masukkan kota atau kabupaten lokasi kebutuhan."),
  serviceType: requiredText("Pilih kebutuhan utama."),
  details: z.string().trim().min(10, "Ceritakan kebutuhan Anda sedikit lebih lengkap."),
  targetTime: z.string().trim(),
  consent: z.literal(true, { error: "Centang kotak persetujuan untuk melanjutkan." }),
});

export type ConsultationValues = z.infer<typeof consultationSchema>;

export function formatConsultationMessage(values: ConsultationValues) {
  return [
    "Halo, saya ingin menanyakan kebutuhan berikut kepada PT Sahabat Wijaya Sejahtera.",
    "",
    `Nama: ${values.name}`,
    `Nomor WhatsApp: ${values.whatsapp}`,
    values.email ? `Email: ${values.email}` : null,
    `Lokasi: ${values.location}`,
    `Kebutuhan utama: ${values.serviceType}`,
    `Detail kebutuhan: ${values.details}`,
    `Dibutuhkan pada: ${values.targetTime || "Belum ditentukan"}`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}
