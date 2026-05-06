export const CONTACT_HEAR_ABOUT_OPTIONS = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "x", label: "X (Twitter)" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "google-search", label: "Google / search engine" },
  { value: "referral", label: "Referral or word of mouth" },
  { value: "friend-colleague", label: "Friend or colleague" },
  { value: "event", label: "Event or conference" },
  { value: "podcast", label: "Podcast" },
  { value: "blog-article", label: "Blog or article" },
  { value: "email-newsletter", label: "Email or newsletter" },
  { value: "other", label: "Other" },
] as const;

export function hearAboutChannelLabel(value: string): string {
  const opt = CONTACT_HEAR_ABOUT_OPTIONS.find((o) => o.value === value);
  return opt?.label ?? value;
}

/** Builds the string stored on the lead / sent to the contact API. */
export function formatContactHearAbout(channel: string, otherDetail: string): string {
  if (!channel.trim()) return "";
  if (channel === "other") {
    const t = otherDetail.trim();
    return t ? `Other: ${t}` : "";
  }
  return hearAboutChannelLabel(channel);
}
