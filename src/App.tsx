import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormBuilder from "./pages/FormBuilder";
import FormPreviewPage from "./pages/FormPreviewPage";
import ResponsesPage from "./pages/ResponsesPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormBuilder />} />
        <Route path="/preview" element={<FormPreviewPage />} />
        <Route path="/responses" element={<ResponsesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;