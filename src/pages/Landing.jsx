import Header from "@/components/Landing/Header";
import Hero from "@/components/Landing/Hero";
import TrustedPartners from "@/components/Landing/TrustedPartners";
import HowItWorks from "@/components/Landing/HowItWorks";
import Plans from "@/components/Landing/Plans";
import FAQ from "@/components/Landing/FAQ";
import Footer from "@/components/Landing/Footer";

const Landing = () => {
  return (
    <div className="flex flex-col min-[900px]:px-[6rem] w-[100vw] overflow-x-hidden px-[20px]">
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
