'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
        
        <div className="mb-8">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </Button>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">Terms & Conditions</h1>
        
        <div className="bg-white p-6 md:p-10 rounded-xl shadow-sm space-y-10 text-gray-700">
          
          {/* SECTION 1: DRIVING & USAGE */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 border-b pb-2">1. Driving & Usage Limits</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong>Mileage Limit:</strong> The allowed mileage is <strong>400 km per 24 hours</strong>. Excess mileage is charged at <strong>AED 1 per km</strong>. (Monthly limit: 7,500 km).</li>
              <li><strong>Driver Restriction:</strong> The vehicle must <u>only</u> be driven by the hirer. Giving the car to anyone else is strictly prohibited.</li>
              <li><strong>Geographical Limits:</strong> Vehicles are strictly prohibited from leaving the UAE. Insurance is invalid outside UAE borders.</li>
              <li><strong>Fuel Policy:</strong> The vehicle must be returned with the same fuel level as when it was picked up.</li>
              <li><strong>Traffic Fines:</strong> The customer is responsible for clearing all traffic fines and lock fines incurred during the rental period.</li>
              <li><strong>Tolls (Salik/Darb):</strong> The renter is responsible for all toll charges (AED 4 per crossing) plus service charges.</li>
            </ul>
          </section>

          {/* SECTION 2: ACCIDENTS & INSURANCE */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 border-b pb-2">2. Accidents & Insurance</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong>Reporting:</strong> In case of accident or technical trouble, the hirer <strong>must inform the rent office immediately</strong>. Do not repair the vehicle without office permission.</li>
              <li><strong>Police Report:</strong> A valid Police Report is mandatory for any damage. Without it, the hirer pays full repair costs.</li>
              <li><strong>Insurance Excess:</strong> If the accident is the hirer&apos;s fault, an excess fee applies:
                <ul className="list-circle pl-5 mt-1 text-sm text-gray-600">
                  <li><strong>Standard Cars:</strong> AED 1,500</li>
                  <li><strong>Luxury Cars:</strong> AED 2,500</li>
                  <li><strong>Natural Disasters (Rain/Flood):</strong> Additional 5% excess (Min. AED 2,000).</li>
                </ul>
              </li>
              <li><strong>Total Loss:</strong> If the vehicle is cancelled by insurance due to an accident, the renter is responsible to pay <strong>20% of the vehicle value</strong>.</li>
              <li><strong>DUI Clause:</strong> If an accident occurs under the influence of alcohol or substances, the driver pays for <strong>full damage repairs</strong> plus rental charges during the repair period.</li>
              <li><strong>Repair Period:</strong> The tenant bears daily rental charges for every day the car is under repair due to negligence or accident.</li>
            </ul>
          </section>

          {/* SECTION 3: PAYMENTS & LEGAL */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 border-b pb-2">3. Payments, Deposits & Legal</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong>Security Deposit:</strong> An amount of <strong>AED 1,500</strong> is reserved to cover potential violations. This is refundable after <strong>15 days</strong> from the return date.</li>
              <li><strong>Late Return:</strong> Delay is charged at AED 10 per hour. Extension requires prior office approval.</li>
              <li><strong>Payment Default:</strong> If rental payment is delayed by 10 days, the office has the right to stop the car remotely.</li>
              <li><strong>Impoundment:</strong> The office is not responsible if the car is impounded by police while in the renter&apos;s custody.</li>
              <li><strong>Legal Costs:</strong> In case of a lawsuit to recover funds, the hirer pays all lawyer fees and court expenses.</li>
            </ul>
          </section>

          {/* SECTION 4: OFFICE TIMINGS */}
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 border-b pb-2">4. Return & Office Hours</h2>
            <p className="mb-2"><strong>Working Hours:</strong> 8:00 AM - 1:00 PM & 4:30 PM - 9:00 PM.</p>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong>Public Holidays:</strong> The office remains closed. Vehicles due on a holiday must be returned the day before, or rent will be charged until the holiday ends.</li>
              <li><strong>Return Time:</strong> Hirer must bring the car at least one hour before office closing time.</li>
            </ul>
          </section>

        </div>
      </div>

      <Footer />
    </main>
  );
}