import type { ReactNode } from "react";

interface BuilderBoxProps {
  children?: ReactNode;
}

// Render children directly — the SDK wraps custom components in its own
// element which receives the `defaultStyles` (flex container styles) from
// the builder config. Adding our own wrapper <div> here would push children
// one level deeper and break Box's flex layout semantics.
export function BuilderBox({ children }: BuilderBoxProps) {
  return <>{children}</>;
}
