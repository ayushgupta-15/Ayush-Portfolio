"use client";

import { useState } from "react";
import Icon from "./Icon";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };
  return (
    <button type="button" className="btn btn-primary" onClick={copy} aria-live="polite">
      <Icon name="mail" /> {copied ? "Copied to clipboard" : "Copy email address"}
    </button>
  );
}
