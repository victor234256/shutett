import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/app-layout";
import IndexPage from "./pages/indexPage";
import Authenticate from "./pages/authenticate";
import Redirect from "./pages/redirectLinks";
import UrlProvider from "./context";
import TrackAuthentication from "./components/trackAuthentication";
import HomePage from "./pages/homePage";
import { ThemeProvider } from "./components/theme-provider";

// Define the router configuration
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <IndexPage />,
      },
      {
        path: "/authenticate",
        element: <Authenticate />,
      },
      {
        path: "/homePage",
        element: (
          <TrackAuthentication>
            <HomePage />
          </TrackAuthentication>
        ),
      },
      {
        path: "/:id",
        element: <Redirect />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <UrlProvider>
        <RouterProvider router={router} />
      </UrlProvider>
    </ThemeProvider>
  );
}

export default App;
