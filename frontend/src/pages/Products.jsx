import React from "react";
import { ProductGrid } from "../features/products/ProductGrid";
import { BlankPage } from "../components/BlankPage.jsx";

export const Products = () => {
    return (
        <div>
            <ProductGrid />
            <BlankPage />
        </div>
    );
};