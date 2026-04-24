import type { RegisteredComponent } from "@builder.io/sdk-react";
import { TrackedButton } from "./TrackedButton";

export const trackedButtonConfig: RegisteredComponent = {
  component: TrackedButton,
  name: "Tracked Button",
  shouldReceiveBuilderProps: {
    builderContext: true,
  },
  image:
    "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F56ef21f3e0134d17ba1e57f4f0a4ef99",
  inputs: [
    {
      name: "text",
      type: "string",
      defaultValue: "Click me",
      required: true,
      helperText: "Button label shown to visitors",
    },
    {
      name: "link",
      type: "url",
      helperText: "Optional URL to navigate to when the button is clicked",
    },
    {
      name: "openInNewTab",
      type: "boolean",
      defaultValue: false,
      helperText: "Open the link in a new browser tab",
    },
    {
      name: "variant",
      type: "string",
      enum: ["primary", "outline", "secondary", "ghost"],
      defaultValue: "primary",
      helperText: "Visual style of the button",
    },
    {
      name: "size",
      type: "string",
      enum: ["sm", "default", "lg"],
      defaultValue: "default",
      helperText: "Size of the button",
    },
    {
      name: "onClickCode",
      type: "longText",
      helperText:
        "Custom JavaScript to execute on click — e.g. window.gtag('event', 'cta_click') or window.dataLayer.push({event: 'signup'})",
    },
    {
      name: "trackEventType",
      type: "string",
      defaultValue: "click",
      helperText:
        "Builder.io event type sent to track(). Use 'click', 'conversion', or any custom string.",
    },
    {
      name: "trackMetadata",
      type: "longText",
      helperText:
        'Optional JSON metadata attached to the tracked event — e.g. {"label":"hero-cta","campaign":"summer-sale"}',
    },
  ],
};
