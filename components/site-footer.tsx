"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import DotGrid from "@/components/dot-grid";

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("hello@syedisraruddin.com");
    setEmailCopied(true);
  };

  return (
    <footer ref={footerRef} className="site-footer">
      <DotGrid className="site-footer__dot-grid" interactionTargetRef={footerRef} />
      <div className="site-footer__content">
        <h2>Let’s Chat!</h2>
        <nav aria-label="Contact links">
          <a className="site-footer__button site-footer__button--icon" href="https://www.instagram.com/syed1srar?stkn=OXVuY3hxNjdsZWQy&utm_source=qr" target="_blank" rel="noreferrer" aria-label="Instagram">
            <Image src="/assets/instagram-icon.svg" alt="" width={32} height={32} />
          </a>
          <button className="site-footer__button site-footer__button--email" type="button" onClick={copyEmail} onMouseLeave={() => setEmailCopied(false)} onBlur={() => setEmailCopied(false)} aria-label={emailCopied ? "Email copied to clipboard" : "Copy hello@syedisraruddin.com to clipboard"}>
            <span className="site-footer__email-flipper" aria-hidden="true">
              <span className="site-footer__email-face site-footer__email-face--front">{emailCopied ? "Email copied" : "Email me"}</span>
              <span className="site-footer__email-face site-footer__email-face--back">{emailCopied ? "Email copied" : "hello@syedisraruddin.com"}</span>
            </span>
          </button>
          <a className="site-footer__button site-footer__button--icon" href="https://www.linkedin.com/in/syed-israruddin" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Image src="/assets/linkedin-icon.svg" alt="" width={32} height={31} />
          </a>
        </nav>
      </div>
    </footer>
  );
}
