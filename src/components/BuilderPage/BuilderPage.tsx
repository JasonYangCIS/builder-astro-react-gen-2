import { Content, isPreviewing, type BuilderContent } from "@builder.io/sdk-react";
import { trackedButtonConfig } from "../TrackedButton/TrackedButton.builder";
import { pricingCardConfig } from "../PricingCard/PricingCard.builder";
import { pricingTableConfig } from "../PricingTable/PricingTable.builder";

interface BuilderPageProps {
  content: BuilderContent | null;
  apiKey: string;
  model: string;
}

const customComponents = [trackedButtonConfig, pricingCardConfig, pricingTableConfig];

export function BuilderPage({ content, apiKey, model }: BuilderPageProps) {
  if (!content && !isPreviewing()) {
    return <div>404 - Page not found</div>;
  }

  return (
    <Content
      content={content}
      model={model}
      apiKey={apiKey}
      customComponents={customComponents}
    />
  );
}
