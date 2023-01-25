import FeatureSection from "components/landingPage/FeatureSection";
import Header from "components/landingPage/Header";
import HeroSection from "components/landingPage/HeroSection";
import MarketingSection from "components/landingPage/MarketingSection";
import UsersSection from "components/landingPage/UsersSection";

export default function LandingPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <MarketingSection />
      <FeatureSection />
      <UsersSection />
    </>
  );
}
