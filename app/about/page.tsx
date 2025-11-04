import AboutHero from "@/components/about/about-hero"
import AboutIntro from "@/components/about/about-intro"
import { CallToActionSection } from "@/components/call-to-action-section"
import { FooterSection } from "@/components/footer-section"
// import { SiteNav } from "@/components/site-nav"
import { WhyChooseUsSection } from "@/components/why-choose-us"

export default function AboutPage() {
  return (
    <main className="min-h-dvh bg-background overflow-x-hidden">
      {/* <SiteNav /> */}
      <AboutHero />
      <AboutIntro />
      <WhyChooseUsSection />
      <CallToActionSection />
      <FooterSection />
    </main>
  )
}
