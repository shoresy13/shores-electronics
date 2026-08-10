import React from "react";
import { Link } from "react-router";

export const ProductDetailActions = ({
                                         handleBuyNow,
                                         checkoutLoading,
                                         isOutOfStock,
                                     }) => {
    return (
        <div className="pt-3 space-y-3 shrink-0">
            <div className="space-y-1.5">
                <button
                    onClick={handleBuyNow}
                    disabled={checkoutLoading || isOutOfStock}
                    className={`block w-full text-center font-mono text-[11px] sm:text-xs font-bold py-2.5 uppercase tracking-wider sm:tracking-widest border transition-all ${
                        isOutOfStock || checkoutLoading
                            ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
                            : "bg-[#1925aa] text-white border-[#1925aa] hover:bg-transparent hover:text-[#1925aa] cursor-pointer"
                    }`}
                >
                    {checkoutLoading
                        ? "INITIALISING CHECKOUT..."
                        : isOutOfStock
                            ? "OUT OF STOCK"
                            : "CHECKOUT WITH STRIPE"}
                </button>

                <Link
                    to="/products"
                    className="block w-full text-center bg-transparent text-[#1925aa] font-mono text-[11px] sm:text-xs font-bold py-0.5 uppercase tracking-wider no-underline hover:underline transition-all"
                >
                    RETURN TO PRODUCTS
                </Link>
            </div>
        </div>
    );
};