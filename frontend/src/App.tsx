import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import History from "./pages/History";
import Home from "./pages/Home";
import Navbar from "./components/Navbar"

const App: React.FC =()=> {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route index element={<Home/>}/>
      <Route
        path="/home"
        element={
          <>
            <SignedIn>
              <Home/>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn/>
            </SignedOut>
          </>
        }
      />
      <Route path="/history" element={<History/>}/>

      </>
    )
  )
    return(
      <>
        <Navbar/>
        <RouterProvider router={router}/>
      </>
    )

}

export default App;