import Image from "next/image";
import { BuyOptions, type PurchaseOptions } from "@/components/BuyOptions";
import { Button } from "@/components/Button";

export type { PurchaseOptions };

export type BookCardProps = {
  title: string;
  subtitle: string;
  category: string;
  hook: string;
  priceDisplay: string;
  coverImage: string;
  coverAlt: string;
  detailHref: string;
  purchaseOptions: PurchaseOptions;
  featured?: boolean;
};

export function BookCard({
  title,
  subtitle,
  category,
  hook,
  priceDisplay,
  coverImage,
  coverAlt,
  detailHref,
  purchaseOptions,
}: BookCardProps) {
  return (
    <article className="grid h-full min-h-0 items-start gap-5 rounded-[24px] border border-line bg-white p-5 shadow-[0_1px_2px_rgba(18,41,75,0.06)] transition hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(18,41,75,0.08)] sm:p-6 md:grid-cols-[170px_1fr] md:gap-6">
      <a
        href={detailHref}
        className="mx-auto flex aspect-[3/4] w-full max-w-[240px] items-center justify-center self-start rounded-[18px] bg-gold-pale p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold md:mx-0 md:h-[245px] md:w-[170px]"
      >
        <span className="relative block h-full w-full overflow-hidden rounded-[14px] bg-white shadow-[0_12px_28px_rgba(18,41,75,0.14)]">
          <Image
            src={coverImage}
            alt={coverAlt}
            fill
            sizes="(min-width: 768px) 146px, 80vw"
            className="object-contain"
          />
        </span>
      </a>

      <div className="flex h-full min-w-0 flex-col">
        <p className="mb-2 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-muted">
          {category}
        </p>
        <h2 className="m-0 font-serif text-[clamp(1.55rem,2vw,2rem)] font-bold leading-[1.1] text-navy-deep">
          {title}
        </h2>
        <p className="mb-3 mt-1 font-extrabold leading-[1.45] text-navy-deep">
          {subtitle}
        </p>
        <p className="line-clamp-3 leading-[1.7] text-muted">{hook}</p>
        <p className="mt-[18px] text-[1.35rem] font-black leading-tight text-navy-deep">
          {priceDisplay}
        </p>
        <div className="mt-auto flex flex-col gap-3 pt-[18px] sm:flex-row sm:flex-wrap">
          <Button href={detailHref} variant="secondary" className="min-h-11 w-full px-[18px] py-[11px] sm:w-auto">
            View Details
          </Button>
          <BuyOptions {...purchaseOptions} />
        </div>
      </div>
    </article>
  );
}
