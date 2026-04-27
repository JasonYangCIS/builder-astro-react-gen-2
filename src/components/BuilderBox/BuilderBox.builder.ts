/**
 * Re-registers a `Box` container as a custom component.
 *
 * Why this exists: out-of-the-box Builder components are disabled at the
 * space level in our publish space, but we still want a generic `Box`
 * container available in the editor's insert menu. Registering it here
 * selectively allows it back in without re-enabling every default component.
 *
 * Do not "clean up" or remove — deleting this will make Box disappear
 * from the editor for all content in this space.
 */
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
