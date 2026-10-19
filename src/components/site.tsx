import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { services, site, waLink } from "@/lib/content";

export function TopNav({ tone = "light" }: { tone?: "light" | "dark" }) {
  const cls = tone === "light" ? "text-paper" : "text-ink";
  return (
    <header className={`meta relative z-20 flex items-start justify-between gap-6 px-5 py-5 md:px-8 ${cls}`}>
      <Link to="/" className="font-medium">{site.name}</Link>
      <nav className="flex gap-5 md:gap-10">
        <Link to="/" hash="work" className="hover:underline">Work</Link>
        <Link to="/services" className="hover:underline">Services</Link>
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
      </nav>
    </header>
  );
}

export function ServiceTabs() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="sticky top-0 z-30 border-b bg-paper">
      <div className="meta flex gap-6 overflow-x-auto whitespace-nowrap px-5 py-3 md:px-8">
        {services.map((s) => {
          const active = path === `/services/${s.slug}`;
          return (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className={active ? "bg-ink px-1 text-paper" : "px-1 hover:underline"}
            >
              {s.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function Marquee() {
  const items = [...services, ...services];
  return (
    <div className="overflow-hidden border-y border-ink bg-ink py-4 text-paper" aria-hidden>
      <div className="animate-marquee flex w-max gap-10">
        {items.map((s, i) => (
          <span key={i} className="display type-md flex items-center gap-10 uppercase">
            {s.name}
            <span className="text-signal">✶</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function SectionHead({ index, label, tone = "dark" }: { index: string; label: string; tone?: "dark" | "light" }) {
  return (
    <div className={`meta flex justify-between border-t px-5 py-3 md:px-8 ${tone === "light" ? "border-paper/40 text-paper" : ""}`}>
      <span>{index}</span>
      <span>{label}</span>
    </div>
  );
}

export function ServiceRows() {
  const [hover, setHover] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div className="relative" onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })} onMouseLeave={() => setHover(null)}>
      {services.map((s, i) => (
        <Link
          key={s.slug}
          to="/services/$slug"
          params={{ slug: s.slug }}
          onMouseEnter={() => setHover(i)}
          className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-t px-5 py-5 transition-colors duration-200 last:border-b hover:bg-ink hover:text-paper md:grid-cols-[4rem_1fr_22rem_3rem] md:px-8"
        >
          <span className="meta">{String(i + 1).padStart(2, "0")}</span>
          <span className="display type-md">{s.name}</span>
          <span className="meta hidden text-muted-foreground group-hover:text-paper/70 md:block">{s.short}</span>
          <span className="display type-md justify-self-end transition-transform group-hover:translate-x-1">→</span>
        </Link>
      ))}
      {hover !== null && (
        <img
          src={services[hover]!.cover}
          alt=""
          className="pointer-events-none fixed z-40 hidden h-56 w-44 object-cover md:block"
          style={{ left: pos.x + 24, top: pos.y - 112 }}
        />
      )}
    </div>
  );
}

export function ContactBlock() {
  return (
    <section className="flex min-h-screen flex-col justify-between overflow-hidden bg-signal text-paper">
      <SectionHead index="04" label="Contact" tone="light" />
      <h2 className="display type-giant -ml-[0.04em] uppercase">
        Let's<br />Shoot
      </h2>
      <div className="grid gap-6 border-t border-paper/40 px-5 py-8 md:grid-cols-3 md:px-8">
        <a href={`mailto:${site.email}`} className="display type-md break-all hover:underline">{site.email}</a>
        <a href={waLink()} target="_blank" rel="noreferrer" className="display type-md hover:underline">WhatsApp ↗</a>
        <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noreferrer" className="display type-md hover:underline">@{site.instagram}</a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="meta flex flex-wrap justify-between gap-4 bg-ink px-5 py-5 text-paper md:px-8">
      <span>© 2026 {site.name}</span>
      <span>{site.city}</span>
      <span>{site.role}</span>
    </footer>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return <main className="animate-page">{children}</main>;
}
