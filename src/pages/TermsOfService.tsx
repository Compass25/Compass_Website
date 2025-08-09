import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import Logo from '@/components/Logo';
import { ArrowLeft } from "lucide-react";
const TermsOfService = () => {
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-6">
              
            </div>
            <h1 className="font-bold text-gray-900 text-xl">Terms of Service</h1>
            <p className="text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          
          <CardContent className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="font-semibold text-gray-900 mb-4 text-lg">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Compass ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-4 text-lg">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed">
                Compass is a travel planning and booking platform that provides users with access to travel packages, destination information, 
                and booking services. We facilitate connections between travelers and travel service providers.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-4 text-lg">3. User Accounts</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>When you create an account with us, you must provide accurate, complete, and current information.</p>
                <p>You are responsible for safeguarding the password and for maintaining the confidentiality of your account.</p>
                <p>You agree not to disclose your password to any third party and to take sole responsibility for activities under your account.</p>
              </div>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-4 text-lg">4. Booking and Payment Terms</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>All bookings are subject to availability and confirmation by the respective service providers.</p>
                <p>Prices displayed are subject to change without notice until booking is confirmed.</p>
                <p>Payment terms and cancellation policies vary by service provider and will be clearly stated during booking.</p>
                <p>Compass acts as an intermediary and is not responsible for the quality of services provided by third parties.</p>
              </div>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-4 text-lg">5. User Conduct</h2>
              <div className="text-gray-700 leading-relaxed">
                <p>You agree not to:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Use the service for any unlawful purpose or in violation of any applicable laws</li>
                  <li>Transmit any harmful, threatening, or offensive content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt the service or servers</li>
                  <li>Impersonate any person or entity</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-4 text-lg">6. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                The Service and its original content, features, and functionality are and will remain the exclusive property of Compass and its licensors. 
                The Service is protected by copyright, trademark, and other laws.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-4 text-lg">7. Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, 
                to understand our practices.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-4 text-lg">8. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                In no event shall Compass, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, 
                incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                or other intangible losses, resulting from your use of the Service.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-4 text-lg">9. Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, 
                under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-4 text-lg">10. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-4 text-lg">11. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us through our contact page or customer support.
              </p>
            </section>

            <div className="text-center">
                <Link
                    to="/"
                    className="flex items-center justify-center gap-2 text-gray-800 hover:text-gray-600"
                    style={{ fontSize: "14px" }}
                  >
                  <ArrowLeft style={{ width: "16px", height: "14px" }} />
                  <span>Back to Home</span>
                </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default TermsOfService;
