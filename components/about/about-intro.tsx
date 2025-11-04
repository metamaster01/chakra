"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "../scroll-reveal";

export default function AboutIntro() {
  return (
    <section className="relative bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <motion.h2
          className="text-center text-balance text-3xl md:text-4xl text-primary font-bold"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Discover Balance. Embrace Energy. Awaken Your True Self.
        </motion.h2>

        <motion.p
          className="mt-6 text-center text-lg leading-relaxed text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          At Chakra Healing Center, we believe true wellness begins with
          balance—of mind, body, and spirit. Inspired by the ancient wisdom of
          chakras, our mission is to help you realign your inner energy and
          unlock the harmony you deserve.
        </motion.p>

        <motion.p
          className="mt-4 text-center text-lg leading-relaxed text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          We offer thoughtfully curated products, practices, and guidance
          designed to awaken your energy centers and support you on your healing
          journey. Whether you are new to chakra healing or deeply connected to
          spiritual practices, our goal is to bring clarity, peace, and vitality
          to everyday life.
        </motion.p>

        <motion.h3
          className="mt-10 text-center text-3xl md:text-4xl font-bold"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Our story
        </motion.h3>

        <motion.p
          className="mt-4 text-center text-lg leading-relaxed text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          The inspiration behind Chakra Healing Center began with a simple yet
          profound belief: healing starts from within. Recognizing how energy
          imbalances affect our emotions, health, and daily lives, we set out to
          create a space where ancient knowledge meets modern living—blossoming
          into a community that helps thousands find peace, positivity, and
          renewed energy.
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="mt-12 grid md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <ScrollReveal>
              <h3 className="font-serif font-normal text-3xl md:text-4xl mb-2">
                Our Mission
              </h3>
            </ScrollReveal>
            <p className="text-gray-600 mb-6">
              Guided by peace, rooted in healing.
            </p>
          </div>

          <div className="space-y-5">
            {[
              {
                lead: "Make peace and healing",
                rest: " accessible to everyone.",
              },
              {
                lead: "Provide personalized therapies",
                rest: " that restore clarity and calm.",
              },
              {
                lead: "Guide every person",
                rest: " toward Sukoon (tranquility) and Shanti (peace).",
              },
            ].map((item, idx) => (
              <ScrollReveal
                key={idx}
                delay={0.05 * idx}
                className="flex items-start gap-3"
              >
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
            <p className="text-gray-600 mb-6">
              A future where inner peace is a way of life.
            </p>
            <a
              href="#"
              className="btn-shine inline-flex items-center rounded-full bg-[color:var(--color-secondary)] text-[color:var(--color-secondary-foreground)] px-6 py-2.5 text-sm font-medium transition-all hover:scale-[1.02] hover:bg-[color:var(--color-secondary)]/90"
            >
              Learn more about us
            </a>
          </div>
          <div>
            <p className="text-gray-800 leading-relaxed">
              We envision a community where stress no longer dominates daily
              life — a space where healing, growth, and inner harmony are part
              of everyday living.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
