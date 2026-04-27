import type { RegisteredComponent } from "@builder.io/sdk-react";
import { PricingCard } from "./PricingCard";

export const pricingCardConfig: RegisteredComponent = {
  component: PricingCard,
  name: "Pricing Card",
  image:
    "https://unpkg.com/css.gg@2.0.0/icons/svg/dollar.svg",
  inputs: [
    {
      name: "planName",
      type: "string",
      defaultValue: "Starter",
      required: true,
      helperText: "Name of the pricing plan",
    },
    {
      name: "description",
      type: "string",
      defaultValue: "Perfect for getting started",
      helperText: "Short tagline shown under the plan name",
    },
    {
      name: "price",
      type: "string",
      defaultValue: "$19",
      required: true,
      helperText: "Price as a string — e.g. '$19', '£29', 'Free'",
    },
    {
      name: "period",
      type: "string",
      defaultValue: "/month",
      helperText: "Billing period suffix — e.g. '/month', '/year'",
    },
    {
      name: "features",
      type: "list",
      helperText: "Bullet list of features included in this plan",
      defaultValue: [
        { text: "Unlimited projects", included: true },
        { text: "Email support", included: true },
        { text: "Advanced analytics", included: false },
      ],
      subFields: [
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
      ],
    },
    {
      name: "ctaText",
      type: "string",
      defaultValue: "Get started",
      helperText: "Call-to-action button label",
    },
    {
      name: "ctaLink",
      type: "url",
      defaultValue: "#",
      helperText: "URL the CTA button links to",
    },
    {
      name: "highlighted",
      type: "boolean",
      defaultValue: false,
      helperText: "Highlight this card as the featured/recommended plan",
    },
    {
      name: "badgeText",
      type: "string",
      defaultValue: "Most popular",
      helperText: "Badge text shown on highlighted cards",
    },
  ],
};
