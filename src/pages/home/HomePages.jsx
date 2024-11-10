import React from 'react';
import AppHeader from '../../components/AppHeader';
import WelcomeSection from '../../components/WelcomeSection';
import BalanceSection from '../../components/BalanceSection';
import ServicesSection from '../../components/ServiceSection';
import PromotionsSection from '../../components/PromotionSection';

const Home = () => {
  return (
    <div className="home">
      <AppHeader />
      <div className="p-6">
        <div className="flex flex-wrap gap-4 justify-between">
          <WelcomeSection />
          <BalanceSection  />
        </div>
        <ServicesSection />
        <PromotionsSection />
      </div>
    </div>
  );
};

export default Home;
