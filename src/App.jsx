import { BrowserRouter, Routes, Route } from "react-router";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";
import Homepage from "./pages/Homepage";
import HowTo from "./pages/HowTo";
import Examples from "./pages/Examples";
import PageNotFound from "./pages/PageNotFound";
import API from "./pages/API";
import Test from "./pages/Test";

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage/>} />
          <Route path="how-to" element={<HowTo/>} />
          <Route path="examples" element={<Examples/>} />
          <Route path="api" element={<API/>}/>
          <Route path="test" element={<Test/>}/>
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  )
}

export default App;
