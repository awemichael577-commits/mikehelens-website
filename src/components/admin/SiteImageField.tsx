"use client";

import Image from "next/image";
import { useState } from "react";

type SiteImageFieldProps = {
  name: string;
  label: string;
  currentUrl?: string;
  currentPath?: string;
  hiddenName: string;
};

export function SiteImageField({
  name,
  label,
  currentUrl,
  currentPath,
  hiddenName,
}: SiteImageFieldProps) {
  const [preview, setPreview] = useState(currentUrl ?? "");

  return (
    <div className="grid gap-4 md:grid-cols-[220px_1fr]">
      <input type="hidden" name={hiddenName} value={currentPath ?? ""} />
      <div className="relative min-h-64 overflow-hidden rounded-2xl bg-gold-pale">
        {preview ? (
          <Image
            src={preview}
            alt={`${label} preview`}
            fill
            className="object-cover"
            unoptimized={preview.startsWith("blob:")}
          />
        ) : null}
      </div>
      <label className="grid h-fit gap-2 text-sm font-bold text-navy-deep">
        {label}
        <input
          name={name}
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              setPreview(URL.createObjectURL(file));
            }
          }}
          className="rounded-xl border border-line p-3 font-normal"
        />
      </label>
    </div>
  );
}
