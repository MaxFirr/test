import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductView from './views/ProductView';
import ProductItemView from './views/ProductItemView';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductView />} />
        <Route path="/product/:id" element={<ProductItemView />} />
      </Routes>
    </BrowserRouter>
  )
}
