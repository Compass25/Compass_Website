import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import Logo from '@/components/Logo';
import { ArrowLeft } from "lucide-react";
const PrivacyPolicy = () => {
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center flex-col-reverse ">
              
            </div>
            <h1 className="font-bold text-gray-900 text-xl">Privacy Policy</h1>
            <p className="text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          
          <CardContent className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="font-semibold text-gray-900 mb-4 text-lg">1. Information We Collect</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p><strong>Personal Information:</strong> When you create an account, we collect information such as your name, email address, and contact details.</p>
                <p><strong>Booking Information:</strong> We collect details about your travel preferences, booking history, and payment information when you make reservations.</p>
                <p><strong>Usage Data:</strong> We automatically collect information about how you interact with our Service, including your IP address, browser type, and pages visited.</p>
                <p><strong>Location Data:</strong> With your permission, we may collect and process information about your location to provide location-based services.</p>
              </div>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-4 text-lg">2. How We Use Your Information</h2>
              <div className="text-gray-700 leading-relaxed">
                <p>We use the collected information for various purposes:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>To provide and maintain our Service</li>
                  <li>To process your bookings and transactions</li>
                  <li>To send you confirmations, updates, and administrative messages</li>
                  <li>To personalize your experience and provide relevant recommendations</li>
                  <li>To improve our Service and develop new features</li>
                  <li>To comply with legal obligations</li>
                  <li>To detect and prevent fraud or security issues</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-4 text-lg">3. Information Sharing and Disclosure</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p><strong>Service Providers:</strong> We share your information with third-party service providers who assist us in operating our Service, such as payment processors and travel partners.</p>
                <p><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or asset sale, your Personal Information may be transferred.</p>
                <p><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</p>
                <p><strong>Consent:</strong> We may share your information with your explicit consent for specific purposes.</p>
              </div>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-4 text-lg">4. Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-4 text-lg">5. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
                unless a longer retention period is required or permitted by law.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-4 text-lg">6. Your Privacy Rights</h2>
              <div className="text-gray-700 leading-relaxed">
                <p>Depending on your location, you may have the following rights:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate personal information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request transfer of your personal information</li>
                  <li><strong>Objection:</strong> Object to processing of your personal information</li>
                  <li><strong>Restriction:</strong> Request restriction of processing</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-4 text-lg">7. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our Service and hold certain information. 
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4 text-lg font-semibold">8. Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed">
                Our Service may contain links to third-party websites or services. We are not responsible for the privacy practices 
                or content of these third-party services. We encourage you to review their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-4 text-lg">9. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our Service is not intended for children under the age of 13. We do not knowingly collect personal information 
                from children under 13. If you become aware that a child has provided us with personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-4 text-lg">10. International Data Transfers</h2>
              <p className="text-gray-700 leading-relaxed">
                Your information may be transferred to and maintained on computers located outside of your state, province, 
                country, or other governmental jurisdiction where data protection laws may differ.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-gray-900 mb-4 text-lg">11. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4 font-semibold text-lg">12. Contact Us</h2>
              <div className="text-gray-700 leading-relaxed">
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Through our contact page on the website</li>
                  <li>By email at privacy@compass-holidays.com</li>
                  <li>Through our customer support system</li>
                </ul>
              </div>
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
export default PrivacyPolicy;