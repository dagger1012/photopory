// Seed content. Shaped like the future database rows so it can be swapped for Cloud data.
import hero from "@/assets/hero.jpg";
import cafe from "@/assets/cafe.jpg";
import product from "@/assets/product.jpg";
import event from "@/assets/event.jpg";

export const images = { hero, cafe, product, event };

export const site = {
  name: "[YOUR NAME]",
  role: "Photographer & content creator",
  city: "Mumbai, India",
  email: "hello@yourname.in",
  whatsapp: "919999999999",
  instagram: "yourname",
};

export type Media = { src: string; alt: string; w: number; h: number; type?: "image" | "video"; video?: string };
export type Pkg = { name: string; includes: string; price: number };
export type Service = {
  slug: string;
  name: string;
  short: string;
  cover: string;
  intro: string[];
  process: { title: string; text: string }[];
  gallery: Media[];
  deliverables: string[];
  packages: Pkg[];
};

const P = (src: string, alt: string, w: number, h: number): Media => ({ src, alt: `Placeholder — ${alt}`, w, h });
const pool: Media[] = [
  P(cafe, "cafe counter with cappuccino", 1024, 1024),
  P(product, "perfume bottle on red", 1024, 1280),
  P(event, "sangeet dance floor", 1280, 864),
  P(hero, "portrait with camera", 1024, 1280),
];

const proc = (shoot = "Shoot") => [
  { title: "Brief", text: "A 20-minute call. What you sell, who buys it, what has not worked." },
  { title: "Plan", text: "Moodboard, shot list, locations and a day schedule. Signed off before anything moves." },
  { title: shoot, text: "Fast, quiet, on schedule. I direct people and light so the frame does the talking." },
  { title: "Deliver", text: "Edited files in 72 hours. Sized for feed, story, web and print." },
];

const mk = (s: Omit<Service, "process" | "gallery"> & { shoot?: string }): Service => ({
  ...s,
  process: proc(s.shoot),
  gallery: [...pool, pool[2]!, pool[0]!],
});

export const services: Service[] = [
  mk({
    slug: "social-media-management",
    name: "Social Media Management",
    short: "Your feed, run like a publication.",
    cover: hero,
    shoot: "Create",
    intro: [
      "I run your accounts end to end. Calendar, content, captions, posting, replies.",
      "No recycled templates. Every month starts with what worked last month and kills what did not.",
    ],
    deliverables: ["Monthly content calendar", "12–20 posts a month", "Captions and hashtags", "Monthly insights report"],
    packages: [
      { name: "Starter", includes: "1 platform · 12 posts · basic reporting", price: 18000 },
      { name: "Growth", includes: "2 platforms · 20 posts · 8 reels · community replies", price: 35000 },
      { name: "Full Studio", includes: "3 platforms · daily stories · shoots included", price: 60000 },
    ],
  }),
  mk({
    slug: "media-kit",
    name: "Media Kit",
    short: "A deck brands actually read.",
    cover: product,
    shoot: "Design",
    intro: ["A sharp, one-scroll media kit with your numbers, your audience and your best work.", "Built to get replies from brand managers in under a minute."],
    deliverables: ["8–12 page PDF", "Web version", "Rate card", "Fresh portrait set"],
    packages: [
      { name: "Essential", includes: "PDF kit · rate card", price: 8000 },
      { name: "Signature", includes: "PDF + web kit · portrait shoot", price: 20000 },
    ],
  }),
  mk({
    slug: "social-media-content",
    name: "Social Media Content",
    short: "Reels and posts made to stop the thumb.",
    cover: cafe,
    shoot: "Create",
    intro: ["Short-form video and stills built for the feed, not resized from an ad.", "Hooks in the first second. Sound designed. Cut tight."],
    deliverables: ["Vertical reels", "Carousel stills", "Raw b-roll", "Cover frames"],
    packages: [
      { name: "Batch", includes: "4 reels · 10 stills · one location", price: 15000 },
      { name: "Monthly", includes: "10 reels · 30 stills · two shoot days", price: 38000 },
    ],
  }),
  mk({
    slug: "event-coverage",
    name: "Event Coverage",
    short: "Weddings, launches, nights that matter.",
    cover: event,
    intro: ["Documentary coverage that keeps up with the room. I shoot what happens, not what poses.", "Same-night teaser for socials, full gallery within a week."],
    deliverables: ["Full edited gallery", "Same-night teaser reel", "Highlight film", "Online gallery link"],
    packages: [
      { name: "Half day", includes: "4 hours · 200+ photos", price: 25000 },
      { name: "Full day", includes: "10 hours · photos + highlight film", price: 55000 },
      { name: "Multi-day", includes: "2–3 days · two shooters · film", price: 120000 },
    ],
  }),
  mk({
    slug: "photo-shoot",
    name: "Photo Shoot",
    short: "Portraits with an opinion.",
    cover: hero,
    intro: ["Portraits for artists, founders and people who are tired of looking polite in photos.", "Hard light, honest direction, frames you will use for years."],
    deliverables: ["20–40 edited images", "Contact sheet", "Web and print sizes"],
    packages: [
      { name: "Session", includes: "2 hours · 1 look · 20 images", price: 9000 },
      { name: "Editorial", includes: "4 hours · 3 looks · 40 images", price: 18000 },
    ],
  }),
  mk({
    slug: "product-shoot",
    name: "Product Shoot",
    short: "Products that look worth the price.",
    cover: product,
    intro: ["Studio and lifestyle product photography for D2C brands, marketplaces and campaigns.", "Colour-accurate. Consistent across a catalogue. Ready for Amazon, Shopify and ads."],
    deliverables: ["White-background packshots", "Styled hero images", "Short product loops", "Marketplace-ready crops"],
    packages: [
      { name: "Catalogue", includes: "Up to 10 SKUs · 3 angles each", price: 12000 },
      { name: "Campaign", includes: "Styled set · props · 15 hero images", price: 30000 },
    ],
  }),
  mk({
    slug: "cafe-shoot",
    name: "Cafe Shoot",
    short: "Food, space and the people in it.",
    cover: cafe,
    intro: ["Menus, interiors and the morning rush, shot so people want to walk in.", "One visit gives you a month of content and a menu that sells."],
    deliverables: ["Menu photography", "Interior and ambience set", "3 reels", "Zomato / Swiggy crops"],
    packages: [
      { name: "Menu", includes: "Up to 15 dishes · clean set", price: 10000 },
      { name: "Full Cafe", includes: "Menu + space + 3 reels", price: 22000 },
    ],
  }),
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
export const waLink = (text = "Hi, I'd like to book a shoot.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
