import { PLATFORM_BUTTON_LABELS, PLATFORM_LABELS, SocialIcon } from "@/components/social/icons";
import type { SocialLink } from "@/lib/types";

export function SocialLinkCard({ link }: { link: SocialLink }) {
  const buttonLabel = PLATFORM_BUTTON_LABELS[link.platform];

  return (
    <article className="flex gap-4 rounded-[22px] border border-line bg-white p-6 shadow-[0_12px_30px_rgba(18,41,75,0.06)]">
      <SocialIcon platform={link.platform} iconUrl={link.iconUrl} className="size-11 shrink-0" />
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
          {PLATFORM_LABELS[link.platform]}
        </p>
        <h3 className="mt-1 font-serif text-xl font-bold text-navy-deep">{link.displayName}</h3>
        {link.handle ? <p className="mt-0.5 text-sm font-bold text-navy-soft">{link.handle}</p> : null}
        {link.description ? (
          <p className="mt-3 text-sm leading-6 text-muted">{link.description}</p>
        ) : null}
        {link.url ? (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-navy-deep px-5 text-sm font-black text-white transition hover:bg-navy-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            {buttonLabel}
          </a>
        ) : (
          <p className="mt-4 inline-flex rounded-full bg-bg-alt px-5 py-3 text-sm font-bold text-muted">
            Link coming soon
          </p>
        )}
      </div>
    </article>
  );
}
