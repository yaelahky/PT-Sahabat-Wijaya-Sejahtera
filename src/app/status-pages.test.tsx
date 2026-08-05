import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ErrorPage from "@/app/error";
import NotFound from "@/app/not-found";

describe("custom status pages", () => {
  it("renders a branded 404 with useful recovery links", () => {
    render(<NotFound />);

    expect(screen.getByRole("heading", { name: "Sepertinya Anda mengambil jalur yang berbeda." })).toBeVisible();
    expect(screen.getByRole("link", { name: /Kembali ke Beranda/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /Lihat Produk & Layanan/i })).toHaveAttribute("href", "/#layanan");
  });

  it("lets visitors retry after an application error", () => {
    const reset = vi.fn();
    render(<ErrorPage error={new Error("test error")} reset={reset} />);

    fireEvent.click(screen.getByRole("button", { name: /Coba Lagi/i }));
    expect(reset).toHaveBeenCalledOnce();
  });
});
