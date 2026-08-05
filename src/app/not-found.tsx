import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { StatusPage } from "@/components/site/status-page";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan | PT Sahabat Wijaya Sejahtera",
  description: "Halaman yang Anda cari tidak tersedia. Kembali ke beranda PT Sahabat Wijaya Sejahtera.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <StatusPage
      code="404"
      eyebrow="Jalur tidak ditemukan"
      title="Sepertinya Anda mengambil jalur yang berbeda."
      description="Halaman yang Anda cari mungkin sudah dipindahkan atau alamatnya kurang tepat. Mari kembali dan temukan kebutuhan yang ingin Anda konsultasikan."
      kind="not-found"
    >
      <Button asChild size="lg">
        <Link href="/"><ArrowLeft />Kembali ke Beranda</Link>
      </Button>
      <Button asChild size="lg" variant="outline">
        <Link href="/#layanan">Lihat Produk & Layanan<ArrowRight /></Link>
      </Button>
    </StatusPage>
  );
}
