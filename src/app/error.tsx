"use client";

import Link from "next/link";
import { Home, RotateCcw } from "lucide-react";
import { StatusPage } from "@/components/site/status-page";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <StatusPage
      code="500"
      eyebrow="Ada kendala sementara"
      title="Sistem kami belum bisa menyelesaikan permintaan ini."
      description="Tidak perlu mengisi ulang semuanya. Coba muat bagian ini sekali lagi, atau kembali ke beranda untuk melanjutkan dari awal."
      kind="error"
    >
      <Button size="lg" onClick={reset}><RotateCcw />Coba Lagi</Button>
      <Button asChild size="lg" variant="outline">
        <Link href="/"><Home />Kembali ke Beranda</Link>
      </Button>
    </StatusPage>
  );
}
