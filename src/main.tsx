import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

//components
import App from "./App.tsx";
import Registration from "pages/Registration/Registration.tsx";
import Login from "pages/Login/Login.tsx";

//style
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/user-profile",
    element: <p>User Page</p>,
  },
]);

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
