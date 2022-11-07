import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import ProductViewPage from "../pages/ProductViewPage";
import StorePage from "../pages/StorePage";

const SetupRouters = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/store">
          <Route index element={<StorePage />} />
          <Route path="/store/:id" element={<ProductViewPage />} />
        </Route>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default SetupRouters;
