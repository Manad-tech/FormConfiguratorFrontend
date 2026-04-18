import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormBuilder from "./pages/FormBuilder";
import FormPreviewPage from "./pages/FormPreviewPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormBuilder />} />
        <Route path="/preview" element={<FormPreviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;