import { useState } from "react";
import { services, waLink } from "@/lib/content";

const field = "w-full border-0 border-b border-ink bg-transparent py-3 text-lg outline-none focus:border-cobalt";

export function EnquiryForm({ defaultService = "" }: { defaultService?: string }) {
  const [sent, setSent] = useState(false);
  if (sent) return <p className="display type-md">Got it. I'll reply within a day.</p>;
  return (
    <form
      className="grid gap-6 md:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const text = `Hi! I'm ${f.get("name")} (${f.get("phone")}). Service: ${f.get("service")}. Budget: ${f.get("budget")}. ${f.get("message")}`;
        window.open(waLink(text), "_blank");
        setSent(true);
      }}
    >
      <label className="meta">Name<input required name="name" maxLength={80} className={field} /></label>
      <label className="meta">Phone<input required name="phone" type="tel" maxLength={20} className={field} /></label>
      <label className="meta">Service
        <select name="service" defaultValue={defaultService} className={field}>
          {services.map((s) => <option key={s.slug}>{s.name}</option>)}
        </select>
      </label>
      <label className="meta">Budget (₹)<input name="budget" maxLength={20} className={field} /></label>
      <label className="meta md:col-span-2">Message<textarea name="message" rows={3} maxLength={1000} className={field} /></label>
      <button className="meta justify-self-start bg-ink px-8 py-4 text-paper hover:bg-cobalt">Send enquiry →</button>
    </form>
  );
}
