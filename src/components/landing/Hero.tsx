
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-theme-light-green to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-theme-text">
            Boost Your SEO Rankings with Quality Backlinks
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-theme-text opacity-80">
            Get high-quality backlinks from trusted sources to improve your website's authority and search engine rankings.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-theme-beige hover:bg-theme-teal text-white text-lg py-6 px-8">
              <Link to="/pricing">View Pricing Plans</Link>
            </Button>
            <Button variant="outline" className="border-theme-teal text-theme-text hover:bg-theme-light-green text-lg py-6 px-8">
              <Link to="/features">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-16 max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 flex flex-col md:flex-row items-center">
          <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0">
            <div className="w-20 h-20 bg-theme-yellow rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-theme-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2 text-theme-text">See Your Website Performance Grow</h3>
            <p className="text-theme-text opacity-80">
              Our backlink strategies have helped websites increase their organic traffic by an average of 187% within 6 months. Join hundreds of satisfied clients who have improved their SEO with our service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
