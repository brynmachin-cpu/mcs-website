import React from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import MachinConsultingWebsite from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <MachinConsultingWebsite />
      <Analytics />
    </>
  </React.StrictMode>
);