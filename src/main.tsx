import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

//components
import App from "./App.tsx";
import Registration from "pages/Registration/Registration.tsx";
import Login from "pages/Login/Login.tsx";
import UserProfile from "pages/UserProfile/UserProfile.tsx";

//context
import UserContext from "@context/UserContex.tsx";

//utils
import {
  protectedLoaderFunction,
  preventSignedLoaderFunction,
} from "utils/functions.ts";

//style
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    loader: preventSignedLoaderFunction,
    path: "/registration",
    element: <Registration />,
  },
  {
    loader: preventSignedLoaderFunction,
    path: "/login",
    element: <Login />,
  },
  {
    loader: protectedLoaderFunction,
    path: "/user-profile",
    element: <UserProfile />,
  },
]);

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContext>
        <RouterProvider router={router} />
      </UserContext>
    </QueryClientProvider>
  </StrictMode>
);
