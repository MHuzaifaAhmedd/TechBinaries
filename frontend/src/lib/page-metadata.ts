import type { Metadata } from "next";

export const INDEX_FOLLOW_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
};

/** Adds a canonical path and index/follow robots to page metadata. */
export function withCanonical(path: string, metadata: Metadata = {}): Metadata {
  const canonical =
    path === "/" || path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;

  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical,
    },
    robots: INDEX_FOLLOW_ROBOTS,
  };
}
