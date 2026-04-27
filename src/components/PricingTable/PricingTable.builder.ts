import type { RegisteredComponent } from "@builder.io/sdk-react";
import { PricingTable } from "./PricingTable";

const featureSubFields = [
  {
    name: "text",
    type: "string",
    defaultValue: "Feature description",
  },
  {
    name: "included",
    type: "boolean",
    defaultValue: true,
    helperText: "Uncheck to show this feature as excluded (struck through)",
  },
];

export const pricingTableConfig: RegisteredComponent = {
  component: PricingTable,
  name: "Pricing Table",
  image:
    "https://unpkg.com/css.gg@2.0.0/icons/svg/list.svg",
  inputs: [
    {
      name: "heading",
      type: "string",
      defaultValue: "Simple, transparent pricing",
      helperText: "Section heading shown above the plans",
    },
    {
      name: "subheading",
      type: "string",
      defaultValue: "Choose the plan that fits your team",
      helperText: "Subheading shown below the heading",
    },
    {
      name: "showToggle",
      type: "boolean",
      defaultValue: true,
      helperText: "Show the Monthly / Annual billing toggle",
    },
    {
      name: "defaultBilling",
      type: "string",
      enum: ["monthly", "annual"],
      defaultValue: "monthly",
      helperText: "Which billing period is selected by default",
    },
    {
      name: "monthlyLabel",
      type: "string",
      defaultValue: "Monthly",
    },
    {
      name: "annualLabel",
      type: "string",
      defaultValue: "Annual",
    },
    {
      name: "annualSavingsLabel",
      type: "string",
      defaultValue: "Save 20%",
      helperText: "Small badge shown next to the Annual toggle. Leave blank to hide.",
    },
    {
      name: "plans",
      type: "list",
      helperText: "Pricing plans displayed as cards in the table",
      defaultValue: [
        {
          planName: "Starter",
          description: "For individuals getting started",
          monthlyPrice: "$19",
          annualPrice: "$182",
          ctaText: "Get started",
          ctaLink: "#",
          highlighted: false,
          badgeText: "",
          features: [
            { text: "Up to 3 projects", included: true },
            { text: "Community support", included: true },
            { text: "Advanced analytics", included: false },
          ],
        },
        {
          planName: "Pro",
          description: "For growing teams",
          monthlyPrice: "$49",
          annualPrice: "$470",
          ctaText: "Start free trial",
          ctaLink: "#",
          highlighted: true,
          badgeText: "Most popular",
          features: [
            { text: "Unlimited projects", included: true },
            { text: "Priority email support", included: true },
            { text: "Advanced analytics", included: true },
          ],
        },
        {
          planName: "Enterprise",
          description: "For large organizations",
          monthlyPrice: "Custom",
          annualPrice: "Custom",
          ctaText: "Contact sales",
          ctaLink: "#",
          highlighted: false,
          badgeText: "",
          features: [
            { text: "Everything in Pro", included: true },
            { text: "Dedicated account manager", included: true },
            { text: "Custom SLA & security review", included: true },
          ],
        },
      ],
      subFields: [
        {
          name: "planName",
          type: "string",
          defaultValue: "Plan",
          required: true,
        },
        {
          name: "description",
          type: "string",
          defaultValue: "Plan tagline",
        },
        {
          name: "monthlyPrice",
          type: "string",
          defaultValue: "$19",
          helperText: "Price shown when 'Monthly' is selected",
        },
        {
          name: "annualPrice",
          type: "string",
          defaultValue: "$182",
          helperText: "Price shown when 'Annual' is selected",
        },
        {
          name: "features",
          type: "list",
          subFields: featureSubFields,
          defaultValue: [
            { text: "Feature one", included: true },
            { text: "Feature two", included: true },
          ],
        },
        {
          name: "ctaText",
          type: "string",
          defaultValue: "Get started",
        },
        {
          name: "ctaLink",
          type: "url",
          defaultValue: "#",
        },
        {
          name: "highlighted",
          type: "boolean",
          defaultValue: false,
          helperText: "Highlight this plan as the recommended option",
        },
        {
          name: "badgeText",
          type: "string",
          defaultValue: "Most popular",
          helperText: "Badge text shown on the highlighted card",
        },
      ],
    },
  ],
};
