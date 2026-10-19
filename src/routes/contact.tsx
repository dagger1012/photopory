import { createFileRoute } from "@tanstack/react-router";
import { ContactBlock, Footer, Page, TopNav } from "@/components/site";
import { EnquiryForm } from "@/components/enquiry";
import { site } from "@/lib/content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${site.name}` },
      { name: "description", content: "Book a shoot. Tell me what you need and your budget." },
      { property: "og:title", content: `Contact — ${site.name}` },
      { property: "og:description", content: "Enquiry form, WhatsApp, Instagram and email." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <Page>
      <section className="bg-paper pb-16">
        <TopNav tone="dark" />
        <h1 className="display type-giant -ml-[0.05em] overflow-hidden"><span className="animate-rise block">Book me</span></h1>
        <div className="border-t px-5 pt-10 md:px-8"><EnquiryForm /></div>
      </section>
      <ContactBlock />
      <Footer />
    </Page>
  ),
});
