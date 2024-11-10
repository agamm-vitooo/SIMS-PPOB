import React from 'react';

// Import each service icon
import pbbIcon from '../assets/logo/PBB.png';
import listrikIcon from '../assets/logo/Listrik.png';
import pulsaIcon from '../assets/logo/Pulsa.png';
import pdamIcon from '../assets/logo/PDAM.png';
import pgnIcon from '../assets/logo/PGN.png';
import tvLanggananIcon from '../assets/logo/Televisi.png';
import musikIcon from '../assets/logo/Musik.png';
import voucherGameIcon from '../assets/logo/PGN.png';
import voucherMakananIcon from '../assets/logo/Voucher Makanan.png';
import kurbanIcon from '../assets/logo/Kurban.png';
import zakatIcon from '../assets/logo/Zakat.png';
import paketDataIcon from '../assets/logo/Paket Data.png';

// Map service names to corresponding icons
const serviceIcons = {
  PBB: pbbIcon,
  Listrik: listrikIcon,
  Pulsa: pulsaIcon,
  PDAM: pdamIcon,
  PGN: pgnIcon,
  "TV Langganan": tvLanggananIcon,
  Musik: musikIcon,
  "Voucher Game": voucherGameIcon,
  "Voucher Makanan": voucherMakananIcon,
  Kurban: kurbanIcon,
  Zakat: zakatIcon,
  "Paket Data": paketDataIcon,
};

const ServicesSection = () => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4 mb-8">
      {Object.keys(serviceIcons).map((service, index) => (
        <div
          key={index}
          className="flex flex-col items-center transform transition duration-300 hover:scale-110" // Scale effect on hover
        >
          <div className="w-16 rounded-full flex items-center justify-center mb-2 transition duration-300"> {/* Background color change on hover */}
            <img src={serviceIcons[service]} alt={service} className="w-full" />
          </div>
          <p className="text-center text-sm text-gray-700">{service}</p>
        </div>
      ))}
    </div>
  );
};

export default ServicesSection;
