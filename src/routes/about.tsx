import { createFileRoute } from "@tanstack/react-router";
import { ContactBlock, Footer, Page, SectionHead, TopNav } from "@/components/site";
import { images, site } from "@/lib/content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About — ${site.name}` },
      { name: "description", content: `${site.name}, photographer and content creator based in ${site.city}.` },
      { property: "og:title", content: `About — ${site.name}` },
      { property: "og:description", content: "Who I am, what I shoot with, who I have shot for." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <Page>
      <section className="bg-paper">
        <TopNav tone="dark" />
        <h1 className="display type-giant -ml-[0.05em] overflow-hidden"><span className="animate-rise block">About</span></h1>
        <div className="grid gap-8 border-t px-5 py-10 md:grid-cols-12 md:px-8">
          <img src={images.hero} alt={`Portrait of ${site.name}`} loading="lazy" className="aspect-[4/5] w-full object-cover md:col-span-5" />
          <div className="space-y-5 text-xl leading-snug md:col-span-6 md:col-start-7 md:text-2xl">
            <p>I started with a borrowed camera and a city that never sits still.</p>
            <p>Eight years later I shoot for cafes, D2C brands, wedding families and founders who want to look like themselves.</p>
            <p className="meta text-muted-foreground">Placeholder story — replace with your own.</p>
          </div>
        </div>
      </section>
      <section className="grid bg-paper md:grid-cols-2">
        <div><SectionHead index="01" label="Kit" />
          <ul className="px-5 pb-10 text-xl md:px-8">{["Sony A7 IV", "Sony FX30", "24–70mm GM II", "85mm f/1.4", "Godox AD600", "DJI RS3", "Lightroom · Premiere · Resolve"].map((k) => <li key={k} className="border-t py-3">{k}</li>)}</ul>
        </div>
        <div><SectionHead index="02" label="Clients (placeholder)" />
          <ul className="px-5 pb-10 text-xl md:px-8">{["Blue Tokai", "Nykaa", "Third Wave", "Taj Hotels", "Bombay Shirt Co.", "Sula"].map((k) => <li key={k} className="border-t py-3">{k}</li>)}</ul>
        </div>
      </section>
      <ContactBlock />
      <Footer />
    </Page>
  ),
});
