"use client";

import { Toaster as Sonner } from "sonner";

function Toaster() {
  return <Sonner position="top-center" richColors closeButton toastOptions={{ className: "font-sans" }} />;
}

export { Toaster };
