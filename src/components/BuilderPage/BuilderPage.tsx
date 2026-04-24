import { Content, isPreviewing, type BuilderContent } from "@builder.io/sdk-react";
import { trackedButtonConfig } from "../TrackedButton/TrackedButton.builder";
import { TrackedButton } from "../TrackedButton/TrackedButton";

interface BuilderPageProps {
  content: BuilderContent | null;
  apiKey: string;
  model: string;
}

export function BuilderPage({ content, apiKey, model }: BuilderPageProps) {
  if (!content && !isPreviewing()) {
    return <div>404 - Page not found</div>;
  }

  const contentId = content?.id ?? null;
  const variationId =
    (content as { testVariationId?: string } | null)?.testVariationId ?? null;

  const customComponents = [
    {
      ...trackedButtonConfig,
      component: (props: Record<string, unknown>) => (
        <TrackedButton {...props} contentId={contentId} variationId={variationId} />
      ),
    },
  ];

  return (
    <Content
      content={content}
      model={model}
      apiKey={apiKey}
      customComponents={customComponents}
    />
  );
}
