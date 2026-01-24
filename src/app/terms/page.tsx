'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link'; // IMPORT LINK
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
        
        {/* FIXED: Use Link for internal navigation */}
        <div className="mb-8">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </Button>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">Terms & Conditions</h1>
        
        <div className="bg-white p-6 md:p-10 rounded-xl shadow-sm space-y-8 text-gray-700">
          
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">1. Driver Requirements</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Minimum Age:</strong> Drivers must be between 23 and 65 years old.</li>
              <li><strong>License:</strong> A valid UAE driving license held for at least 6 months is required.</li>
              <li><strong>Documents:</strong> Original Emirates ID (for residents) or Passport with Visa Entry Stamp (for tourists) is mandatory.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">2. Usage Restrictions</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Geographical Limits:</strong> Vehicles are strictly prohibited from leaving the United Arab Emirates. Driving to Oman, Saudi Arabia, or any other country is not allowed under any circumstances.</li>
              <li><strong>Off-Roading:</strong> 4WD vehicles are allowed off-road up to a maximum of 1km from a paved road. Dune bashing, racing, or competitive events are strictly prohibited.</li>
              <li><strong>Prohibited Uses:</strong> Vehicles must not be used for racing, rallies, speed trials, or carrying hazardous materials.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">3. Insurance & Accidents</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Police Report:</strong> In case of any accident or damage, a valid Police Report is mandatory. Without it, the customer is liable for all repair costs.</li>
              <li><strong>Excess/Deductible:</strong> If the accident is the driver&apos;s fault, an insurance excess fee applies (standard AED 1,000 for saloons, higher for SUVs/Sports cars).</li>
              <li><strong>Sports/Coupe Cars:</strong> Higher excess fees (20% additional) apply to high-performance vehicles.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">4. Payments & Deposits</h2>
            <p>A security deposit is required via Credit Card. Rental fees must be paid in advance. Traffic fines and Salik (toll) charges are the responsibility of the renter.</p>
          </section>

        </div>
      </div>

      <Footer />
    </main>
  );
}