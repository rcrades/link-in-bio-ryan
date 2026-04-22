import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { App } from "./App";
import "./guest-brief.css";

const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined;
if (!convexUrl) {
  throw new Error("VITE_CONVEX_URL is not set. Add it to .env.local.");
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
}

const convex = new ConvexReactClient(convexUrl);

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <ConvexAuthProvider client={convex}>
      <App />
    </ConvexAuthProvider>
  </StrictMode>,
);
