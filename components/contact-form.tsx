"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { createBrowserClient } from "@supabase/ssr";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const { error: insertError } = await supabase
        .from("contact")
        .insert([formData]);

      if (insertError) throw insertError;

      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
      console.error("[v0] Contact form error:", err);
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 px-0 md:px-24"
      variants={formVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.h2
        variants={fieldVariants}
        className="text-2xl md:text-3xl font-bold text-foreground"
      >
        Send us a Message
      </motion.h2>

      {/* Name Field */}
      <motion.div variants={fieldVariants} className="space-y-2">
        <label className="text-sm font-medium text-foreground/80">
          Your Name
        </label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
          className="bg-background border-border/50 text-foreground placeholder:text-foreground/50"
        />
      </motion.div>

      {/* Email Field */}
      <motion.div variants={fieldVariants} className="space-y-2">
        <label className="text-sm font-medium text-foreground/80">
          Email Address
        </label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          required
          className="bg-background border-border/50 text-foreground placeholder:text-foreground/50"
        />
      </motion.div>

      {/* Phone Field */}
      <motion.div variants={fieldVariants} className="space-y-2">
        <label className="text-sm font-medium text-foreground/80">
          Phone Number (Optional)
        </label>
        <Input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (555) 123-4567"
          className="bg-background border-border/50 text-foreground placeholder:text-foreground/50"
        />
      </motion.div>

      {/* Message Field */}
      <motion.div variants={fieldVariants} className="space-y-2">
        <label className="text-sm font-medium text-foreground/80">
          Message
        </label>
        <Textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us how we can help you..."
          required
          rows={5}
          className="bg-background border-border/50 text-foreground placeholder:text-foreground/50 resize-none"
        />
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* Success Message */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-700 dark:text-green-400 text-sm flex items-center gap-2"
        >
          <CheckCircle className="w-4 h-4" />
          Message sent successfully! We&apos;ll get back to you soon.
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.div variants={fieldVariants} className="pt-4">
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Leave us a Message
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.form>
  );
}
