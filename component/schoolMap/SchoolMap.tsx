'use client';
import React from 'react';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

/**
 * SchoolMap component displays school contact information alongside an embedded Google Map.
 *
 * Layout: two‑column grid on medium screens and above, stacked on mobile.
 */
export default function SchoolMap() {
  return (
    <section className="py-12" id='contact'>
      <div className="grid md:grid-cols-2 gap-8 container mx-auto px-6 lg:px-8">
        {/* Left column – contact details */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Lokasi &amp; Kontak Kami
          </h2>
          <p className="text-gray-600">
            Kunjungi kami di Gresik, Jawa Timur. Kami selalu menyambut Anda dengan senyum
            dan layanan terbaik.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-6 h-6 text-blue-500" />
              <span>Jl. Raya Darkun No.16, Krajan, Menganti, Kec. Menganti, Kabupaten Gresik, Jawa Timur 61174</span>
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <Mail className="w-6 h-6 text-pink-500" />
              <span>info@sekolah-gresik.id</span>
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <Phone className="w-6 h-6 text-green-500" />
              <span>+62 812‑3456‑7890 (WhatsApp)</span>
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <Clock className="w-6 h-6 text-yellow-500" />
              <span>Senin – Jumat (07.00 – 15.00)</span>
            </li>
          </ul>
        </div>
        {/* Right column – map */}
        <div className="shadow-lg rounded-2xl overflow-hidden">
          <iframe
            className="w-full h-[350px] md:h-full"
            src="https://maps.google.com/maps?q=-7.292775,112.586994&z=17&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Sekolah"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
