
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingPlans = () => {
  const plans = [
    {
      name: "Starter",
      price: "149",
      period: "month",
      description: "Perfect for small businesses just starting with SEO",
      features: [
        "5 High-Quality Backlinks",
        "Basic SEO Report",
        "30-Day Link Monitoring",
        "Email Support",
      ],
      buttonText: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      price: "349",
      period: "month",
      description: "Ideal for growing businesses looking to expand their reach",
      features: [
        "15 High-Quality Backlinks",
        "Comprehensive SEO Report",
        "90-Day Link Monitoring",
        "Anchor Text Optimization",
        "Priority Support",
        "Performance Dashboard",
      ],
      buttonText: "Choose Professional",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "699",
      period: "month",
      description: "Best for established businesses with competitive niches",
      features: [
        "35 High-Quality Backlinks",
        "Advanced SEO Analysis",
        "365-Day Link Monitoring",
        "Custom Anchor Text Strategy",
        "Dedicated Account Manager",
        "Competitor Backlink Analysis",
        "Monthly Strategy Calls",
      ],
      buttonText: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section className="py-20 bg-white" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-theme-text">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-theme-text opacity-80 max-w-3xl mx-auto">
            Choose the perfect backlink package for your business needs. All plans include quality backlinks from reputable websites.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg overflow-hidden ${
                plan.popular
                  ? "border-4 border-theme-teal transform scale-105 shadow-xl"
                  : "border border-theme-light-green shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="bg-theme-teal text-white py-2 text-center font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-6 md:p-8 bg-white">
                <h3 className="text-2xl font-bold text-theme-text mb-2">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-theme-text">
                    ${plan.price}
                  </span>
                  <span className="text-theme-text opacity-70">
                    /{plan.period}
                  </span>
                </div>
                <p className="text-theme-text opacity-80 mb-6">
                  {plan.description}
                </p>

                <Button
                  className={`w-full py-6 ${
                    plan.popular
                      ? "bg-theme-beige hover:bg-theme-teal"
                      : "bg-theme-teal hover:bg-theme-beige"
                  } text-white`}
                >
                  {plan.buttonText}
                </Button>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start"
                    >
                      <Check className="h-5 w-5 text-theme-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-theme-text">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
