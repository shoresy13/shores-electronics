import React from "react";
import { Link } from "react-router";
import { Card } from "../../components/Card";

export const ProductWarranty = () => {
    return (
        <section className="w-full bg-[#1925aa] text-white py-6 lg:py-10 border-t-2 border-b-2 border-[#1925aa] font-mono">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="mb-6 border-b-2 border-white pb-4 flex flex-col md:flex-row justify-between md:items-end gap-4">
                    <div>
                        <h2 className="font-['Zalando_Sans_Expanded'] text-lg sm:text-xl lg:text-2xl font-bold uppercase tracking-wider">
                            SUPPORT POLICIES
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-stretch">
                    <Card padding="p-5 md:p-6" className="bg-white text-[#1925aa] flex flex-col justify-between h-full group">
                        <div>
                            <h3 className="font-['Zalando_Sans_Expanded'] text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">
                                WARRANTY
                            </h3>
                            <div className="pt-2 mt-1 border-t border-[#1925aa]/20" />
                            <p className="text-xs uppercase tracking-wide text-[#1925aa]/90 leading-relaxed">
                                Every system is fully covered for 1 year against hardware failure, including all parts and labor required for repairs or replacements.
                            </p>
                        </div>
                        <div className="pt-3 mt-4 border-t border-[#1925aa]/20 text-[10px] tracking-widest uppercase">
                            <Link
                                to="/terms-of-service"
                                className="font-bold underline text-[#1925aa] hover:opacity-70 transition-opacity"
                            >
                                VIEW WARRANTY POLICY &rarr;
                            </Link>
                        </div>
                    </Card>

                    <Card padding="p-5 md:p-6" className="bg-white text-[#1925aa] flex flex-col justify-between h-full group">
                        <div>
                            <h3 className="font-['Zalando_Sans_Expanded'] text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">
                                REFUNDS
                            </h3>
                            <div className="pt-2 mt-1 border-t border-[#1925aa]/20" />
                            <p className="text-xs uppercase tracking-wide text-[#1925aa]/90 leading-relaxed">
                                Not completely satisfied? Return your machine within 30 days for a full refund, no questions asked. Contact me at{" "}
                                <a
                                    href="mailto:contact@shoreselectronics.co.uk"
                                    className="font-bold underline hover:opacity-70 transition-opacity"
                                >
                                    contact@shoreselectronics.co.uk
                                </a>.
                            </p>
                        </div>
                        <div className="pt-3 mt-4 border-t border-[#1925aa]/20 text-[10px] tracking-widest uppercase">
                            <Link
                                to="/terms-of-service"
                                className="font-bold underline text-[#1925aa] hover:opacity-70 transition-opacity"
                            >
                                VIEW REFUND POLICY &rarr;
                            </Link>
                        </div>
                    </Card>

                    <Card padding="p-5 md:p-6" className="bg-white text-[#1925aa] flex flex-col justify-between h-full group">
                        <div>
                            <h3 className="font-['Zalando_Sans_Expanded'] text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">
                                SUPPORT
                            </h3>
                            <div className="pt-2 mt-1 border-t border-[#1925aa]/20" />
                            <p className="text-xs uppercase tracking-wide text-[#1925aa]/90 leading-relaxed">
                                Drop off your machine directly with me anytime for free, priority diagnostics. Upgrades are always provided with zero labor charge, you only pay for the cost of parts.
                            </p>
                        </div>
                        <div className="pt-3 mt-4 border-t border-[#1925aa]/20 text-[10px] tracking-widest uppercase">
                            <Link
                                to="/contact"
                                className="font-bold underline text-[#1925aa] hover:opacity-70 transition-opacity"
                            >
                                BOOK DIAGNOSTICS &rarr;
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
};