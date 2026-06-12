import React from "react";
import { Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Quickin from "./Quickin";
import CategoryPage from "./CategoryPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Quickin />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
      </Routes>
      <SpeedInsights />
    </>
  );
}