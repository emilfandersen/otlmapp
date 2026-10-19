
"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export default function Contact() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("Message sent!");
        form.reset();
      } else {
        setStatus("Error sending message.");
      }
    } catch {
      setStatus("Error sending message.");
    }
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>Contact</h1>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" required />
        <br />
        <input name="email" type="email" placeholder="Email" required />
        <br />
        <textarea name="message" placeholder="Message" required />
        <br />
        <button type="submit">Send</button>
      </form>

      <p role="status">{status}</p>
    </main>
  );
}
