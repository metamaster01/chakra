"use client"

import dynamic from "next/dynamic"
const HeroScroll = dynamic(() => import('@/components/HeroScroll'))
import { TestimonialSection } from "@/components/testimonial-section"
import { CallToActionSection } from "@/components/call-to-action-section"
import { FooterSection } from "@/components/footer-section"
import { AboutSection } from "@/components/about-section"
import { WhyChooseUsSection } from "@/components/why-choose-us"
import FeaturedProduct from "@/components/ProductList"
import FeaturedServices from "@/components/ServiceList"
import { GallerySection } from "@/components/GallerySection"
import { VideoSection } from "@/components/VideoSection"
// ✅ Server Component
// import HeroScrollClient from '@/components/HeroScrollClient'

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <HeroScroll />
      <AboutSection />
      <WhyChooseUsSection />
      <FeaturedProduct />
      <FeaturedServices />
      <GallerySection />
      <VideoSection />
      <TestimonialSection />
      <CallToActionSection />
      <FooterSection />
      {/* <HeroScrollClient /> */}
    </main>
  )
}
