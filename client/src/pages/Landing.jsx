import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Feature";
import Footer from "../components/Footer";
import Stats from "../components/Stats";
import JourneyShowcase from "../components/JourneyShowcase";
import HowItWorks from "../components/HowItWorks";
import CTA from "../components/CTA";


function Landing() {
  return (
    <>
        <Navbar />
<Hero />
<Stats />
<JourneyShowcase />
<HowItWorks />
<Features />
<CTA />
<Footer />

    </>
  );
}

export default Landing;