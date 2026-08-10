import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import API from "../../utils/axios.js";
import { Card } from "../components/Card";

export const OrderConfirmation = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchOrder = async () => {
            if (!sessionId) {
                setLoading(false);
                return;
            }

            try {
                const { data } = await API.get(`/api/payments/session/${sessionId}`);
                setOrderDetails(data);
            } catch (err) {
                console.error("Error retrieving order confirmation:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [sessionId]);

    if (loading) {
        return (
            <main className="min-h-[60vh] bg-white text-[#1925aa] font-mono py-20 px-6 flex items-center justify-center">
                <div className="text-xs uppercase font-bold tracking-widest animate-pulse text-center">
                    VERIFYING PAYMENT & RETRIEVING ORDER DATA...
                </div>
            </main>
        );
    }

    if (error || !sessionId) {
        return (
            <main className="min-h-[60vh] bg-white text-[#1925aa] font-mono py-16 px-6">
                <div className="max-w-2xl mx-auto text-center space-y-6 border border-red-600 p-8">
                    <span className="text-xs font-bold tracking-widest text-red-600 uppercase">
                        [ SESSION UNVERIFIED ]
                    </span>
                    <h1 className="font-['Zalando_Sans_Expanded'] text-lg sm:text-xl font-bold uppercase">
                        ORDER REFERENCE NOT FOUND
                    </h1>
                    <p className="text-xs uppercase leading-relaxed text-[#1925aa]/80">
                        WE COULD NOT RETRIEVE VALID ORDER DETAILS FOR THIS SESSION. IF YOUR PAYMENT WAS PROCESSED, PLEASE CHECK YOUR EMAIL OR CONTACT SUPPORT.
                    </p>
                    <Link
                        to="/products"
                        className="inline-block bg-[#1925aa] text-white text-xs font-bold py-2.5 px-6 uppercase tracking-widest border border-[#1925aa] hover:bg-transparent hover:text-[#1925aa] transition-all"
                    >
                        RETURN TO DIRECTORY
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-white text-[#1925aa] font-mono py-12 lg:py-16 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto space-y-8">

                {/* Banner */}
                <div className="bg-[#1925aa] text-white p-6 border-2 border-[#1925aa] space-y-3">
                    <h1 className="font-['Zalando_Sans_Expanded'] text-xl sm:text-2xl font-bold uppercase tracking-wider">
                        THANK YOU FOR YOUR ORDER
                    </h1>
                    <p className="text-xs uppercase tracking-wide text-white/90 leading-relaxed">
                        YOUR ORDER HAS BEEN RECEIVED AND IS NOW BEING PREPARED. PLEASE CHECK YOUR INBOX FOR MORE INFORMATION AND RECEIPT DETAILS.
                    </p>
                </div>

                {/* Order Summary & Delivery Details */}
                <Card padding="p-6" className="bg-white border border-[#1925aa] text-[#1925aa] space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-[#1925aa]/20 gap-2">
                        <div>
                            <span className="text-[10px] opacity-60 uppercase block">ORDER REFERENCE</span>
                            <span className="font-bold text-xs sm:text-sm tracking-wider uppercase">
                                #{orderDetails?.orderId || sessionId.slice(-10).toUpperCase()}
                            </span>
                        </div>
                        <div className="sm:text-right">
                            <span className="text-[10px] opacity-60 uppercase block">STATUS</span>
                            <span className="text-xs font-bold bg-[#1925aa]/10 px-2.5 py-0.5 text-[#1925aa] uppercase">
                                PAID & PROCESSING
                            </span>
                        </div>
                    </div>

                    {/* Customer & Shipping Type Details */}
                    <div className="pb-4 border-b border-[#1925aa]/20 space-y-3">
                        <h2 className="font-['Zalando_Sans_Expanded'] text-xs font-bold uppercase tracking-wider">
                            FULFILLMENT & RECIPIENT
                        </h2>

                        {/* Selected Shipping Option Badge */}
                        <div className="bg-[#1925aa]/5 border border-[#1925aa]/30 p-3 text-xs uppercase space-y-1">
                            <span className="text-[10px] opacity-60 block font-bold">SELECTED SHIPPING METHOD:</span>
                            <span className="font-bold block text-xs">
                                {orderDetails?.shippingMethodName || (orderDetails?.amountShipping === 0 ? "FREE LOCAL COLLECTION" : "STANDARD SHIPPING")}
                            </span>
                        </div>

                        <div className="text-xs uppercase space-y-1 text-[#1925aa]/90">
                            {orderDetails?.customerName ? (
                                <p className="font-bold">{orderDetails.customerName}</p>
                            ) : (
                                <p className="font-bold opacity-60">[ NAME NOT SPECIFIED ]</p>
                            )}

                            {orderDetails?.customerEmail && (
                                <p className="opacity-80">{orderDetails.customerEmail}</p>
                            )}

                            {orderDetails?.shippingAddress?.line1 ? (
                                <div className="opacity-80 pt-1 leading-relaxed">
                                    <p>{orderDetails.shippingAddress.line1}</p>
                                    {orderDetails.shippingAddress.line2 && <p>{orderDetails.shippingAddress.line2}</p>}
                                    <p>
                                        {[
                                            orderDetails.shippingAddress.city,
                                            orderDetails.shippingAddress.postal_code,
                                            orderDetails.shippingAddress.country
                                        ].filter(Boolean).join(", ")}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-[10px] opacity-60 pt-1">
                                    // LOCAL COLLECTION POINT: NEWCASTLE UPON TYNE. WE WILL EMAIL YOU PICKUP INSTRUCTIONS.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-4">
                        <h2 className="font-['Zalando_Sans_Expanded'] text-xs font-bold uppercase tracking-wider">
                            ORDER DETAILS
                        </h2>

                        {orderDetails?.items?.map((item, index) => (
                            <div key={index} className="flex justify-between items-center text-xs pb-3 border-b border-[#1925aa]/10 gap-4">
                                <div className="truncate">
                                    <span className="font-bold uppercase block truncate">{item.name}</span>
                                    <span className="text-[10px] opacity-60 uppercase">QTY: {item.quantity || 1}</span>
                                </div>
                                <span className="font-bold shrink-0">£{item.price?.toFixed(2)}</span>
                            </div>
                        ))}

                        {/* Financial Totals */}
                        <div className="pt-2 space-y-1.5 text-xs">
                            <div className="flex justify-between opacity-80">
                                <span>SUBTOTAL:</span>
                                <span>£{orderDetails?.amountSubtotal?.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between opacity-80">
                                <span>SHIPPING / FULFILLMENT:</span>
                                <span>{orderDetails?.amountShipping ? `£${orderDetails.amountShipping.toFixed(2)}` : "FREE"}</span>
                            </div>
                            <div className="flex justify-between font-bold text-sm pt-2 border-t border-[#1925aa] text-[#1925aa]">
                                <span>TOTAL PAID:</span>
                                <span>£{orderDetails?.amountTotal?.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Return button */}
                <div className="flex justify-between items-center">
                    <Link
                        to="/products"
                        className="bg-[#1925aa] text-white font-mono text-xs font-bold py-3 px-6 uppercase tracking-widest border border-[#1925aa] hover:bg-transparent hover:text-[#1925aa] transition-all"
                    >
                        &larr; RETURN TO PRODUCTS
                    </Link>
                </div>

            </div>
        </main>
    );
};