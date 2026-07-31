import React from "react";

export default function TermsOfService() {
    const lastUpdated = "July 31, 2026";
    const contactEmail = "contact@shoreselectronics.co.uk";
    const siteUrl = "https://shoreselectronics.co.uk/";

    return (
        <main className="min-h-screen bg-[#1925aa] text-white font-mono text-xs md:text-sm uppercase tracking-wider py-16 px-6 select-none">
            <div className="max-w-4xl mx-auto space-y-10">
                {/* Header */}
                <header className="border-b border-white/20 pb-6 space-y-2">
                    <h1 className="text-2xl md:text-4xl font-bold tracking-wide">
                        Terms of Service
                    </h1>
                    <p className="text-[10px] text-white/60">
                        Last updated: {lastUpdated}
                    </p>
                </header>

                {/* Introduction */}
                <section className="space-y-4 text-white/90 leading-relaxed">
                    <p>
                        Welcome to <strong className="text-white">Shores Electronics</strong> ("we", "us", or "our"). These Terms of Service ("Terms") govern your use of our website located at{" "}
                        <a
                            href={siteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-white transition-colors lowercase"
                        >
                            {siteUrl}
                        </a>{" "}
                        and any related services, content, or features offered by us.
                    </p>
                    <div className="p-4 border border-white/20 bg-white/5 space-y-2">
                        <p className="font-bold text-white">Agreement to Terms</p>
                        <p className="text-white/80">
                            By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access or use our Services.
                        </p>
                    </div>
                </section>

                <div className="space-y-10 border-t border-white/20 pt-8 text-white/80 leading-relaxed">

                    {/* Section 1 */}
                    <section className="space-y-3">
                        <h2 className="text-sm md:text-base font-bold text-white tracking-widest">
                            1. Site Status & Development Notice
                        </h2>
                        <p>
                            Shores Electronics is currently under active development. Pages, features, product descriptions, and content may be incomplete, contain placeholder text, or change at any time without prior notice.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section className="space-y-3">
                        <h2 className="text-sm md:text-base font-bold text-white tracking-widest">
                            2. Intellectual Property Rights
                        </h2>
                        <p>
                            The website, source code, design, logos, graphics, brand name, and all original content are the exclusive property of Shores Electronics and Jacob Lewis-Shores. You may not copy, reproduce, distribute, or create derivative works without explicit written permission.
                        </p>
                    </section>

                    {/* Section 3 */}
                    <section className="space-y-3">
                        <h2 className="text-sm md:text-base font-bold text-white tracking-widest">
                            3. User Conduct & Acceptable Use
                        </h2>
                        <p>When using our website and services, you agree not to:</p>
                        <ul className="list-disc list-inside space-y-1 pl-2 text-white/80">
                            <li>Use the site for any unlawful or unauthorized purpose.</li>
                            <li>Attempt to gain unauthorized access to any system, network, or server.</li>
                            <li>Interfere with or disrupt the security or performance of the website.</li>
                            <li>Scrape, mine, or extract data automatically without prior consent.</li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section className="space-y-3">
                        <h2 className="text-sm md:text-base font-bold text-white tracking-widest">
                            4. Disclaimer of Warranties ("As-Is")
                        </h2>
                        <p>
                            Our website and services are provided on an "AS IS" and "AS AVAILABLE" basis. Shores Electronics makes no warranties, expressed or implied, regarding site availability, accuracy, or fitness for a particular purpose.
                        </p>
                    </section>

                    {/* Section 5 */}
                    <section className="space-y-3">
                        <h2 className="text-sm md:text-base font-bold text-white tracking-widest">
                            5. Limitation of Liability
                        </h2>
                        <p>
                            To the fullest extent permitted by applicable law, Shores Electronics shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to, use of, or inability to access the website or any content therein.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section className="space-y-3">
                        <h2 className="text-sm md:text-base font-bold text-white tracking-widest">
                            6. Third-Party Links
                        </h2>
                        <p>
                            Our website may contain links to third-party social media channels or external websites (e.g., GitHub, Instagram, Facebook, TikTok, YouTube). We are not responsible for the content, privacy policies, or practices of any third-party sites.
                        </p>
                    </section>

                    {/* Section 7 */}
                    <section className="space-y-3">
                        <h2 className="text-sm md:text-base font-bold text-white tracking-widest">
                            7. Governing Law
                        </h2>
                        <p>
                            These Terms shall be governed by and construed in accordance with the laws of England and Wales. Any legal suit, action, or proceeding arising out of these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
                        </p>
                    </section>

                    {/* Section 8 */}
                    <section className="space-y-3">
                        <h2 className="text-sm md:text-base font-bold text-white tracking-widest">
                            8. Changes to Terms
                        </h2>
                        <p>
                            We reserve the right to modify or replace these Terms at any time. Any changes will be posted on this page with an updated revision date.
                        </p>
                    </section>

                    {/* Section 9 */}
                    <section className="space-y-3">
                        <h2 className="text-sm md:text-base font-bold text-white tracking-widest">
                            9. Contact Us
                        </h2>
                        <p>
                            If you have any questions regarding these Terms of Service, please contact us at{" "}
                            <a
                                href={`mailto:${contactEmail}`}
                                className="underline hover:text-white transition-colors lowercase"
                            >
                                {contactEmail}
                            </a>.
                        </p>
                    </section>

                </div>
            </div>
        </main>
    );
}