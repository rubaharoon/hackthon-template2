import dynamic from "next/dynamic";
import HeroSection from "@/components/hero";
import FeaturesSection from "@/components/feature";

// Dynamically import components to reduce initial bundle size
const Ceramic = dynamic(() => import("./ceramic/page"));
const Product = dynamic(() => import("@/components/popularproduct"));
const Newslettersignup = dynamic(() => import("@/components/newslettersignup"));
const FeatureSection2 = dynamic(() => import("@/components/feature2"));

// Group related components for better readability
const MainSections = () => (
  <>
    <HeroSection />
    <FeaturesSection />
    <Ceramic />
    <Product />
    <Newslettersignup />
    <FeatureSection2 />
  </>
);

export default function Home() {
  return (
    <main>
      <MainSections />
    </main>
  );
}