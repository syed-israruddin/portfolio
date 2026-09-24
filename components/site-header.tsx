import Link from "next/link";

const navigation = [
  { href: "#work", label: "Work" },
  { href: "#about-me", label: "About" },
  { href: "/resume", label: "Resume" },
];

export function SiteHeader() {
  return (
    <header className="site-header" aria-label="Primary navigation">
      <nav>
        <ul>
          {navigation.map((item) => (
            <li key={item.label}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
