import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "./ThemeContext";
import { AuthProvider } from "./AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeProvider>
);

reportWebVitals();
