"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { href: "#work", label: "Work" },
  { href: "#about-me", label: "About" },
  { href: "/resume", label: "Resume" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const isCaseStudy = pathname.startsWith("/work/");

  return (
    <header className={`site-header${isCaseStudy ? " site-header--case-study" : ""}`} aria-label="Primary navigation">
      <Link className="site-header__name" href="/" aria-label="Syed Israruddin home">
        Syed Israruddin
      </Link>
      <nav>
        <ul>
          {navigation.map((item) => (
            <li key={item.label}>
              <Link
                className={activeLabel === item.label ? "site-header__link site-header__link--active" : "site-header__link"}
                href={item.href}
                aria-current={activeLabel === item.label ? "location" : undefined}
                onClick={() => setActiveLabel(item.label)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
