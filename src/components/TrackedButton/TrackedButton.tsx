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

    try {
      track({
        type: trackEventType ?? "click",
        apiKey: API_KEY,
        metadata,
      });
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

  const sizeClass = size === "sm" ? "btn--sm" : size === "lg" ? "btn--lg" : "btn--default";
  const variantClass = `btn--${variant}`;

  const sharedProps = {
    className: `tracked-btn ${variantClass} ${sizeClass}`,
    onClick: handleClick,
  };

  return (
    <>
      {link ? (
        <a
          {...sharedProps}
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
        <button {...sharedProps} type="button">
          {text}
        </button>
      )}

      <style>{`
        .tracked-btn {
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
        .tracked-btn:focus-visible {
          outline: 2px solid var(--ring, currentColor);
          outline-offset: 2px;
        }
        .tracked-btn:disabled {
          opacity: 0.5;
          pointer-events: none;
        }

        /* Sizes */
        .btn--sm {
          padding: 0.375rem 0.75rem;
          font-size: 0.8125rem;
        }
        .btn--default {
          padding: 0.5rem 1.25rem;
        }
        .btn--lg {
          padding: 0.75rem 1.75rem;
          font-size: 1rem;
        }

        /* Variants */
        .btn--primary {
          background-color: var(--foreground);
          color: var(--background);
          border-color: var(--foreground);
        }
        .btn--primary:hover {
          opacity: 0.85;
        }

        .btn--outline {
          background-color: transparent;
          color: var(--foreground);
          border-color: var(--border);
        }
        .btn--outline:hover {
          background-color: var(--muted);
        }

        .btn--secondary {
          background-color: var(--muted);
          color: var(--muted-foreground);
          border-color: transparent;
        }
        .btn--secondary:hover {
          opacity: 0.8;
        }

        .btn--ghost {
          background-color: transparent;
          color: var(--muted-foreground);
          border-color: transparent;
        }
        .btn--ghost:hover {
          background-color: var(--muted);
          color: var(--foreground);
        }
      `}</style>
    </>
  );
}
