import { useState, useEffect, useRef } from "react";
import { Content, fetchOneEntry, isPreviewing, type BuilderContent } from "@builder.io/sdk-react";
import { trackedButtonConfig } from "../TrackedButton/TrackedButton.builder";
import { TrackedButton } from "../TrackedButton/TrackedButton";

const API_KEY = import.meta.env.PUBLIC_BUILDER_API_KEY;

export const BuilderPreviewPage = () => {
  const [content, setContent] = useState<BuilderContent | null>(null);
  const [loading, setLoading] = useState(true);
  const modelRef = useRef<string>('page');

  useEffect(() => {
    modelRef.current = new URLSearchParams(window.location.search).get('builder.preview') ?? 'page';

    fetchOneEntry({
      model: modelRef.current,
      apiKey: API_KEY,
      userAttributes: { urlPath: window.location.pathname },
    }).then((data) => {
      setContent(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  const shouldRender = content || isPreviewing(Object.fromEntries(new URLSearchParams(window.location.search)));

  if (!shouldRender) return <div>404 - Page not found</div>;

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
      model={modelRef.current}
      apiKey={API_KEY}
      customComponents={customComponents}
    />
  );
};
