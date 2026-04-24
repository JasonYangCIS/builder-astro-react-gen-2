import { Content, isPreviewing, type BuilderContent } from "@builder.io/sdk-react";
import { trackedButtonConfig } from "../TrackedButton/TrackedButton.builder";

interface BuilderPageProps {
  content: BuilderContent | null;
  apiKey: string;
  model: string;
}

const customComponents = [trackedButtonConfig];

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
