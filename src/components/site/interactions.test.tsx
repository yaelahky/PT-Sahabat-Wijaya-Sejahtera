import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ConsultationForm } from "@/components/site/forms";
import { FaqList } from "@/components/site/faq-list";

describe("interactive sections", () => {
  it("opens and closes an FAQ answer", async () => {
    const user = userEvent.setup();
    render(<FaqList items={[{ question: "Apa yang perlu disiapkan?", answer: "Siapkan gambaran kebutuhan." }]} />);
    const trigger = screen.getByRole("button", { name: "Apa yang perlu disiapkan?" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Siapkan gambaran kebutuhan.")).toBeVisible();
  });

  it("shows a safe disabled state when WhatsApp is not configured", () => {
    render(<ConsultationForm whatsappNumber={null} serviceOptions={["Konektivitas & Jaringan"]} />);
    expect(screen.getByRole("status")).toHaveTextContent("Nomor WhatsApp tujuan belum tersedia");
    expect(screen.getByRole("button", { name: /Lanjutkan ke WhatsApp/i })).toBeDisabled();
  });

  it("shows field-level guidance when required consultation data is invalid", () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<ConsultationForm whatsappNumber="6281234567890" serviceOptions={["Konektivitas & Jaringan"]} />);

    fireEvent.submit(screen.getByRole("form", { name: "Formulir konsultasi kebutuhan" }));

    expect(screen.getByText("Masukkan nama Anda.")).toBeVisible();
    expect(screen.getByText("Pilih kebutuhan utama.")).toBeVisible();
    expect(screen.getByText("Ceritakan kebutuhan Anda sedikit lebih lengkap.")).toBeVisible();
    expect(open).not.toHaveBeenCalled();
    open.mockRestore();
  });

  it("prevents a duplicate valid submission", async () => {
    const user = userEvent.setup();
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<ConsultationForm whatsappNumber="6281234567890" serviceOptions={["Konektivitas & Jaringan"]} />);

    await user.type(screen.getByLabelText("Nama"), "Dita Permata");
    await user.type(screen.getByLabelText("Nomor WhatsApp"), "6281200001234");
    await user.type(screen.getByLabelText(/Email/), "dita@example.com");
    await user.type(screen.getByLabelText("Kota/kabupaten"), "Bekasi");
    await user.click(screen.getByRole("combobox", { name: "Kebutuhan utama" }));
    await user.click(screen.getByRole("option", { name: "Konektivitas & Jaringan" }));
    await user.type(screen.getByLabelText("Apa yang Anda butuhkan?"), "Membutuhkan koneksi untuk ruang kantor baru.");
    await user.click(screen.getByLabelText(/Saya setuju informasi ini dipakai/));

    const form = screen.getByRole("form", { name: "Formulir konsultasi kebutuhan" });
    fireEvent.submit(form);
    fireEvent.submit(form);
    expect(open).toHaveBeenCalledTimes(1);
    expect(open.mock.calls[0]?.[0]).toContain("https://wa.me/6281234567890?text=");
    expect(decodeURIComponent(String(open.mock.calls[0]?.[0]))).toContain("Kebutuhan utama: Konektivitas & Jaringan");
    open.mockRestore();
  });
});
