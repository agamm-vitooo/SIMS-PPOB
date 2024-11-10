import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import promo1 from '../assets/images/Banner 1.png';
import promo2 from '../assets/images/Banner 2.png';
import promo3 from '../assets/images/Banner 3.png';
import promo4 from '../assets/images/Banner 4.png';
import promo5 from '../assets/images/Banner 5.png';

const promotions = [
  { image: promo1, title: 'Saldo Gratis!', description: 'Saldo SMS P500 gratis senilai Rp25.000 untuk pengguna pertama' },
  { image: promo2, title: 'Diskon listrik!', description: 'Diskon untuk setiap pembayaran listrik prabayar/pascabayar 10%' },
  { image: promo3, title: 'Promo makan!', description: 'Dapatkan voucher makan di restoran favorit Anda dengan melakukan transaksi di sini!' },
  { image: promo4, title: 'Cashback 25%', description: 'Untuk setiap pembayaran voucher game di atas Rp100.000' },
  { image: promo5, title: 'Buy 1 Get 2!', description: 'Dapatkan dua buata gratis untuk setiap pembelian satu tiket acara!' },
];

const PromotionsSection = () => {
  return (
    <div className="mt-8 px-4 md:px-8 lg:px-16">
      <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Temukan promo menarik</h3>
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 1000, disableOnInteraction: false }} // Set delay to 4000ms for 4 seconds
        pagination={{ clickable: true }}
        navigation={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {promotions.map((promo, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center justify-center rounded-lg overflow-hidden bg-white h-full">
              <img src={promo.image} alt={promo.title} className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col items-center text-center">
                <h4 className="text-lg font-semibold text-gray-800">{promo.title}</h4>
                <p className="text-sm text-gray-600 mt-2">{promo.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PromotionsSection;
