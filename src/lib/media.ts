import { getSupabaseConfig } from "@/lib/env";

const fallbackCover = "/assets/logo-icon.png";

export function isSupabaseStoragePath(path?: string | null) {
  const value = path?.trim();

  return Boolean(value && !value.startsWith("/") && !/^https?:\/\//i.test(value));
}

export function isUploadedCoverPath(path?: string | null) {
  const value = path?.trim();

  return Boolean(
    value &&
      isSupabaseStoragePath(value) &&
      value.replace(/^\/+/, "").startsWith("covers/") &&
      !value.includes("THE-CORRECT"),
  );
}

export function getPublicMediaUrl(path?: string | null) {
  if (!path) {
    return fallbackCover;
  }

  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) {
    return path;
  }

  const config = getSupabaseConfig();

  if (!config) {
    return fallbackCover;
  }

  const cleanedPath = path.replace(/^\/+/, "");
  return `${config.url}/storage/v1/object/public/media/${cleanedPath}`;
}
