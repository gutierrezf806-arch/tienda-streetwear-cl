import Link from "next/link";

const linkSections = [
  {
    title: "Categorías",
    links: [
      { href: "/catalogo/polerones", label: "Polerones" },
      { href: "/catalogo/poleras", label: "Poleras" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { href: "/contacto", label: "Contacto" },
      { href: "/envios", label: "Envíos" },
      { href: "/devoluciones", label: "Devoluciones" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terminos", label: "Términos" },
      { href: "/privacidad", label: "Privacidad" },
    ],
  },
];

const socialLinks = [
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "https://tiktok.com",
    label: "TikTok",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M16.5 2h-3v13.2a2.8 2.8 0 1 1-2-2.68V9.4a5.8 5.8 0 1 0 5 5.75V8.9a7.3 7.3 0 0 0 4.5 1.55V7.4a4.3 4.3 0 0 1-4.5-4.4V2Z" />
      </svg>
    ),
  },
  {
    href: "https://facebook.com",
    label: "Facebook",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.83.23-1.5 1.5-1.5h1.6V4.35C16.27 4.24 15.4 4 14.44 4 12.4 4 11 5.24 11 7.5V10.5H8.5v3H11V21h2.5Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-brand-charcoal/40 bg-brand-black px-6 pb-6 pt-12 text-brand-cream">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Link href="/" className="font-display text-xl uppercase tracking-tight text-brand-cream">
              Tu Marca Streetwear
            </Link>

            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-brand-cream/70 transition-colors hover:text-brand-gold"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-2">
            {linkSections.map((section) => (
              <div key={section.title} className="flex flex-col gap-3">
                <h3 className="font-display text-sm uppercase tracking-wide text-brand-gold">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-brand-cream/70 transition-colors hover:text-brand-cream"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-brand-charcoal/30 pt-6">
          <p className="text-center text-xs text-brand-cream/40">
            © 2025 Tu Marca Streetwear. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
