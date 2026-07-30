import React from "react";
import { CtaCard } from "./CtaCard";
import { ContactForm } from "./ContactForm";

export const Hero = () => {
    return (
        <div className="text-[#1925aa] font-mono selection:bg-[#1925aa] selection:text-white">
            <section className="px-6 py-12 md:py-20 max-w-7xl mx-auto min-h-[calc(100vh-80px)] flex flex-col justify-center">

                {/* Title and Contact Form */}
                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-y-12 gap-x-12 lg:gap-x-16 items-stretch">
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
                        <div>
                            <h1 className="text-[1.25rem] sm:text-2xl md:text-4xl font-bold uppercase tracking-tight sm:tracking-wider leading-tight mb-4 border-b-2 border-[#1925aa] pb-4 whitespace-nowrap">
                                Custom PC builds and Repair
                            </h1>
                            <p className="text-sm md:text-base uppercase tracking-wide text-[#1925aa]/90 leading-relaxed">
                                HI, I'M JACOB, A THIRD-YEAR CYBER SECURITY STUDENT AT NEWCASTLE UNIVERSITY. IF YOU'RE LOOKING FOR A NEW PC OR WANT TO UPGRADE YOUR CURRENT RIG, I BUILD, OPTIMISE AND REPAIR CUSTOM DESKTOP SETUPS TAILORED TO YOUR EXACT BUDGET AND NEEDS. DROP ME A MESSAGE TO GET A CUSTOM QUOTE, OR EXPLORE MY PREBUILT SYSTEMS!
                            </p>
                        </div>

                        <div className="flex-1 flex flex-col justify-end">
                            <ContactForm />
                        </div>
                    </div>

                    {/* Services CTA and Products CTA */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                        <CtaCard
                            title="Custom Builds & Repairs "
                            description="Custom pcs tailored to any budget, plus free initial system diagnostics on all repair jobs."
                            imageLabel="[ SERVICES IMAGE PLACEHOLDER ]"
                            buttonText="Explore Services"
                            buttonLink="/services"
                            className="flex-1"
                        />

                        <CtaCard
                            title="Pre-Built & Stock Systems"
                            description="Browse ready to order systems configured and tested by me. No bloatware with a one year warranty."
                            imageLabel="[ PRODUCTS IMAGE PLACEHOLDER ]"
                            buttonText="View Current Systems"
                            buttonLink="/products"
                            className="flex-1"
                        />
                    </div>

                </div>
            </section>
        </div>
    );
};