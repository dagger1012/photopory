import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ContactBlock, Footer, Page, SectionHead, ServiceTabs, TopNav } from "@/components/site";
import { EnquiryForm } from "@/components/enquiry";
import { getService, inr, services, site, waLink } from "@/lib/content";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = getService(params.slug);
    if (!s) throw notFound();
    return { slug: s.slug, name: s.name, short: s.short };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — ${site.name}` },
          { name: "description", content: `${loaderData.short} ${loaderData.name} in India by ${site.name}.` },
          { property: "og:title", content: `${loaderData.name} — ${site.name}` },
          { property: "og:description", content: loaderData.short },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Unavailable" }, { name: "robots", content: "noindex" }],
  }),
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useParams();
  const s = getService(slug)!;
  const idx = services.findIndex((x) => x.slug === slug);
  const next = services[(idx + 1) % services.length]!;
  const [open, setOpen] = useState<number | null>(null);
  const [form, setForm] = useState(false);

  return (
    <Page key={slug}>
      <div className="bg-paper"><TopNav tone="dark" /></div>
      <ServiceTabs />

      <section className="overflow-hidden bg-paper pb-10">
        <div className="meta flex justify-between px-5 py-4 md:px-8">
          <span>Service {String(idx + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</span>
          <span>{s.short}</span>
        </div>
        <h1 className="display type-xl -ml-[0.04em] overflow-hidden">
          <span className="animate-rise block">{s.name}</span>
        </h1>
      </section>

      <section className="grid border-t bg-paper md:grid-cols-12">
        <div className="meta px-5 py-4 md:col-span-3 md:px-8">01 — What I do</div>
        <div className="space-y-5 px-5 pb-12 pt-4 text-xl leading-snug md:col-span-7 md:text-2xl">
          {s.intro.map((p) => <p key={p}>{p}</p>)}
        </div>
        <img src={s.cover} alt={`Placeholder — ${s.name}`} loading="lazy" className="aspect-square w-full object-cover md:col-span-2" />
      </section>

      <section className="bg-cobalt text-paper">
        <SectionHead index="02" label="How I do it" tone="light" />
        {s.process.map((p, i) => (
          <div key={p.title} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-paper/40 px-5 py-6 md:grid-cols-[5rem_1fr_28rem] md:px-8">
            <span className="meta">{String(i + 1).padStart(2, "0")}</span>
            <span className="display type-lg uppercase">{p.title}</span>
            <p className="col-start-2 text-lg md:col-start-3">{p.text}</p>
          </div>
        ))}
      </section>

      <section className="bg-paper pb-16">
        <SectionHead index="03" label="Proof" />
        <div className="columns-2 gap-4 px-5 pt-6 md:columns-3 md:px-8">
          {s.gallery.map((m, i) => (
            <button key={i} onClick={() => setOpen(i)} className="group mb-4 block w-full overflow-hidden">
              <img src={m.src} alt={m.alt} width={m.w} height={m.h} loading="lazy" className="w-full transition duration-500 group-hover:scale-[1.03]" />
            </button>
          ))}
        </div>
      </section>

      <section className="grid border-t bg-paper md:grid-cols-12">
        <div className="meta px-5 py-4 md:col-span-3 md:px-8">04 — What you get</div>
        <ul className="md:col-span-9">
          {s.deliverables.map((d, i) => (
            <li key={d} className="flex gap-6 border-t px-5 py-4 first:border-t-0 md:px-0">
              <span className="meta pt-2">{String.fromCharCode(65 + i)}</span>
              <span className="display type-md">{d}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-ink text-paper">
        <SectionHead index="05" label="Pricing" tone="light" />
        {s.packages.map((p) => (
          <div key={p.name} className="grid gap-2 border-t border-paper/40 px-5 py-6 md:grid-cols-[1fr_1.4fr_auto] md:items-baseline md:px-8">
            <span className="display type-md uppercase">{p.name}</span>
            <span className="meta text-paper/70">{p.includes}</span>
            <span className="display type-md">from {inr(p.price)}</span>
          </div>
        ))}
        <div className="border-t border-paper/40 bg-signal px-5 py-10 md:px-8">
          <p className="display type-lg uppercase">Pricing is negotiable. Tell me your budget.</p>
          <div className="meta mt-8 flex flex-wrap gap-3">
            <a href={waLink(`Hi, I'm interested in ${s.name}.`)} target="_blank" rel="noreferrer" className="border border-paper bg-paper px-6 py-4 text-ink hover:bg-ink hover:text-paper">WhatsApp me ↗</a>
            <button onClick={() => setForm((v) => !v)} className="border border-paper px-6 py-4 hover:bg-paper hover:text-ink">{form ? "Close form" : "Send an enquiry"}</button>
          </div>
          {form && <div className="mt-8 bg-paper p-5 text-ink md:p-8"><EnquiryForm defaultService={s.name} /></div>}
        </div>
      </section>

      <Link to="/services/$slug" params={{ slug: next.slug }} className="group block overflow-hidden bg-paper pt-6">
        <span className="meta block px-5 md:px-8">Next service →</span>
        <span className="display type-xl -ml-[0.04em] block transition-transform duration-500 group-hover:translate-x-4">{next.name}</span>
      </Link>

      <ContactBlock />
      <Footer />

      {open !== null && (
        <div role="dialog" aria-modal className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4" onClick={() => setOpen(null)}>
          <img src={s.gallery[open]!.src} alt={s.gallery[open]!.alt} className="max-h-full max-w-full object-contain" />
          <button className="meta absolute right-5 top-5 text-paper">Close ✕</button>
          <span className="meta absolute bottom-5 left-5 text-paper">{open + 1} / {s.gallery.length}</span>
        </div>
      )}
    </Page>
  );
}
