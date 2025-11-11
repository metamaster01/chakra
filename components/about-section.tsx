"use client"
import { ScrollReveal } from "./scroll-reveal"
import { ShinyText } from "./shiny-text"
import VariableProximityText from "./variable-proximity-text"

export function AboutSection() {
  return (
    <section className="relative bg-white text-gray-900 px-8 md:px-14 pt-16 pb-10 md:pt-24 md:pb-16">
      <div className="max-w-6xl mx-auto">
        {/* Decorative faint curved lines behind headline */}
        <div className="relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
            <svg className="w-[800px] max-w-[90%] h-auto text-gray-300" viewBox="0 0 600 300" fill="none">
              <g stroke="currentColor" strokeWidth="0.8">
                <path d="M0 260 C150 210 450 210 600 260" />
                <path d="M0 235 C150 195 450 195 600 235" />
                <path d="M0 210 C150 180 450 180 600 210" />
                <path d="M0 185 C150 165 450 165 600 185" />
                <path d="M0 160 C150 150 450 150 600 160" />
              </g>
            </svg>
          </div>

          <ScrollReveal className="relative z-10 text-center mb-8 ">
            <p className="text-sm tracking-wide text-gray-600 mb-2">About Chakra Healing Center</p>
            <VariableProximityText
              as="h2"
              className="font-fraunces font-semibold text-2xl md:text-4xl leading-[1.35] text-balance mx-auto max-w-7xl"
              text={
                "Founded in 2023 in Gurgaon, Chakra Healing Center was created as a sanctuary for people seeking peace in today’s fast‑paced world. We combine ancient healing wisdom with modern therapies to help you release stress, realign your energy, and rediscover balance."
              }
            />
          </ScrollReveal>
        </div>

        {/* Mission + bullets */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <ScrollReveal>
              <h3 className="font-serif font-normal text-3xl md:text-4xl mb-2">
                Our Mission
              </h3>
            </ScrollReveal>
            <p className="text-gray-600 mb-6">Guided by peace, rooted in healing.</p>
          </div>

          <div className="space-y-5">
            {[
              { lead: "Make peace and healing", rest: " accessible to everyone." },
              { lead: "Provide personalized therapies", rest: " that restore clarity and calm." },
              { lead: "Guide every person", rest: " toward Sukoon (tranquility) and Shanti (peace)." },
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={0.05 * idx} className="flex items-start gap-3">
                {/* leaf icon */}
                <svg
                  className="mt-1 w-5 h-5 text-green-600 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 2c-1.7 3.2-4.4 5.3-8 6 2.6 1.2 5.3 1.1 8 0 2.7 1.1 5.4 1.2 8 0-3.6-.7-6.3-2.8-8-6zm-1 9c-3 0-5 2-5 5 3 0 5-2 5-5zm2 0c0 3 2 5 5 5 0-3-2-5-5-5z" />
                </svg>
                <div className="flex-1">
                  <p className="text-gray-800">
                    <span className="highlight">{item.lead}</span>
                    {item.rest}
                  </p>
                  <div className="mt-3 h-px w-full bg-gray-200" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Vision row */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div>
            <ScrollReveal>
              <h3 className="font-serif font-normal text-3xl md:text-4xl mb-2">
                Our Vision
              </h3>
            </ScrollReveal>
            <p className="text-gray-600 mb-6">A future where inner peace is a way of life.</p>
            <a
              href="#"
              className="btn-shine inline-flex items-center rounded-full bg-[color:var(--color-secondary)] text-[color:var(--color-secondary-foreground)] px-6 py-2.5 text-sm font-medium transition-all hover:scale-[1.02] hover:bg-[color:var(--color-secondary)]/90"
            >
              Learn more about us
            </a>
          </div>
          <div>
            <p className="text-gray-800 leading-relaxed">
              We envision a community where stress no longer dominates daily life — a space where healing, growth, and
              inner harmony are part of everyday living.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
