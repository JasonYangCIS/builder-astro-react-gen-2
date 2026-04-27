import type { ReactNode } from "react";

interface BuilderBoxProps {
  children?: ReactNode;
}

export function BuilderBox({ children }: BuilderBoxProps) {
  return <div className="builder-box">{children}</div>;
}
