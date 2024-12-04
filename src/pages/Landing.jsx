import Header from "@/components/Landing/Header";
import Hero from "@/components/Landing/Hero";
import TrustedPartners from "@/components/Landing/TrustedPartners";
import HowItWorks from "@/components/Landing/HowItWorks";
import Plans from "@/components/Landing/Plans";
import FAQ from "@/components/Landing/FAQ";
import Footer from "@/components/Landing/Footer";

const Landing = () => {
  return (
    <div className="">
      <Header />
      <Hero />
      <TrustedPartners />
      <HowItWorks />
      <Plans />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Landing;
