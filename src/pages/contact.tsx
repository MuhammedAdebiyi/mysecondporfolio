import { useState } from "react";
import Head from "next/head";
import Container from "@/components/Container";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch (err) {
      setStatus("Failed to send message.");
    }
  };

  return (
    <Container title="Contact" description="Get in touch with me">
      <Head>
        <title>Contact</title>
      </Head>
      <div className="mx-auto max-w-3xl py-24 px-6 sm:px-0">
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Let’s Connect
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          Have a question or want to work together? Fill out the form below and I’ll get back to you.
        </p>

       <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-background/50 backdrop-blur-md rounded-lg p-8 shadow-lg"
        >
        <div className="flex flex-col sm:flex-row gap-4">
            <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="flex-1 border border-input rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
            <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="flex-1 border border-input rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
        </div>

        <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            className="border border-input rounded-md px-4 py-3 h-40 text-foreground placeholder:text-muted-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
        />

        <button
            type="submit"
            className="bg-primary text-primary-foreground rounded-lg px-6 py-3 font-medium text-lg hover:bg-primary/80 transition"
        >
            Send Message
        </button>

        {status && (
            <p className="mt-2 text-sm text-muted-foreground">{status}</p>
        )}
        </form>

        <div className="mt-16 flex flex-col sm:flex-row justify-between gap-8 text-muted-foreground">
          <div>
            <h2 className="font-semibold mb-1">Email</h2>
            <p>muhammedadebiyi2006@gmail.com</p>
          </div>
          <div>
            <h2 className="font-semibold mb-1">Phone</h2>
            <p>+234 906 014 6861</p>
          </div>
          <div>
            <h2 className="font-semibold mb-1">Location</h2>
            <p>Lagos, Nigeria</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
