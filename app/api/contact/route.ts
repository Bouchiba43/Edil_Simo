import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
  website?: string; // Honeypot anti-spam field
}

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";
const CONTACT_RECIPIENT = "Ousa.bouchiba3@hotmail.it";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeText(value: string): string {
  return value.replace(/\r\n/g, "\n").trim();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    const name = sanitizeText(body.name ?? "");
    const email = sanitizeText(body.email ?? "");
    const message = sanitizeText(body.message ?? "");
    const website = sanitizeText(body.website ?? "");

    if (website.length > 0) {
      return NextResponse.json({ message: "Richiesta non valida." }, { status: 400 });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ message: "Compila tutti i campi obbligatori." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ message: "Inserisci un indirizzo email valido." }, { status: 400 });
    }

    if (name.length > 100 || message.length < 10 || message.length > 4000) {
      return NextResponse.json({ message: "Contenuto del messaggio non valido." }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL;
    const senderName =
      process.env.BREVO_SENDER_NAME ?? "Edil simo di bouchiba ousama - Sito Web";

    if (!apiKey || !senderEmail) {
      console.error("[CONTACT_API] Missing Brevo env vars (BREVO_API_KEY or BREVO_SENDER_EMAIL)");
      return NextResponse.json(
        { message: "Configurazione server non completata." },
        { status: 500 },
      );
    }

    const subject = `Nuovo messaggio dal sito - ${name}`;
    const textContent = [
      "Nuovo messaggio dal form contatti:",
      `Nome: ${name}`,
      `Email: ${email}`,
      "",
      "Messaggio:",
      message,
    ].join("\n");

    const htmlContent = `
      <h2>Nuovo messaggio dal form contatti</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Messaggio:</strong></p>
      <p>${message.replace(/\n/g, "<br />")}</p>
    `;

    const brevoResponse = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          email: senderEmail,
          name: senderName,
        },
        to: [
          {
            email: CONTACT_RECIPIENT,
            name: "Bouchiba Ousama",
          },
        ],
        replyTo: {
          email,
          name,
        },
        subject,
        textContent,
        htmlContent,
      }),
    });

    if (!brevoResponse.ok) {
      const brevoError = await brevoResponse.text();
      console.error("[CONTACT_API] Brevo error", {
        status: brevoResponse.status,
        body: brevoError,
      });

      return NextResponse.json(
        { message: "Errore durante l'invio. Riprova." },
        { status: 500 },
      );
    }

    console.log("[CONTACT_API] Email sent successfully");

    return NextResponse.json(
      { message: "Messaggio inviato con successo!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("[CONTACT_API] Unexpected error", error);
    return NextResponse.json(
      { message: "Errore durante l'invio. Riprova." },
      { status: 500 },
    );
  }
}
