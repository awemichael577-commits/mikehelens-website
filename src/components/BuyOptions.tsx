export type PurchaseOptions = {
  selarUrl?: string;
  amazonUrl?: string;
  whatsapp: string;
};

export function BuyOptions({ selarUrl, amazonUrl, whatsapp }: PurchaseOptions) {
  const hasPurchaseLink = Boolean(selarUrl || amazonUrl);

  return (
    <details className="group relative w-full sm:w-auto">
      <summary className="inline-flex min-h-11 w-full cursor-pointer list-none items-center justify-center rounded-full bg-navy-deep px-[18px] py-[11px] text-sm font-black text-white transition hover:bg-navy-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:w-auto [&::-webkit-details-marker]:hidden">
        Buy Options
      </summary>
      <div className="absolute left-0 top-[calc(100%+0.5rem)] z-20 grid w-full gap-2 rounded-[18px] border border-line bg-white p-3 shadow-[0_18px_45px_rgba(18,41,75,0.16)] sm:w-64">
        {selarUrl ? (
          <a
            href={selarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl px-4 py-3 text-sm font-bold text-navy-deep transition hover:bg-gold-pale focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            Buy on Selar
          </a>
        ) : null}
        {amazonUrl ? (
          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl px-4 py-3 text-sm font-bold text-navy-deep transition hover:bg-gold-pale focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            Buy on Amazon
          </a>
        ) : null}
        {!hasPurchaseLink ? (
          <p className="rounded-xl bg-bg-alt px-4 py-3 text-sm font-bold text-muted">
            Purchase link coming soon
          </p>
        ) : null}
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl px-4 py-3 text-sm font-bold text-navy-deep transition hover:bg-gold-pale focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
        >
          Contact on WhatsApp
        </a>
      </div>
    </details>
  );
}
