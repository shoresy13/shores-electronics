import React from "react";
import { Link } from "react-router";

export const ProductDetailActions = ({
                                         handleBuyNow,
                                         checkoutLoading,
                                         product,
                                     }) => {
    const stockCount = Number(product?.countInStock ?? product?.stock ?? 0);
    const isOutOfStock = isNaN(stockCount) || stockCount <= 0;
    const disableCheckout = checkoutLoading || isOutOfStock;

    const ebayLink =
        product?.ebayUrl && product.ebayUrl.trim() !== ""
            ? product.ebayUrl
            : `https://www.ebay.co.uk/sch/i.html?_nkw=${encodeURIComponent(
                product?.name || "Shores Electronics PC"
            )}`;

    return (
        <div className="pt-3 space-y-2 shrink-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                    type="button"
                    onClick={(e) => {
                        if (disableCheckout) {
                            e.preventDefault();
                            return;
                        }
                        handleBuyNow(e);
                    }}
                    disabled={disableCheckout}
                    className={`w-full text-center font-mono text-[11px] sm:text-xs font-bold py-2.5 px-2 uppercase tracking-wider sm:tracking-widest border transition-all ${
                        disableCheckout
                            ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed opacity-60 pointer-events-none"
                            : "bg-[#1925aa] text-white border-[#1925aa] hover:bg-white hover:text-[#1925aa] cursor-pointer"
                    }`}
                >
                    {checkoutLoading
                        ? "INITIALISING..."
                        : isOutOfStock
                            ? "[ OUT OF STOCK ]"
                            : "CHECKOUT WITH STRIPE"}
                </button>

                <a
                    href={ebayLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full text-center font-mono text-[11px] sm:text-xs font-bold py-2.5 px-2 uppercase tracking-wider sm:tracking-widest border border-[#1925aa] bg-[#1925aa] text-white hover:bg-white hover:text-[#1925aa] transition-all no-underline cursor-pointer group"
                >
                    <span>VIEW ON EBAY</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3.5 h-3.5 ml-0.5 opacity-90 group-hover:opacity-100 transition-opacity"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                    </svg>
                </a>
            </div>

            <Link
                to="/products"
                className="block w-full text-center bg-transparent text-[#1925aa] font-mono text-[11px] sm:text-xs font-bold pt-1 uppercase tracking-wider no-underline hover:underline transition-all"
            >
                RETURN TO PRODUCTS
            </Link>
        </div>
    );
};