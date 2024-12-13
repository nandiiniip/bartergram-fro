// import { StrictMode } from 'react'
import reactDom from "react-dom/client";
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const root = reactDom.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
