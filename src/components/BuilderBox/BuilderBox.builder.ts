import type { RegisteredComponent } from "@builder.io/sdk-react";
import { BuilderBox } from "./BuilderBox";

export const builderBoxConfig: RegisteredComponent = {
  component: BuilderBox,
  name: "Box",
  canHaveChildren: true,
  defaultStyles: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    padding: "10px",
  },
};
