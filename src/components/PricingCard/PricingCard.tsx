interface PricingFeature {
  text?: string | null;
  included?: boolean;
}

interface PricingCardProps {
  planName?: string | null;
  description?: string | null;
  price?: string | null;
  period?: string | null;
  features?: PricingFeature[] | null;
  ctaText?: string | null;
  ctaLink?: string | null;
  highlighted?: boolean;
  badgeText?: string | null;
}

export function PricingCard({
  planName = "Starter",
  description = "Perfect for getting started",
  price = "$19",
  period = "/month",
  features = [],
  ctaText = "Get started",
  ctaLink = "#",
  highlighted = false,
  badgeText = "Most popular",
}: PricingCardProps) {
  const cardClass = `pricing-card${highlighted ? " pricing-card--highlighted" : ""}`;

  return (
    <>
      <div className={cardClass}>
        {highlighted && badgeText && (
          <span className="pricing-badge">{badgeText}</span>
        )}

        <div className="pricing-header">
          <h3 className="plan-name">{planName}</h3>
          {description && <p className="plan-description">{description}</p>}
        </div>

        <div className="price-row">
          <span className="price-amount">{price}</span>
          {period && <span className="price-period">{period}</span>}
        </div>

        {features && features.length > 0 && (
          <ul className="feature-list">
            {features.map((feature, index) => (
              <li
                key={index}
                className={`feature-item${feature.included === false ? " feature-item--excluded" : ""}`}
              >
                <span className="feature-icon" aria-hidden="true">
                  {feature.included === false ? "×" : "✓"}
                </span>
                <span className="feature-text">{feature.text}</span>
              </li>
            ))}
          </ul>
        )}

        <a
          className="pricing-cta"
          href={ctaLink ?? "#"}
        >
          {ctaText}
        </a>
      </div>

      <style>{`
        .pricing-card {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 2rem;
          border-radius: 0.75rem;
          border: 1px solid var(--border);
          background-color: var(--background);
          color: var(--foreground);
          position: relative;
          max-width: 360px;
          width: 100%;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .pricing-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
        }

        .pricing-card--highlighted {
          border-color: var(--foreground);
          border-width: 2px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        }

        .pricing-badge {
          position: absolute;
          top: -0.75rem;
          left: 50%;
          transform: translateX(-50%);
          background-color: var(--foreground);
          color: var(--background);
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.025em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .pricing-header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .plan-name {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
        }

        .plan-description {
          font-size: 0.875rem;
          color: var(--muted-foreground);
          margin: 0;
        }

        .price-row {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
        }

        .price-amount {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
        }

        .price-period {
          font-size: 0.875rem;
          color: var(--muted-foreground);
        }

        .feature-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          border-top: 1px solid var(--border);
          padding-top: 1.5rem;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 0.625rem;
          font-size: 0.9375rem;
          line-height: 1.4;
        }

        .feature-item--excluded {
          color: var(--muted-foreground);
          text-decoration: line-through;
          text-decoration-color: var(--muted-foreground);
        }

        .feature-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 999px;
          background-color: var(--muted);
          font-size: 0.875rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .pricing-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 0.9375rem;
          text-decoration: none;
          background-color: var(--foreground);
          color: var(--background);
          border: 1px solid var(--foreground);
          transition: opacity 0.15s ease;
          margin-top: auto;
        }
        .pricing-cta:hover {
          opacity: 0.85;
        }

        .pricing-card:not(.pricing-card--highlighted) .pricing-cta {
          background-color: transparent;
          color: var(--foreground);
        }
        .pricing-card:not(.pricing-card--highlighted) .pricing-cta:hover {
          background-color: var(--muted);
          opacity: 1;
        }

        @media (max-width: 480px) {
          .pricing-card {
            padding: 1.5rem;
          }
          .price-amount {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
}
