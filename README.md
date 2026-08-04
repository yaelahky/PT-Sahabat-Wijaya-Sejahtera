# PT Sahabat Wijaya Sejahtera

Landing page single-page berbasis Next.js App Router, React, TypeScript, dan Tailwind CSS.

## Menjalankan proyek

```bash
npm install
cp .env.example .env.local
npm run dev
```

Isi `NEXT_PUBLIC_WHATSAPP_NUMBER` dengan digit internasional tanpa tanda `+`. Formulir konsultasi berada dalam status aman/nonaktif bila nomor belum valid.

`SITE_INDEXABLE` harus bernilai tepat `true` agar robots mengizinkan indexing. Isi `SITE_URL` dengan URL production untuk canonical, sitemap, dan gambar social card absolut.

## Quality gates

```bash
npm run lint
npm run typecheck
npm test
npm run build
```
