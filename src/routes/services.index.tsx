import { createFileRoute } from "@tanstack/react-router";
import { ContactBlock, Footer, Page, ServiceRows, ServiceTabs, TopNav } from "@/components/site";
import { site } from "@/lib/content";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: `Services — ${site.name}` },
      { name: "description", content: "Seven ways to work together: social, media kits, content, events, portraits, products and cafes." },
      { property: "og:title", content: `Services — ${site.name}` },
      { property: "og:description", content: "Social, content, events, portraits, products and cafes. Pricing is negotiable." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <Page>
      <div className="bg-paper"><TopNav tone="dark" /></div>
      <ServiceTabs />
      <h1 className="display type-giant -ml-[0.05em] overflow-hidden bg-paper pt-8"><span className="animate-rise block">Services</span></h1>
      <div className="bg-paper pt-10"><ServiceRows /></div>
      <ContactBlock />
      <Footer />
    </Page>
  ),
});
