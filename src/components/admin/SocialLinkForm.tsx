import { saveSocialLinkAction } from "@/app/admin/social-links/actions";
import { PLATFORM_LABELS } from "@/components/social/icons";
import type { SocialLink, SocialPlatform } from "@/lib/types";

type SocialLinkFormProps = {
  link?: SocialLink | null;
  error?: string;
};

const PLATFORM_OPTIONS = Object.keys(PLATFORM_LABELS) as SocialPlatform[];

const CATEGORY_SUGGESTIONS = ["Book Related", "Personal Channels", "Other"];

export function SocialLinkForm({ link, error }: SocialLinkFormProps) {
  return (
    <form action={saveSocialLinkAction} className="grid gap-6 rounded-2xl border border-line bg-white p-6 shadow-sm">
      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {decodeURIComponent(error)}
        </p>
      ) : null}

      <input type="hidden" name="id" value={link?.id ?? ""} />
      <input type="hidden" name="sortOrder" value={link?.sortOrder ?? 0} />

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Platform
          <select
            name="platform"
            defaultValue={link?.platform ?? "website"}
            required
            className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold"
          >
            {PLATFORM_OPTIONS.map((platform) => (
              <option key={platform} value={platform}>
                {PLATFORM_LABELS[platform]}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Display name / page name
          <input
            name="displayName"
            defaultValue={link?.displayName ?? ""}
            required
            placeholder="e.g. Mikehelens Manuscripts & Publications"
            className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Handle
          <input
            name="handle"
            defaultValue={link?.handle ?? ""}
            placeholder="e.g. @mikehelens"
            className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          URL
          <input
            name="url"
            type="url"
            defaultValue={link?.url ?? ""}
            placeholder="https://..."
            className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Category
          <input
            name="category"
            list="social-categories"
            defaultValue={link?.category ?? "Other"}
            placeholder="e.g. Book Related"
            className="min-h-12 rounded-xl border-line font-normal focus:border-gold focus:ring-gold"
          />
          <datalist id="social-categories">
            {CATEGORY_SUGGESTIONS.map((category) => (
              <option key={category} value={category} />
            ))}
          </datalist>
          <span className="text-xs font-normal leading-5 text-muted">
            Links are grouped by this on the Connect page. Type a new name to create a new group.
          </span>
        </label>
        <div className="grid gap-2 text-sm font-bold text-navy-deep">
          Custom icon (optional)
          <input type="hidden" name="existingIconPath" value={link?.iconPath ?? ""} />
          <div className="flex items-center gap-3">
            {link?.iconUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={link.iconUrl} alt="" className="size-11 rounded-lg object-contain ring-1 ring-line" />
            ) : null}
            <input
              name="icon"
              type="file"
              accept="image/*"
              className="w-full rounded-xl border border-line p-3 font-normal"
            />
          </div>
          <span className="text-xs font-normal leading-5 text-muted">
            Leave empty to use the built-in platform icon automatically. Upload a PNG/SVG to override it.
          </span>
        </div>
      </div>

      <label className="grid gap-2 text-sm font-bold text-navy-deep">
        Short description
        <textarea
          name="description"
          defaultValue={link?.description ?? ""}
          rows={3}
          placeholder="Shown on the Connect page card."
          className="rounded-xl border-line font-normal focus:border-gold focus:ring-gold"
        />
      </label>

      <div className="grid gap-3 rounded-xl border border-line bg-bg-alt p-4 sm:grid-cols-2">
        <label className="flex items-center gap-3 text-sm font-bold text-navy-deep">
          <input
            name="isFeatured"
            type="checkbox"
            defaultChecked={link?.isFeatured}
            className="rounded border-line text-gold focus:ring-gold"
          />
          Featured (shown first in its group)
        </label>
        <label className="grid gap-2 text-sm font-bold text-navy-deep">
          Status
          <select
            name="status"
            defaultValue={link?.status ?? "hidden"}
            className="min-h-11 rounded-xl border-line font-normal focus:border-gold focus:ring-gold"
          >
            <option value="hidden">Hidden</option>
            <option value="active">Active</option>
          </select>
        </label>
      </div>
      <p className="-mt-3 text-xs font-normal leading-5 text-muted">
        Only <strong>active</strong> links appear publicly on the Connect page. An active link must have a URL.
      </p>

      <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-navy-deep px-6 text-sm font-black text-white transition hover:bg-navy-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          Save social link
        </button>
      </div>
    </form>
  );
}
