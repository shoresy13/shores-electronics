import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import API from "../../utils/axios.js";

import { ProductOverview } from "../features/products/ProductOverview.jsx";
import { ProductWarranty } from "../features/products/ProductWarranty.jsx";
import { BlankPage } from "../components/BlankPage.jsx";

export const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchProduct = async () => {
            try {
                setLoading(true);
                const { data } = await API.get(`/api/products/${id}`);
                setProduct(data);
            } catch (err) {
                console.error("Error fetching product details:", err);
                setError(err.response?.data?.message || "SYSTEM NOT FOUND OR DIRECTORY ERROR");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleBuyNow = async () => {
        try {
            setCheckoutLoading(true);
            const { data } = await API.post("/api/payments/create-checkout-session", {
                productId: product._id,
            });

            if (data.url) {
                window.location.href = data.url;
            }
        } catch (err) {
            console.error("Checkout Error:", err);
            alert(err.response?.data?.message || "CHECKOUT ERROR OR OUT OF STOCK");
        } finally {
            setCheckoutLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-[#1925aa] font-mono">
                <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 py-10 flex items-center justify-center">
                    <div className="text-xs sm:text-sm uppercase font-bold animate-pulse tracking-widest">
                        FETCHING SYSTEM SPECIFICATIONS...
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="text-[#1925aa] font-mono">
                <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 py-10 flex items-center justify-center">
                    <div className="w-full max-w-xl border border-dashed border-[#1925aa]/40 bg-[#1925aa]/2 p-6 text-center">
                        <span className="text-xs sm:text-sm font-bold tracking-widest uppercase">
                            [ 404 - INVALID PRODUCT ID ]
                        </span>
                        <p className="text-xs sm:text-sm uppercase tracking-wider text-[#1925aa]/70 mt-2">
                            {error || "THE REQUESTED SYSTEM SPECIFICATION COULD NOT BE FOUND"}
                        </p>
                        <Link
                            to="/products"
                            className="inline-block mt-4 bg-[#1925aa] text-white text-xs sm:text-sm font-bold py-2.5 px-6 uppercase tracking-widest border border-[#1925aa] hover:bg-transparent hover:text-[#1925aa] transition-all"
                        >
                            &larr; BACK TO DIRECTORY
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const isOutOfStock = product.stock <= 0 || product.inStock === false;

    return (
        <div className="text-[#1925aa] font-mono">
            <ProductOverview
                product={product}
                handleBuyNow={handleBuyNow}
                checkoutLoading={checkoutLoading}
                isOutOfStock={isOutOfStock}
            />
            <ProductWarranty />
            <BlankPage />
        </div>
    );
};