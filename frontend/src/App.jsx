import About from "./pages/About";
import Home from "./pages/Home";
import {  RouterProvider, createBrowserRouter  } from "react-router";
import SatelliteDetails from "./pages/SatelliteDetails";
import TleComparision from "./pages/TLEComparison";
import Index from "./pages/Layout";
import SatelliteList from "./pages/SatelliteList";
import SatelliteTrack from "./pages/SatelliteTrack";
import ErrorPage from "./pages/EorroPage";
import MagneticReconnection from "./pages/MagneticReconnection";
import SatelliteImaging from "./pages/SatelliteImaging";
import SpacePrediction from "./pages/SpacePrediction";
import CmePrediction from "./pages/CmePrediction";
import ChangePredction from "./pages/ChangePredction";


const appRouter = createBrowserRouter([{
  path: '/',
  element: <Index />,
  children: [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/about',
      element: <About />
    },
    {
      path: '/satellitelist',
      element: <SatelliteList />
    },
    {
      path: '/TleComparision',
      element: <TleComparision />
    },
    {
      path: "/satellitedetails",
      element: <SatelliteDetails />
    },
    {
      path: "/satellitetrack",
      element: <SatelliteTrack />
    },
    {
      path: "/magenaticreconnection",
      element: <MagneticReconnection />
    },
    {
      path: "/SatelliteImaging",
      element: <SatelliteImaging />
    },
    {
      path: "/SpacePrediction",
      element: <SpacePrediction />
    },
    {
      path: "/CmePrediction",
      element: <CmePrediction />
    },
    {
      path: "/ChangePredction",
      element: <ChangePredction />
    },
    {
      path: "*",
      element: <ErrorPage />
    }
  ]
}])

function App() {

  return (
    <div>
      <RouterProvider router={appRouter}>
      </RouterProvider>
    </div>
  )
}

export default App;
