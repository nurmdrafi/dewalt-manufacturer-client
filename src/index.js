import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthUserContextProvider } from "./context/AuthUserContext";
import { BrowserRouter } from "react-router-dom";

// Create a client
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthUserContextProvider>
        <App />
      </AuthUserContextProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
  </QueryClientProvider>
);
