import { siteConfig } from "@/data/site";

export function WhatsAppButton({
  whatsapp = siteConfig.whatsappNumber,
  label = "Message on WhatsApp",
  className = "",
}: {
  whatsapp?: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1f8f4d] px-5 text-sm font-black text-white transition hover:bg-[#176f3b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${className}`}
    >
      {label}
    </a>
  );
}
