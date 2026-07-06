import type { ReactElement } from "react";
import type { SocialPlatform } from "@/lib/types";

export const PLATFORM_LABELS: Record<SocialPlatform, string> = {
  youtube: "YouTube",
  facebook: "Facebook",
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  email: "Email",
  website: "Website",
  tiktok: "TikTok",
  x: "X",
};

export const PLATFORM_BUTTON_LABELS: Record<SocialPlatform, string> = {
  youtube: "Visit YouTube Channel",
  facebook: "Visit Facebook Profile",
  instagram: "Follow on Instagram",
  whatsapp: "Chat on WhatsApp",
  email: "Send Email",
  website: "Visit Website",
  tiktok: "Visit TikTok",
  x: "Visit on X",
};

type IconProps = { className?: string };

// Uniform full-colour rounded-square "app-icon" badges so a row of social links
// reads as the real, recognizable platform marks (YouTube red, Facebook blue,
// Instagram gradient, WhatsApp green, etc.) while staying visually consistent.

const BADGE = { x: 2, y: 2, width: 20, height: 20, rx: 5.5 } as const;

// YouTube: authentic red rounded RECTANGLE (landscape ~1.4:1) with a white play triangle.
function YouTubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#FF0000"
        d="M23.06 8.02a2.86 2.86 0 0 0-2.01-2.02C19.28 5.5 12 5.5 12 5.5s-7.28 0-9.05.5A2.86 2.86 0 0 0 .94 8.02 30 30 0 0 0 .5 12a30 30 0 0 0 .44 3.98 2.86 2.86 0 0 0 2.01 2.02c1.77.5 9.05.5 9.05.5s7.28 0 9.05-.5a2.86 2.86 0 0 0 2.01-2.02A30 30 0 0 0 23.5 12a30 30 0 0 0-.44-3.98Z"
      />
      <path fill="#fff" d="M9.75 15.02 15.5 12 9.75 8.98v6.04Z" />
    </svg>
  );
}

// Facebook: authentic blue circle with white "f".
function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#1877F2" />
      <path
        fill="#fff"
        d="M14.55 12.75 15 10.1h-2.53V8.38c0-.73.35-1.43 1.5-1.43h1.16V4.68s-1.05-.18-2.06-.18c-2.1 0-3.48 1.28-3.48 3.58V10.1H7.2v2.65h2.4V19h2.86v-6.25h2.09Z"
      />
    </svg>
  );
}

// Instagram: authentic gradient rounded square with camera outline.
function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="mhm-ig-grad" cx="0.3" cy="1" r="1.1">
          <stop offset="0" stopColor="#FEDA75" />
          <stop offset="0.25" stopColor="#FA7E1E" />
          <stop offset="0.5" stopColor="#D62976" />
          <stop offset="0.75" stopColor="#962FBF" />
          <stop offset="1" stopColor="#4F5BD5" />
        </radialGradient>
      </defs>
      <rect {...BADGE} fill="url(#mhm-ig-grad)" />
      <rect x="6.5" y="6.5" width="11" height="11" rx="3.4" fill="none" stroke="#fff" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2.9" fill="none" stroke="#fff" strokeWidth="1.5" />
      <circle cx="15.5" cy="8.5" r="0.95" fill="#fff" />
    </svg>
  );
}

// WhatsApp: authentic green speech bubble with white phone.
function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#25D366" d="M12 2a10 10 0 0 0-8.55 15.19L2 22l4.94-1.4A10 10 0 1 0 12 2Z" />
      <path
        fill="#fff"
        d="M16.5 14.3c-.24-.12-1.4-.69-1.62-.77-.22-.08-.37-.12-.53.12-.16.24-.6.77-.74.93-.14.16-.27.18-.51.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.42-1.33-1.66-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.28-.73-1.75-.19-.46-.39-.4-.53-.41h-.45a.86.86 0 0 0-.63.29c-.22.24-.83.81-.83 1.98 0 1.17.85 2.3.97 2.46.12.16 1.66 2.54 4.03 3.56.56.24 1 .38 1.34.49.56.18 1.07.15 1.47.09.45-.07 1.4-.57 1.6-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.46-.28Z"
      />
    </svg>
  );
}

// Email / Website are not social brands — neutral tasteful glyphs in brand colours.
function EmailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect {...BADGE} fill="#C9A24A" />
      <rect x="6" y="8" width="12" height="8.5" rx="1.4" fill="none" stroke="#fff" strokeWidth="1.5" />
      <path d="M6.6 9l5.4 3.7L17.4 9" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WebsiteIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect {...BADGE} fill="#17355C" />
      <g fill="none" stroke="#fff" strokeWidth="1.4">
        <circle cx="12" cy="12" r="5.2" />
        <path d="M6.8 12h10.4M12 6.8c1.4 1.4 2.1 3.3 2.1 5.2S13.4 15.8 12 17.2c-1.4-1.4-2.1-3.3-2.1-5.2S10.6 8.2 12 6.8Z" />
      </g>
    </svg>
  );
}

// TikTok: authentic black rounded square (app mark) with white music note.
function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect {...BADGE} fill="#010101" />
      <path
        fill="#fff"
        d="M16.35 6.6a3.4 3.4 0 0 1-2.06-1.35h-2.02v9.02a1.94 1.94 0 1 1-1.4-1.86V10.3a4.06 4.06 0 1 0 3.42 4.01V10.2a5.4 5.4 0 0 0 3.11.98V9.13a3.35 3.35 0 0 1-1.05-.16Z"
      />
    </svg>
  );
}

// X (Twitter): authentic black rounded square with white X.
function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect {...BADGE} fill="#000" />
      <path
        fill="#fff"
        d="M13.62 10.9 17.9 6h-1.36l-3.71 4.26L9.85 6H6.4l4.48 6.4L6.4 18h1.36l3.92-4.5L14.85 18h3.45l-4.68-7.1Zm-1.39 1.6-.45-.65-3.61-5.14h2.09l2.92 4.16.46.65 3.79 5.4h-2.09l-3.1-4.42Z"
      />
    </svg>
  );
}

/** No dedicated icon exists for this platform yet — falls back to a generic link badge. */
function GenericLinkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect {...BADGE} fill="#5F7087" />
      <g fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round">
        <path d="M10.4 13.6 13.6 10.4" />
        <path d="M11.2 8.4 12 7.6a2.7 2.7 0 1 1 3.8 3.8l-1 1" />
        <path d="M12.8 15.6 12 16.4a2.7 2.7 0 1 1-3.8-3.8l1-1" />
      </g>
    </svg>
  );
}

export const platformIcons: Record<SocialPlatform, (props: IconProps) => ReactElement> = {
  youtube: YouTubeIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  whatsapp: WhatsAppIcon,
  email: EmailIcon,
  website: WebsiteIcon,
  tiktok: TikTokIcon,
  x: XIcon,
};

export function SocialIcon({
  platform,
  iconUrl,
  className = "size-5",
}: {
  platform: SocialPlatform;
  /** Optional custom uploaded icon; when set it overrides the built-in branded mark. */
  iconUrl?: string;
  className?: string;
}) {
  if (iconUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={iconUrl} alt="" className={`${className} object-contain`} />;
  }

  const Icon = platformIcons[platform] ?? GenericLinkIcon;
  return <Icon className={className} />;
}
