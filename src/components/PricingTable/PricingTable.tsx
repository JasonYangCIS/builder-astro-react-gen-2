import { useState } from "react";
import { PricingCard } from "../PricingCard/PricingCard";

interface PricingPlanFeature {
  text?: string | null;
  included?: boolean;
}

interface PricingPlan {
  planName?: string | null;
  description?: string | null;
  monthlyPrice?: string | null;
  annualPrice?: string | null;
  features?: PricingPlanFeature[] | null;
  ctaText?: string | null;
  ctaLink?: string | null;
  highlighted?: boolean;
  badgeText?: string | null;
}

interface PricingTableProps {
  heading?: string | null;
  subheading?: string | null;
  monthlyLabel?: string | null;
  annualLabel?: string | null;
  annualSavingsLabel?: string | null;
  defaultBilling?: "monthly" | "annual";
  showToggle?: boolean;
  plans?: PricingPlan[] | null;
}

export function PricingTable({
  heading = "Simple, transparent pricing",
  subheading = "Choose the plan that fits your team",
  monthlyLabel = "Monthly",
  annualLabel = "Annual",
  annualSavingsLabel = "Save 20%",
  defaultBilling = "monthly",
  showToggle = true,
  plans = [],
}: PricingTableProps) {
  const [billing, setBilling] = useState<"monthly" | "annual">(defaultBilling);

  const isAnnual = billing === "annual";

  return (
    <>
      <section className="pricing-table">
        {(heading || subheading) && (
          <header className="pricing-intro">
            {heading && <h2 className="pricing-heading">{heading}</h2>}
            {subheading && <p className="pricing-subheading">{subheading}</p>}
          </header>
        )}

        {showToggle && (
          <div className="billing-toggle" role="group" aria-label="Billing period">
            <button
              type="button"
              className={`toggle-option${!isAnnual ? " toggle-option--active" : ""}`}
              onClick={() => setBilling("monthly")}
              aria-pressed={!isAnnual}
            >
              {monthlyLabel}
            </button>
            <button
              type="button"
              className={`toggle-option${isAnnual ? " toggle-option--active" : ""}`}
              onClick={() => setBilling("annual")}
              aria-pressed={isAnnual}
            >
              {annualLabel}
              {annualSavingsLabel && (
                <span className="savings-badge">{annualSavingsLabel}</span>
              )}
            </button>
          </div>
        )}

        <div className="plans-grid">
          {plans?.map((plan, index) => (
            <PricingCard
              key={index}
              planName={plan.planName}
              description={plan.description}
              price={isAnnual ? plan.annualPrice : plan.monthlyPrice}
              period={isAnnual ? "/year" : "/month"}
              features={plan.features}
              ctaText={plan.ctaText}
              ctaLink={plan.ctaLink}
              highlighted={plan.highlighted}
              badgeText={plan.badgeText}
            />
          ))}
        </div>
      </section>

      <style>{`
        .pricing-table {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.5rem;
          padding: 4rem 1.5rem;
          width: 100%;
          color: var(--foreground);
        }

        .pricing-intro {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          text-align: center;
          max-width: 640px;
        }

        .pricing-heading {
          font-size: 2.25rem;
          font-weight: 700;
          margin: 0;
          line-height: 1.15;
        }

        .pricing-subheading {
          font-size: 1.0625rem;
          color: var(--muted-foreground);
          margin: 0;
        }

        .billing-toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem;
          border-radius: 999px;
          background-color: var(--muted);
          border: 1px solid var(--border);
        }

        .toggle-option {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.25rem;
          border-radius: 999px;
          border: none;
          background-color: transparent;
          color: var(--muted-foreground);
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.15s ease, color 0.15s ease;
        }

        .toggle-option:hover {
          color: var(--foreground);
        }

        .toggle-option--active {
          background-color: var(--background);
          color: var(--foreground);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .savings-badge {
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.025em;
          text-transform: uppercase;
          padding: 0.125rem 0.5rem;
          border-radius: 999px;
          background-color: var(--foreground);
          color: var(--background);
        }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          width: 100%;
          max-width: 1100px;
          align-items: stretch;
          justify-items: center;
        }

        @media (max-width: 768px) {
          .pricing-table {
            padding: 2.5rem 1rem;
            gap: 2rem;
          }
          .pricing-heading {
            font-size: 1.75rem;
          }
          .plans-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
