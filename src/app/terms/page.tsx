export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-black text-white uppercase mb-8">
                Terms of <span className="text-brand-lemon">Service</span>
            </h1>

            <div className="prose prose-invert max-w-none space-y-8 text-neutral-300">
                <p className="text-lg text-neutral-400">
                    <strong>Last Updated:</strong> January 18, 2026
                </p>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using Newtown Radio's website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-4">2. Use of Services</h2>
                    <p>You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Violate any applicable laws or regulations</li>
                        <li>Infringe on the rights of others</li>
                        <li>Transmit harmful or malicious code</li>
                        <li>Attempt to gain unauthorized access to our systems</li>
                        <li>Use our services for commercial purposes without permission</li>
                        <li>Reproduce, distribute, or modify our content without authorization</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-4">3. User Accounts</h2>
                    <p>
                        If you create an account with us, you are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-4">4. Intellectual Property</h2>
                    <p>
                        All content on Newtown Radio, including audio streams, show recordings, logos, graphics, and text, is owned by Newtown Radio or its licensors and is protected by copyright and other intellectual property laws.
                    </p>
                    <p className="mt-4">
                        You may not reproduce, distribute, modify, or create derivative works from our content without explicit written permission.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-4">5. Streaming and Downloads</h2>
                    <p>
                        Our live streams and archived content are provided for personal, non-commercial use only. Recording, redistributing, or broadcasting our content without permission is prohibited.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-4">6. Donations and Payments</h2>
                    <p>
                        All donations and payments made through our website are final and non-refundable unless otherwise stated. We reserve the right to refuse or cancel any transaction.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-4">7. Membership</h2>
                    <p>
                        Membership benefits are subject to change. Members may cancel their membership at any time. Refunds for membership fees are provided on a pro-rata basis within 30 days of cancellation.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-4">8. Disclaimer of Warranties</h2>
                    <p>
                        Our services are provided "as is" without warranties of any kind, either express or implied. We do not guarantee uninterrupted or error-free service.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-4">9. Limitation of Liability</h2>
                    <p>
                        Newtown Radio shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-4">10. Third-Party Links</h2>
                    <p>
                        Our website may contain links to third-party websites. We are not responsible for the content or practices of these external sites.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-4">11. Termination</h2>
                    <p>
                        We reserve the right to terminate or suspend your access to our services at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users or our business.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-4">12. Governing Law</h2>
                    <p>
                        These Terms shall be governed by and construed in accordance with the laws of South Africa, without regard to its conflict of law provisions.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-4">13. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the updated Terms on this page.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-white mb-4">14. Contact Information</h2>
                    <p>
                        For questions about these Terms of Service, please contact us:
                    </p>
                    <div className="bg-neutral-900 border border-white/10 rounded-xl p-6 mt-4">
                        <p><strong>Email:</strong> legal@newtownradio.co.za</p>
                        <p><strong>Address:</strong> 123 Pulse Avenue, Newtown, Johannesburg, 2001</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
