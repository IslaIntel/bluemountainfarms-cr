"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { siteContent } from "../lib/content";

const fieldClass =
  "min-h-12 rounded-xl border border-white/25 bg-transparent px-4 py-3 text-inherit";

export function WholesaleForm() {
  const t = useTranslations("wholesale");
  const [sent, setSent] = useState(false);

  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const subject = encodeURIComponent(
          `Wholesale application — ${data.get("business")}`,
        );
        const body = encodeURIComponent(
          `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nBusiness: ${data.get("business")}\nType: ${data.get("type")}\n\n${data.get("message")}`,
        );
        window.location.href = `mailto:elizabethcannva@gmail.com?subject=${subject}&body=${body}`;
        setSent(true);
      }}
    >
      <label className="grid gap-2">
        <span className="eyebrow">{t("name")}</span>
        <input name="name" required className={fieldClass} />
      </label>
      <label className="grid gap-2">
        <span className="eyebrow">{t("email")}</span>
        <input name="email" type="email" required className={fieldClass} />
      </label>
      <label className="grid gap-2">
        <span className="eyebrow">{t("business")}</span>
        <input name="business" required className={fieldClass} />
      </label>
      <label className="grid gap-2">
        <span className="eyebrow">{t("type")}</span>
        <select name="type" className={fieldClass} defaultValue="Restaurant">
          {siteContent.wholesale.businessTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2">
        <span className="eyebrow">{t("message")}</span>
        <textarea name="message" rows={4} className={fieldClass} />
      </label>
      <div className="flex flex-wrap gap-3">
        <button type="submit" className="btn btn-primary">
          {t("submit")}
        </button>
        <a
          href={siteContent.wholesale.whatsapp}
          className="btn btn-ghost"
          target="_blank"
          rel="noreferrer"
        >
          {t("whatsapp")}
        </a>
      </div>
      {sent && (
        <p className="text-sm text-[color:var(--sand)]">
          Opening your email client…
        </p>
      )}
    </form>
  );
}
