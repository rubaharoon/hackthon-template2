import HeroSection from "@/components/hero";
import FeaturesSection from "@/components/feature";
import Ceramic from "./ceramic/page";
import Product from "@/components/popularproduct";
import Newslettersignup from "@/components/newslettersignup";
import FeatureSection from "@/components/feature2";

export default function Home() {
  

  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <Ceramic />
      <Product />
      <Newslettersignup />
      <FeatureSection />
    </main>
  );
}