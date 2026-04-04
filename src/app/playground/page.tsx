"use client";

import dynamic from "next/dynamic";

const BezierClipPath = dynamic(
  () => import("../components/Windows/BezierClipPath"),
  { ssr: false }
);

export default function PlaygroundPage() {
  return (
    <div className="h-screen">
      <BezierClipPath />
    </div>
  );
}
