import React from "react";
import { CtaCard } from "./CtaCard";
import { ContactForm } from "./ContactForm";

import repairImg from "./assets/repair.jpg";
import buildImg from "./assets/build.jpg";

export const Hero = () => {
    return (
        <div className="text-[#1925aa] font-mono border-b-4 border-[#1925aa]">
            <section className="w-full max-w-[1600px] mx-auto px-6 py-12 lg:py-20">

                {/* Title and Contact Form */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-12 lg:gap-x-16 2xl:gap-x-24 items-stretch">
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
                        <div>
                            <h1 className="font-['Zalando_Sans_Expanded'] text-[clamp(0.7rem,3.8vw,2.25rem)] font-bold uppercase tracking-wider whitespace-nowrap border-b-2 border-[#1925aa] pb-2 sm:pb-3 md:pb-4 mb-4 sm:mb-6">
                                CUSTOM PC BUILDS AND REPAIR
                            </h1>
                            <p className="font-mono text-xs sm:text-sm xl:text-base uppercase tracking-wide text-[#1925aa]/90 leading-relaxed">
                                HI, I'M JACOB, A THIRD-YEAR CYBER SECURITY STUDENT AT NEWCASTLE UNIVERSITY. IF YOU'RE LOOKING FOR A NEW PC OR WANT TO UPGRADE YOUR CURRENT RIG, I BUILD, OPTIMISE AND REPAIR CUSTOM DESKTOP SETUPS TAILORED TO YOUR EXACT BUDGET AND NEEDS. DROP ME A MESSAGE TO GET A CUSTOM QUOTE, OR EXPLORE MY PREBUILT SYSTEMS!
                            </p>
                        </div>

                        <div className="flex-1 flex flex-col justify-end">
                            <ContactForm />
                        </div>
                    </div>

                    {/* Mobile Separator */}
                    <div className="border-b-2 border-[#1925aa] lg:hidden" />

                    {/* Services CTA and Products CTA */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                        <CtaCard
                            title="Pre-Built & Stock Systems"
                            description="Browse ready to order systems configured and tested by me. No bloatware, proffesionally built and sold at the price of parts."
                            imageSrc={buildImg}
                            imageLabel="[ PRODUCTS IMAGE PLACEHOLDER ]"
                            buttonText="View Current Systems"
                            buttonLink="/products"
                            className="flex-1"
                        />

                        <CtaCard
                            title="Custom Builds & Repairs"
                            description="Custom pcs tailored to any budget, free quotes plus free initial system diagnostics on all repair jobs."
                            imageSrc={repairImg}
                            imageLabel="[ SERVICES IMAGE PLACEHOLDER ]"
                            buttonText="Explore Services"
                            buttonLink="/services"
                            className="flex-1"
                        />
                    </div>

                </div>
            </section>
        </div>
    );
};