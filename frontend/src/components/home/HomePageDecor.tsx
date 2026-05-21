"use client";

import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/shared/CustomCursor"), {
  ssr: false,
});

export function HomePageDecor() {
  return <CustomCursor />;
}
