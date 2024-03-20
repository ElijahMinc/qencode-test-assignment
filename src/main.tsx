import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { AuthContextProvider } from "./context/auth.context.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
