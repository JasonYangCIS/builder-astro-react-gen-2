import { track } from "@builder.io/sdk-react";

const API_KEY = import.meta.env.PUBLIC_BUILDER_API_KEY;

interface TrackedButtonProps {
  text?: string | null;
  link?: string | null;
  openInNewTab?: boolean;
  variant?: "primary" | "outline" | "secondary" | "ghost";
  size?: "sm" | "default" | "lg";
  onClickCode?: string | null;
  trackEventType?: string | null;
  trackMetadata?: string | null;
  contentId?: string | null;
  variationId?: string | null;
}

export function TrackedButton({
  text = "Click me",
  link,
  openInNewTab = false,
  variant = "primary",
  size = "default",
  onClickCode,
  trackEventType = "click",
  trackMetadata,
  contentId,
  variationId,
}: TrackedButtonProps) {
  const handleClick = () => {
    let metadata: Record<string, unknown> = {};
    if (trackMetadata) {
      try {
        metadata = JSON.parse(trackMetadata);
      } catch {
        console.warn("[TrackedButton] trackMetadata is not valid JSON:", trackMetadata);
      }
    }

    const trackArgs: Parameters<typeof track>[0] = {
      type: trackEventType ?? "click",
      apiKey: API_KEY,
    };
    if (contentId) {
      trackArgs.contentId = contentId;
    }
    if (variationId) {
      trackArgs.variationId = variationId;
    }
    if (Object.keys(metadata).length > 0) {
      trackArgs.metadata = metadata;
    }

    try {
      track(trackArgs);
    } catch (err) {
      console.warn("[TrackedButton] track() failed:", err);
    }

    if (onClickCode) {
      try {
        new Function(onClickCode)();
      } catch (err) {
        console.warn("[TrackedButton] onClickCode execution failed:", err);
      }
    }

    if (link) {
      if (openInNewTab) {
        window.open(link, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = link;
      }
    }
  };

  const className = `trkbtn trkbtn--${variant} trkbtn--${size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}`;

  return (
    <>
      {link ? (
        <a
          className={className}
          href={link}
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}
        >
          {text}
        </a>
      ) : (
        <button className={className} type="button" onClick={handleClick}>
          {text}
        </button>
      )}

      <style>{`
        .trkbtn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          border-radius: 0.375rem;
          font-weight: 500;
          font-size: 0.875rem;
          line-height: 1;
          cursor: pointer;
          text-decoration: none;
          border: 1px solid transparent;
          transition: opacity 0.15s ease, background-color 0.15s ease, color 0.15s ease;
          white-space: nowrap;
        }
        .trkbtn:focus-visible {
          outline: 2px solid var(--ring, currentColor);
          outline-offset: 2px;
        }
        .trkbtn:disabled {
          opacity: 0.5;
          pointer-events: none;
        }

        /* Sizes */
        .trkbtn--sm {
          padding: 0.375rem 0.75rem;
          font-size: 0.8125rem;
        }
        .trkbtn--default {
          padding: 0.5rem 1.25rem;
        }
        .trkbtn--lg {
          padding: 0.75rem 1.75rem;
          font-size: 1rem;
        }

        /* Variants */
        .trkbtn--primary {
          background-color: var(--foreground);
          color: var(--background);
          border-color: var(--foreground);
        }
        .trkbtn--primary:hover {
          opacity: 0.85;
        }

        .trkbtn--outline {
          background-color: transparent;
          color: var(--foreground);
          border-color: var(--border);
        }
        .trkbtn--outline:hover {
          background-color: var(--muted);
        }

        .trkbtn--secondary {
          background-color: var(--muted);
          color: var(--muted-foreground);
          border-color: transparent;
        }
        .trkbtn--secondary:hover {
          opacity: 0.8;
        }

        .trkbtn--ghost {
          background-color: transparent;
          color: var(--muted-foreground);
          border-color: transparent;
        }
        .trkbtn--ghost:hover {
          background-color: var(--muted);
          color: var(--foreground);
        }
      `}</style>
    </>
  );
}
