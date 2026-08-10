import React from "react";
import { Link } from "react-router";

export const ProductDetailActions = ({
                                         handleBuyNow,
                                         checkoutLoading,
                                         isOutOfStock,
                                         product,
                                     }) => {
    const stockCount = Number(product?.stock);
    const hasNoStock = isNaN(stockCount) || stockCount <= 0;

    const disableCheckout =
        checkoutLoading ||
        isOutOfStock ||
        hasNoStock ||
        product?.inStock === false;

    return (
        <div className="pt-3 space-y-3 shrink-0">
            <div className="space-y-1.5">
                <button
                    onClick={(e) => {
                        if (disableCheckout) {
                            e.preventDefault();
                            return;
                        }
                        handleBuyNow(e);
                    }}
                    disabled={disableCheckout}
                    className={`block w-full text-center font-mono text-[11px] sm:text-xs font-bold py-2.5 uppercase tracking-wider sm:tracking-widest border transition-all ${
                        disableCheckout
                            ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed opacity-60"
                            : "bg-[#1925aa] text-white border-[#1925aa] hover:bg-transparent hover:text-[#1925aa] cursor-pointer"
                    }`}
                >
                    {checkoutLoading
                        ? "INITIALISING CHECKOUT..."
                        : disableCheckout
                            ? "[ OUT OF STOCK ]"
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