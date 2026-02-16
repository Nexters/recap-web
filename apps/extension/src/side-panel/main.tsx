import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { SidePanel } from "./SidePanel";

import "../styles/globals.css";

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <StrictMode>
      <SidePanel />
    </StrictMode>,
  );
}
