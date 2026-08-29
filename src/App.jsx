import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import Homepage from "./pages/Homepage";
import HowTo from "./pages/HowTo";
import Examples from "./pages/Examples";
import PageNotFound from "./pages/PageNotFound";
import API from "./pages/API";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage/>} />
        <Route path="how-to" element={<HowTo/>} />
        <Route path="examples" element={<Examples/>} />
        <Route path="api" element={<API/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
