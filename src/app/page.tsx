import Header from "@/components/header";
import HeroSection from "@/components/hero";
import FeaturesSection from "@/components/feature";
import CeramicsSection from "@/components/ceramic";
import Product from "@/components/product";
import Newslettersignup from "@/components/newslettersignup";
import FeatureSection from "@/components/feature2";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <CeramicsSection />
      <Product />
      <Newslettersignup />
      <FeatureSection />
      <Footer />
    </main>
  );
}