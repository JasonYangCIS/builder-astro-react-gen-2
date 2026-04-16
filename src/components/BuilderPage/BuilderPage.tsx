import { Content, isPreviewing, type BuilderContent } from "@builder.io/sdk-react";
import { trackedButtonConfig } from "../TrackedButton/TrackedButton.builder";

const CUSTOM_COMPONENTS = [trackedButtonConfig];

interface BuilderPageProps {
  content: BuilderContent | null;
  apiKey: string;
  model: string;
}

export function BuilderPage({ content, apiKey, model }: BuilderPageProps) {
  if (!content && !isPreviewing()) {
    return <div>404 - Page not found</div>;
  }

  return (
    <Content
      content={content}
      model={model}
      apiKey={apiKey}
      customComponents={CUSTOM_COMPONENTS}
    />
  );
}
