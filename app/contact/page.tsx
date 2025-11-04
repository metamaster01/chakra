import { Hero } from "@/components/contact-hero"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import { FooterSection } from "@/components/footer-section"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Hero />
      <div className="container mx-auto px-4 md:px-24 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
      <FooterSection />
    </main>
  )
}
