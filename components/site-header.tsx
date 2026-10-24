"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
  { href: "/#work", label: "Work" },
  { href: "/#about-me", label: "About" },
  { href: "/resume", label: "Resume" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrollActiveLabel, setScrollActiveLabel] = useState<{ pathname: string; label: string | null }>({ pathname: "", label: null });
  const isCaseStudy = pathname.startsWith("/work/");
  const hasSolidBackground = isCaseStudy || pathname === "/resume" || pathname === "/";
  const activeLabel = pathname === "/resume" ? "Resume" : isCaseStudy ? "Work" : scrollActiveLabel.pathname === pathname ? scrollActiveLabel.label : null;

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sections = [
      { id: "work", label: "Work" },
      { id: "about-me", label: "About" },
    ] as const;

    let animationFrame: number | null = null;
    let lastScrollY = window.scrollY;
    let scrollDirection: "up" | "down" = "down";
    const updateActiveSection = () => {
      animationFrame = null;
      const currentScrollY = window.scrollY;
      if (currentScrollY !== lastScrollY) {
        scrollDirection = currentScrollY < lastScrollY ? "up" : "down";
        lastScrollY = currentScrollY;
      }

      const visibleSections = sections.filter(({ id }) => {
        const section = document.getElementById(id);
        if (!section) return false;

        const { bottom, top } = section.getBoundingClientRect();
        return top < window.innerHeight && bottom > 0;
      });
      const activeSection = scrollDirection === "up" ? visibleSections[0] : visibleSections.at(-1);

      setScrollActiveLabel((current) => {
        const nextLabel = activeSection?.label ?? null;
        return current.pathname === pathname && current.label === nextLabel ? current : { pathname, label: nextLabel };
      });
    };

    const scheduleUpdate = () => {
      if (animationFrame === null) animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    return () => {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, [pathname]);

  return (
    <header className={`site-header${hasSolidBackground ? " site-header--case-study" : ""}`} aria-label="Primary navigation">
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
                data-label={item.label}
                aria-current={activeLabel === item.label ? "location" : undefined}
                onClick={() => setScrollActiveLabel({ pathname, label: item.label })}
              >
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
