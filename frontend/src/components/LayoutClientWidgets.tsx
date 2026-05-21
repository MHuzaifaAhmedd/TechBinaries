"use client";

import dynamic from "next/dynamic";

const PremiumScrollbar = dynamic(
  () =>
    import("@/components/PremiumScrollbar.client").then((m) => ({
      default: m.PremiumScrollbar,
    })),
  { ssr: false },
);

const ChatWidget = dynamic(
  () =>
    import("@/components/chat/ChatWidget").then((m) => ({
      default: m.ChatWidget,
    })),
  { ssr: false },
);

export function LayoutClientWidgets() {
  return (
    <>
      <PremiumScrollbar />
      <ChatWidget />
    </>
  );
}
