"use client";

import { FormEvent, useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
  website: string; // Honeypot anti-spam field
}

interface Feedback {
  type: "success" | "error";
  message: string;
}

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  message: "",
  website: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  function updateField(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setFeedback(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFeedback({ type: "error", message: "Errore durante l'invio. Riprova." });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          website: formData.website,
        }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Errore durante l'invio. Riprova.");
      }

      setFeedback({ type: "success", message: "Messaggio inviato con successo!" });
      setFormData(INITIAL_FORM);
    } catch (error) {
      console.error("[CONTACT_FORM] Submit error", error);
      setFeedback({ type: "error", message: "Errore durante l'invio. Riprova." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={(event) => updateField("website", event.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="nome" className="mb-2 block text-sm font-semibold text-neutral-700">
          Nome
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          placeholder="Il tuo nome"
          value={formData.name}
          onChange={(event) => updateField("name", event.target.value)}
          disabled={isSubmitting}
          required
          className="w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-neutral-900 outline-none transition-all duration-200 placeholder:text-neutral-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 disabled:cursor-not-allowed disabled:bg-neutral-100"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-neutral-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="nome@email.it"
          value={formData.email}
          onChange={(event) => updateField("email", event.target.value)}
          disabled={isSubmitting}
          required
          className="w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-neutral-900 outline-none transition-all duration-200 placeholder:text-neutral-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 disabled:cursor-not-allowed disabled:bg-neutral-100"
        />
      </div>

      <div>
        <label htmlFor="messaggio" className="mb-2 block text-sm font-semibold text-neutral-700">
          Messaggio
        </label>
        <textarea
          id="messaggio"
          name="messaggio"
          rows={6}
          placeholder="Descrivi brevemente il tuo progetto"
          value={formData.message}
          onChange={(event) => updateField("message", event.target.value)}
          disabled={isSubmitting}
          required
          className="w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-neutral-900 outline-none transition-all duration-200 placeholder:text-neutral-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 disabled:cursor-not-allowed disabled:bg-neutral-100"
        />
      </div>

      {feedback && (
        <p
          className={`text-sm font-semibold ${
            feedback.type === "success" ? "text-emerald-700" : "text-red-700"
          }`}
        >
          {feedback.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-7 py-3 text-base font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Invio in corso..." : "Invia richiesta"}
      </button>
    </form>
  );
}
