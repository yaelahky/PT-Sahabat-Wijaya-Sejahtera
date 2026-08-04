import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import { siteConfig } from "@/content/site-content";

describe("homepage product information", () => {
  it("renders five service cards with product bullets and no legacy area-check flow", () => {
    const { container } = render(<Home />);

    expect(container.querySelectorAll("[data-service-card]")).toHaveLength(5);
    for (const service of siteConfig.services) {
      expect(screen.getByRole("heading", { name: service.title })).toBeVisible();
      expect(service.items.length).toBeGreaterThan(0);
      for (const item of service.items) {
        expect(screen.getByText(item)).toBeVisible();
      }
    }

    expect(screen.queryByText(/Sahabat Net/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Cek Area/i)).not.toBeInTheDocument();
    expect(container.querySelector('a[href^="https://wa.me"]')).not.toBeInTheDocument();
  });

  it("keeps form choices aligned with all five service categories", () => {
    expect(siteConfig.serviceOptions).toEqual(siteConfig.services.map((service) => service.title));
  });

  it("links the benefits section from the primary navigation", () => {
    render(<Home />);
    expect(screen.getAllByRole("link", { name: "Manfaat" })[0]).toHaveAttribute("href", "#manfaat");
    expect(document.querySelector("section#manfaat")).toBeInTheDocument();
  });

  it("uses the approved SEO title and description", () => {
    expect(siteConfig.seo.title).toBe("PT Sahabat Wijaya Sejahtera | Pengadaan & Konektivitas");
    expect(siteConfig.seo.description).toBe("PT Sahabat Wijaya Sejahtera membantu kebutuhan perangkat elektronik, ATK, perlengkapan kantor dan acara, internet, jaringan, instalasi, serta perawatan untuk bisnis dan institusi.");
  });
});
