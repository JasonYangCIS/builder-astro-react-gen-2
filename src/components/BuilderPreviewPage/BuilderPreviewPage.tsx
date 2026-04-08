import { useState, useEffect } from "react";
import {
  Content,
  fetchOneEntry,
  isPreviewing,
  type BuilderContent,
} from "@builder.io/sdk-react";

export const BuilderPreviewPage = () => {

  const [content, setContent] = useState<BuilderContent | null>(null);

  useEffect(() => {
    fetchOneEntry({
      model: "page",
      apiKey: import.meta.env.PUBLIC_BUILDER_API_KEY,
      userAttributes: {
        urlPath: window.location.pathname,
      },
    }).then((data) => setContent(data));
  }, []);

  const shouldRender = content || isPreviewing();

  if (!shouldRender) return <div>404 - Page not found</div>;

  return (
    <Content
      content={content}
      model="page"
      apiKey={import.meta.env.PUBLIC_BUILDER_API_KEY}
    />
  );
};