export type IconName =
  | "arrow-right"
  | "badge-check"
  | "boxes"
  | "briefcase-business"
  | "building-2"
  | "calendar-check"
  | "check-check"
  | "clipboard-check"
  | "graduation-cap"
  | "handshake"
  | "hotel"
  | "landmark"
  | "network"
  | "package-check"
  | "router"
  | "settings-2"
  | "store"
  | "wifi";

type LinkItem = { label: string; href: string };
type FeatureItem = { title: string; description: string; icon: IconName };

export interface SiteConfig {
  company: {
    name: string;
    shortName: string;
    legalName: string;
    tagline: string;
    description: string;
  };
  seo: { title: string; description: string };
  navigation: LinkItem[];
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
    primaryCta: LinkItem;
    secondaryCta: LinkItem;
  };
  industries: Array<{ label: string; icon: IconName }>;
  benefits: FeatureItem[];
  services: Array<FeatureItem & { items: string[]; cta: string; image: string; imageAlt: string }>;
  advantages: FeatureItem[];
  about: { eyebrow: string; title: string; paragraphs: string[]; points: string[] };
  process: Array<{ title: string; description: string; icon: IconName }>;
  useCases: Array<{ title: string; description: string; icon: IconName }>;
  faqs: Array<{ question: string; answer: string }>;
  serviceOptions: string[];
  contact: {
    whatsappNumber: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    social: LinkItem[] | null;
    companyProfileUrl: string | null;
    legalLinks: LinkItem[] | null;
  };
  dataAvailability: {
    officialLogo: boolean;
    clientLogos: boolean;
    testimonials: boolean;
    coverage: boolean;
    pricing: boolean;
  };
}

export const siteConfig: SiteConfig = {
  company: {
    name: "Sahabat Wijaya Sejahtera",
    shortName: "SWS",
    legalName: "PT Sahabat Wijaya Sejahtera",
    tagline: "Partner Tepat, Solusi Hebat",
    description:
      "Satu partner untuk membantu kebutuhan perangkat, internet, perlengkapan kantor, instalasi, perawatan, dan perlengkapan acara.",
  },
  seo: {
    title: "PT Sahabat Wijaya Sejahtera | Pengadaan & Konektivitas",
    description: "PT Sahabat Wijaya Sejahtera membantu kebutuhan perangkat elektronik, ATK, perlengkapan kantor dan acara, internet, jaringan, instalasi, serta perawatan untuk bisnis dan institusi.",
  },
  navigation: [
    { label: "Beranda", href: "#beranda" },
    { label: "Manfaat", href: "#manfaat" },
    { label: "Produk & Layanan", href: "#layanan" },
    { label: "Keunggulan", href: "#keunggulan" },
    { label: "Tentang Kami", href: "#tentang" },
    { label: "Proses", href: "#cara-kerja" },
    { label: "FAQ", href: "#faq" },
  ],
  hero: {
    eyebrow: "Pengadaan untuk Bisnis & Institusi",
    title: "Banyak Kebutuhan?",
    highlight: "Cukup Satu Vendor!",
    description:
      "Butuh memasang internet kantor, membeli komputer dan printer, menyediakan ATK, atau menyiapkan perlengkapan seminar? Sampaikan daftarnya kepada kami. Kami bantu membahasnya satu per satu.",
    primaryCta: { label: "Ceritakan Kebutuhan Anda", href: "#konsultasi" },
    secondaryCta: { label: "Lihat yang Bisa Kami Bantu", href: "#layanan" },
  },
  industries: [
    { label: "Perusahaan", icon: "building-2" },
    { label: "Usaha & Toko", icon: "store" },
    { label: "Institusi Pendidikan", icon: "graduation-cap" },
    { label: "Hotel & Penginapan", icon: "hotel" },
    { label: "Penyelenggara Acara", icon: "calendar-check" },
    { label: "Properti", icon: "landmark" },
  ],
  benefits: [
    {
      title: "Daftar belanja lebih rapi",
      description: "Barang, jumlah, lokasi, dan waktu kebutuhannya dicatat sejak awal agar tidak ada yang terlewat.",
      icon: "clipboard-check",
    },
    {
      title: "Tidak perlu menghubungi banyak pihak",
      description: "Perangkat, jaringan, ATK, dan perlengkapan acara bisa dibahas dalam satu percakapan.",
      icon: "handshake",
    },
    {
      title: "Pilihan sesuai kegunaan",
      description: "Kami mulai dari barang itu akan dipakai untuk apa, lalu membahas pilihan yang masuk akal.",
      icon: "badge-check",
    },
    {
      title: "Langkah berikutnya jelas",
      description: "Anda tahu informasi apa yang masih dibutuhkan dan apa yang akan dibahas setelahnya.",
      icon: "arrow-right",
    },
  ],
  services: [
    {
      title: "Konektivitas & Jaringan",
      description: "Untuk kantor, area usaha, properti, atau acara yang membutuhkan internet dan jaringan yang tertata.",
      items: ["Internet untuk kantor dan area usaha", "Wi-Fi untuk properti dan kegiatan", "Router serta perangkat jaringan", "Penataan jaringan internal"],
      icon: "network",
      cta: "Tanyakan kebutuhan jaringan",
      image: "/images/services/connectivity.webp",
      imageAlt: "Router dan perangkat untuk konektivitas jaringan bisnis",
    },
    {
      title: "Peralatan & Elektronik",
      description: "Perangkat kerja dan elektronik untuk kegiatan kantor maupun pekerjaan di lapangan.",
      items: ["Handphone, PC, printer, scanner, dan monitor", "AC split, dispenser, lemari es, dan genset", "Sound system, CCTV, router, dan voice recorder"],
      icon: "router",
      cta: "Tanyakan kebutuhan perangkat",
      image: "/images/services/technology-devices.webp",
      imageAlt: "Peralatan elektronik untuk kebutuhan kantor dan usaha",
    },
    {
      title: "ATK & Perlengkapan Kantor",
      description: "Kebutuhan tulis-menulis, penyimpanan dokumen, dan perlengkapan kantor sehari-hari.",
      items: ["ATK lengkap", "Mesin penghancur kertas", "Lemari besi, brankas, dan kebutuhan arsip"],
      icon: "package-check",
      cta: "Tanyakan kebutuhan kantor",
      image: "/images/services/general-procurement.webp",
      imageAlt: "ATK dan perlengkapan untuk kegiatan kantor",
    },
    {
      title: "Instalasi & Pemeliharaan",
      description: "Untuk pemasangan baru, penataan ulang, perawatan rutin, maupun saat ada kendala teknis.",
      items: ["Instalasi jaringan dan perangkat", "Penataan kabel dan titik koneksi", "Pemeriksaan, perawatan, dan penanganan kendala teknis"],
      icon: "settings-2",
      cta: "Tanyakan kebutuhan teknis",
      image: "/images/services/installation-maintenance.webp",
      imageAlt: "Teknisi menyiapkan instalasi dan pemeliharaan perangkat",
    },
    {
      title: "Perlengkapan Event & Seminar",
      description: "Perlengkapan peserta, presentasi, perangkat, dan koneksi internet untuk membantu jalannya acara.",
      items: ["Seminar kit", "Souvenir peserta", "Showcase display dan perlengkapan presentasi", "Dukungan perangkat dan konektivitas kegiatan"],
      icon: "calendar-check",
      cta: "Tanyakan kebutuhan acara",
      image: "/images/services/event-support.webp",
      imageAlt: "Perlengkapan presentasi dan pendukung kegiatan seminar",
    },
  ],
  advantages: [
    { title: "Mulai dari kegunaannya", description: "Kami perlu tahu barang atau layanan itu akan dipakai untuk apa, di mana, dan kapan dibutuhkan.", icon: "badge-check" },
    { title: "Satu percakapan, banyak kebutuhan", description: "Kebutuhan barang, internet, dan bantuan teknis bisa Anda sampaikan sekaligus.", icon: "handshake" },
    { title: "Setiap langkah dijelaskan", description: "Kalau ada detail yang kurang atau pilihan yang perlu dibahas, kami sampaikan dengan jelas.", icon: "check-check" },
  ],
  about: {
    eyebrow: "Tentang Kami",
    title: "Kami membantu memudahkan urusan pengadaan Anda",
    paragraphs: [
      "Kebutuhan kantor sering kali datang bersamaan: internet perlu dipasang, perangkat harus tersedia, ATK mulai habis, sementara acara juga harus segera disiapkan. Mengurus semuanya ke banyak pihak tentu memakan waktu.",
      "PT Sahabat Wijaya Sejahtera hadir agar berbagai kebutuhan tersebut bisa dibicarakan dengan satu partner. Anda ceritakan apa yang dibutuhkan, lalu kami bantu merapikan detailnya dan membahas langkah selanjutnya.",
    ],
    points: ["Bisa membahas lebih dari satu jenis kebutuhan", "Daftar disesuaikan dengan kebutuhan Anda", "Langkah berikutnya dibahas satu per satu"],
  },
  process: [
    { title: "Isi formulir", description: "Tulis kebutuhan utama, lokasi, nomor yang bisa dihubungi, dan kapan barang atau layanan dibutuhkan.", icon: "briefcase-business" },
    { title: "Kami periksa detailnya", description: "Tim membaca informasi yang Anda kirim dan mencatat hal-hal yang masih perlu ditanyakan.", icon: "clipboard-check" },
    { title: "Bahas pilihannya", description: "Kami membahas jenis barang, jumlah, spesifikasi, atau bantuan teknis yang Anda perlukan.", icon: "boxes" },
    { title: "Tentukan langkah selanjutnya", description: "Setelah kebutuhannya jelas, kita bahas apa yang perlu dilakukan dan kapan waktunya.", icon: "check-check" },
  ],
  useCases: [
    { title: "Menyiapkan kantor atau cabang baru", description: "Mulai dari internet, jaringan, komputer, printer, AC, sampai perlengkapan kerja harian.", icon: "building-2" },
    { title: "Belanja kebutuhan kantor", description: "ATK, perangkat elektronik, lemari arsip, brankas, dan barang lain yang dipakai sehari-hari.", icon: "package-check" },
    { title: "Memasang atau merapikan jaringan", description: "Pemasangan perangkat, penataan kabel, penambahan titik koneksi, pemeriksaan, atau perawatan.", icon: "wifi" },
    { title: "Menyiapkan seminar atau acara", description: "Seminar kit, souvenir, layar presentasi, sound system, perangkat, dan koneksi internet.", icon: "calendar-check" },
  ],
  faqs: [
    { question: "Apa saja yang bisa saya tanyakan?", answer: "Anda bisa menanyakan kebutuhan internet dan jaringan, peralatan elektronik, ATK dan perlengkapan kantor, pemasangan dan perawatan, serta perlengkapan acara atau seminar." },
    { question: "Bagaimana cara memulainya?", answer: "Isi formulir dengan nama, nomor WhatsApp, lokasi, kebutuhan utama, dan detail singkat. Setelah itu, periksa pesan yang sudah disusun lalu kirim melalui WhatsApp." },
    { question: "Kalau kebutuhan saya lebih dari satu jenis?", answer: "Pilih kebutuhan yang paling utama, lalu tuliskan kebutuhan lainnya di kolom detail. Semuanya tetap bisa Anda sampaikan dalam satu pesan." },
    { question: "Bisa untuk kebutuhan di luar kota?", answer: "Cantumkan kota atau kabupatennya di formulir. Kami akan memeriksa lebih dulu apakah kebutuhan dan lokasinya dapat ditindaklanjuti." },
    { question: "Mengapa harga tidak dicantumkan?", answer: "Karena jenis, jumlah, merek, spesifikasi, lokasi, dan waktu kebutuhannya bisa berbeda. Kirim detail yang Anda punya agar pembahasannya sesuai dengan barang atau layanan yang benar-benar dibutuhkan." },
    { question: "Berapa lama prosesnya?", answer: "Waktunya bergantung pada jenis kebutuhan, jumlah barang, spesifikasi, lokasi, dan apakah ada pemasangan. Jika Anda sudah punya batas waktu, tuliskan di formulir sebagai bahan pembahasan." },
    { question: "Apa yang perlu saya siapkan?", answer: "Cukup siapkan daftar kebutuhan, perkiraan jumlah, lokasi, kegunaan barang atau layanan, dan waktu yang diinginkan. Kalau belum lengkap, kirim dulu informasi yang sudah ada." },
  ],
  serviceOptions: ["Konektivitas & Jaringan", "Peralatan & Elektronik", "ATK & Perlengkapan Kantor", "Instalasi & Pemeliharaan", "Perlengkapan Event & Seminar"],
  contact: {
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? null,
    email: null,
    phone: null,
    address: null,
    social: null,
    companyProfileUrl: null,
    legalLinks: null,
  },
  dataAvailability: {
    officialLogo: true,
    clientLogos: false,
    testimonials: false,
    coverage: false,
    pricing: false,
  },
};
