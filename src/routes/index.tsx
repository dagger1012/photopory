import { createFileRoute } from "@tanstack/react-router";
import { ContactBlock, Footer, Marquee, Page, SectionHead, ServiceRows, TopNav } from "@/components/site";
import { images, site } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.name} — Photographer & Content Creator, India` },
      { name: "description", content: "Portraits, products, cafes, events and social content. Shot in India, made for the feed." },
      { property: "og:title", content: `${site.name} — Seen Different` },
      { property: "og:description", content: "Photography and content for brands, cafes and people with something to say." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const work = [
  { src: images.event, alt: "Guests dancing at a sangeet night", cls: "md:col-span-8 aspect-[3/2]", cap: "Sangeet, Udaipur" },
  { src: images.product, alt: "Perfume bottle on red backdrop", cls: "md:col-span-4 aspect-[4/5] md:mt-40", cap: "Product, Studio" },
  { src: images.cafe, alt: "Cappuccino on a marble cafe counter", cls: "md:col-span-5 aspect-square", cap: "Cafe, Bandra" },
  { src: images.hero, alt: "Portrait of photographer with camera", cls: "md:col-span-6 md:col-start-7 aspect-[4/5] md:-mt-24", cap: "Portrait, Night" },
];

function Home() {
  return (
    <Page>
      <section className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-cobalt text-paper">
        <img
          src={images.hero}
          alt={`Portrait of ${site.name}`}
          width={1024}
          height={1280}
          className="absolute right-0 top-0 h-full w-full object-cover opacity-90 mix-blend-luminosity md:w-[52%]"
        />
        <TopNav />
        <h1 className="display type-giant relative z-10 -ml-[0.05em] uppercase">
          <span className="block overflow-hidden"><span className="animate-rise block">Seen</span></span>
          <span className="block overflow-hidden"><span className="animate-rise block [animation-delay:120ms]">Different</span></span>
        </h1>
        <div className="meta relative z-10 flex flex-wrap justify-between gap-3 px-5 py-5 md:px-8">
          <span>{site.role} — {site.city}</span>
          <a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a>
          <span>Scroll down ↓</span>
        </div>
      </section>

      <Marquee />

      <section className="bg-paper">
        <SectionHead index="01" label="Services" />
        <h2 className="display type-xl -ml-[0.04em] px-5 pb-10 pt-6 md:px-8">What I do.</h2>
        <ServiceRows />
      </section>

      <section id="work" className="bg-paper pb-24">
        <SectionHead index="02" label="Selected work" />
        <h2 className="display type-xl -ml-[0.04em] px-5 pb-12 pt-6 md:px-8">Recent frames.</h2>
        <div className="grid gap-6 px-5 md:grid-cols-12 md:px-8">
          {work.map((w) => (
            <figure key={w.cap} className={`group ${w.cls}`}>
              <div className="h-full overflow-hidden">
                <img src={w.src} alt={w.alt} loading="lazy" className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0" />
              </div>
              <figcaption className="meta mt-2 flex justify-between"><span>{w.cap}</span><span>Placeholder</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-ink py-20 text-paper">
        <SectionHead index="03" label="Approach" tone="light" />
        <p className="display type-lg px-5 pt-8 uppercase md:px-8">
          No filters. No fluff. Hard light, honest direction, files on time.
        </p>
      </section>

      <ContactBlock />
      <Footer />
    </Page>
  );
}
