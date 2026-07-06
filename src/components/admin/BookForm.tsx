"use client";

import { useMemo, useState } from "react";
import { saveBookAction } from "@/app/admin/books/actions";
import { SiteImageField } from "@/components/admin/SiteImageField";
import { isUploadedCoverPath } from "@/lib/media";
import type { Book } from "@/lib/types";

type BookFormProps = {
  book?: Book | null;
  error?: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function bookFormDefaults(book?: Book | null) {
  return {
    title: book?.title ?? "",
    slug: book?.slug ?? "",
    subtitle: book?.subtitle ?? "",
    category: book?.category ?? "",
    hook: book?.hook ?? "",
    description: book?.description ?? "",
    audience: book?.audience ?? "",
    benefits: book?.benefits.length ? book.benefits : [""],
    price: typeof book?.price === "number" ? String(book.price) : "",
    currency: book?.currency ?? "NGN",
    priceDisplay: book?.priceDisplay ?? "",
    selarUrl: book?.selarUrl ?? "",
    amazonUrl: book?.amazonUrl ?? "",
    coverPath: book?.coverPath ?? "",
    coverImage: book?.coverImage ?? "",
    coverAlt: book?.coverAlt ?? "",
    featured: Boolean(book?.featured),
    status: book?.status ?? "draft",
    sortOrder: book?.sortOrder ?? 0,
  };
}

export function BookForm({ book, error }: BookFormProps) {
  const defaults = useMemo(() => bookFormDefaults(book), [book]);
  const [title, setTitle] = useState(defaults.title);
  const [slug, setSlug] = useState(defaults.slug);
  const [slugEdited, setSlugEdited] = useState(Boolean(defaults.slug));
  const [benefits, setBenefits] = useState(defaults.benefits);

  function updateTitle(value: string) {
    setTitle(value);
    if (!slugEdited) {
      setSlug(slugify(value));
    }
  }

  function updateBenefit(index: number, value: string) {
    setBenefits((current) => current.map((benefit, itemIndex) => (itemIndex === index ? value : benefit)));
  }

  function moveBenefit(index: number, direction: -1 | 1) {
    setBenefits((current) => {
      const next = [...current];
      const target = index + direction;

      if (target < 0 || target >= next.length) {
        return current;
      }

      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  return (
    <form action={saveBookAction} className="grid gap-6 rounded-2xl border border-line bg-white p-6 shadow-sm">
      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {decodeURIComponent(error)}
        </p>
      ) : null}

      <input type="hidden" name="id" value={book?.id ?? ""} />
      <input type="hidden" name="previousSlug" value={book?.slug ?? ""} />
      <input type="hidden" name="sortOrder" value={defaults.sortOrder} />

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Title
          <input
            name="title"
            value={title}
            onChange={(event) => updateTitle(event.target.value)}
            required
            className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Slug
          <input
            name="slug"
            value={slug}
            onChange={(event) => {
              setSlugEdited(true);
              setSlug(slugify(event.target.value));
            }}
            required
            className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-bold text-navy-deep">
        Subtitle
        <input
          name="subtitle"
          defaultValue={defaults.subtitle}
          className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Category
          <input
            name="category"
            defaultValue={defaults.category}
            placeholder="e.g. Marriage Testimony"
            className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Hook (short card blurb)
          <input
            name="hook"
            defaultValue={defaults.hook}
            placeholder="One sentence shown on book cards"
            className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-bold text-navy-deep">
        Description
        <textarea
          name="description"
          defaultValue={defaults.description}
          rows={6}
          className="rounded-xl border-line font-normal focus:border-gold focus:ring-gold"
        />
      </label>

      <label className="grid gap-2 text-sm font-bold text-navy-deep">
        Who this is for
        <textarea
          name="audience"
          defaultValue={defaults.audience}
          rows={4}
          className="rounded-xl border-line font-normal focus:border-gold focus:ring-gold"
        />
      </label>

      <fieldset className="grid gap-3">
        <legend className="text-sm font-bold text-navy-deep">What readers will gain</legend>
        {benefits.map((benefit, index) => (
          <div key={`${index}-${benefits.length}`} className="grid gap-2 sm:grid-cols-[1fr_auto_auto_auto]">
            <input
              name="benefits"
              value={benefit}
              onChange={(event) => updateBenefit(index, event.target.value)}
              className="min-h-12 rounded-xl border-line focus:border-gold focus:ring-gold"
              placeholder={`Benefit ${index + 1}`}
            />
            <button type="button" onClick={() => moveBenefit(index, -1)} className="rounded-xl border border-line px-3 text-sm font-bold">
              Up
            </button>
            <button type="button" onClick={() => moveBenefit(index, 1)} className="rounded-xl border border-line px-3 text-sm font-bold">
              Down
            </button>
            <button
              type="button"
              onClick={() => setBenefits((current) => current.filter((_, itemIndex) => itemIndex !== index))}
              className="rounded-xl border border-line px-3 text-sm font-bold text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setBenefits((current) => [...current, ""])}
          className="w-fit rounded-xl border border-line px-4 py-2 text-sm font-bold text-navy-deep"
        >
          Add benefit
        </button>
      </fieldset>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Price
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            defaultValue={defaults.price}
            className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Currency
          <select
            name="currency"
            defaultValue={defaults.currency}
            className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold"
          >
            <option value="NGN">NGN</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="EUR">EUR</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Price display
          <input
            name="priceDisplay"
            defaultValue={defaults.priceDisplay}
            placeholder="Optional"
            className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Selar URL
          <input
            name="selarUrl"
            type="url"
            defaultValue={defaults.selarUrl}
            className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Amazon URL
          <input
            name="amazonUrl"
            type="url"
            defaultValue={defaults.amazonUrl}
            className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold"
          />
        </label>
      </div>

      <SiteImageField
        name="cover"
        label="Cover image"
        currentPath={isUploadedCoverPath(defaults.coverPath) ? defaults.coverPath : ""}
        currentUrl={defaults.coverImage}
        hiddenName="existingCoverPath"
      />
      <p className="-mt-3 text-xs font-normal leading-5 text-muted">
        Uploads to the public Supabase Storage bucket at media/covers.
      </p>

      <label className="grid gap-2 text-sm font-bold text-navy-deep">
        Cover alt text
        <input
          name="coverAlt"
          defaultValue={defaults.coverAlt}
          placeholder={`e.g. ${defaults.title || "Book"} cover`}
          className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="flex items-center gap-3 text-sm font-bold text-navy-deep">
          <input name="featured" type="checkbox" defaultChecked={defaults.featured} className="rounded border-line text-gold focus:ring-gold" />
          Featured book
        </label>
        <label className="grid gap-2 text-sm font-bold text-navy-deep md:col-span-2">
          Status
          <select
            name="status"
            defaultValue={defaults.status}
            className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </label>
      </div>

      <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
        <button
          type="submit"
          name="intent"
          value="save"
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-navy/20 px-6 text-sm font-black text-navy-deep transition hover:bg-gold-pale focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          Save Draft
        </button>
        <button
          type="submit"
          name="intent"
          value="publish"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-navy-deep px-6 text-sm font-black text-white transition hover:bg-navy-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          Publish
        </button>
      </div>
    </form>
  );
}
