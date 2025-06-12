import { FiUsers, FiZap, FiLock, FiBarChart2 } from "react-icons/fi";

import Header from "../components/About/Header.jsx";
import FeatureCard from "../components/About/FeatureCard";
import StepsToUse from "../components/About/StepsToUse";
import CallToAction from "../components/About/CallToAction";
import Footer from "../components/About/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header />

        {/* Features Grid */}
        <div className="grid md:grid-cols-2  gap-8 mb-20">
          <FeatureCard
            icon={<FiZap className="h-8 w-8 text-blue-500 mb-4" />}
            title="Lightning Fast"
            description="Our redirection happens in milliseconds, ensuring your users don't wait."
          />
          <FeatureCard
            icon={<FiBarChart2 className="h-8 w-8 text-green-500 mb-4" />}
            title="Detailed Analytics"
            description="Track clicks, referrers, and geographic data for all your shortened links.*"
          />
          <FeatureCard
            icon={<FiLock className="h-8 w-8 text-purple-500 mb-4" />}
            title="Secure Links"
            description="Every link is private — no public profile or stats are exposed."
          />
          <FeatureCard
            icon={<FiUsers className="h-8 w-8 text-orange-500 mb-4" />}
            title="User-Friendly"
            description="Simple interface that makes link shortening accessible to everyone."
          />
        </div>

        <StepsToUse />

        <CallToAction />

        <Footer />
      </div>
    </div>
  );
};

export default AboutPage;
