import React from "react";
import {
  Error404Page,
  AboutPage,
  PdfViewerPage,
  HomePage,
  TestGraphPage,
} from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components";
import "./styles/main.scss";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pdfviewer/" element={<PdfViewerPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/testGraph" element={<TestGraphPage />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </Router>
  );
}

export default App;
