/**
 * Re-registers the SDK's built-in `Columns` block as a custom component.
 *
 * Why this exists: out-of-the-box Builder components are disabled at the
 * space level in our publish space, but we still want `Columns` available
 * in the editor's insert menu. Registering it here selectively allows it
 * back in without re-enabling every default component.
 *
 * Do not "clean up" or remove — deleting this will make Columns disappear
 * from the editor for all content in this space.
 */
import { Columns, type RegisteredComponent } from "@builder.io/sdk-react";

export const builderColumnsConfig: RegisteredComponent = {
  component: Columns,
  name: "App Columns",
  // The SDK's built-in Columns implementation requires all four
  // builder-injected props to render correctly. Omitting these causes
  // a runtime crash: "Cannot read properties of undefined (reading 'id')".
  shouldReceiveBuilderProps: {
    builderBlock: true,
    builderContext: true,
    builderComponents: true,
    builderLinkComponent: true,
  },
  inputs: [
    {
      name: "columns",
      type: "array",
      broadcast: true,
      subFields: [
        {
          name: "blocks",
          type: "array",
          hideFromUI: true,
          defaultValue: [],
        },
        {
          name: "width",
          type: "number",
          hideFromUI: true,
          helperText: "Width %, e.g. set to 50 to fill half of the space",
        },
        {
          name: "link",
          type: "url",
          helperText: "Optionally set a url that clicking this column will link to",
        },
      ],
      defaultValue: [
        { blocks: [], width: 50 },
        { blocks: [], width: 50 },
      ],
    },
    {
      name: "space",
      type: "number",
      defaultValue: 20,
      helperText: "Size of gap between columns",
      advanced: true,
    },
    {
      name: "stackColumnsAt",
      type: "string",
      defaultValue: "tablet",
      helperText: "Convert horizontal columns to vertical at what device size",
      enum: ["tablet", "mobile", "never"],
      advanced: true,
    },
    {
      name: "reverseColumnsWhenStacked",
      type: "boolean",
      defaultValue: false,
      helperText: "Reverse the order of columns when stacked vertically",
      advanced: true,
    },
  ],
};
