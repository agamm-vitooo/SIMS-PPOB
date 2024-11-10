import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { db } from "../api/config"; // Firestore instance
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react"; // Import useUser from Clerk

const BalanceSection = () => {
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [profile, setProfile] = useState({ balance: 0 });
  const { user } = useUser(); // Dapatkan user dari Clerk

  const toggleBalance = () => setBalanceVisible(!balanceVisible);

  useEffect(() => {
    if (!user) return;

    // Query untuk mengambil semua top-up berdasarkan userId
    const q = query(
      collection(db, "topUpHistory"),
      where("userId", "==", user.id)
    );

    // Listener untuk memantau perubahan data top-up secara real-time
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let totalBalance = 0;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        totalBalance += Number(data.amount); // Jumlahkan setiap nilai top-up
      });
      setProfile({ balance: totalBalance }); // Update balance di state
    });

    // Cleanup listener saat komponen di-unmount
    return () => unsubscribe && unsubscribe();
  }, [user]);

  return (
    <div className="bg-red-500 text-white rounded-lg p-6 flex items-center justify-between mb-6 w-full md:w-3/5 lg:w-1/2">
      <div>
        <h3 className="text-lg font-semibold">Saldo anda</h3>
        <p className="text-2xl font-bold">
          {balanceVisible ? `Rp ${profile.balance.toLocaleString("id-ID")}` : 'Rp ••••••••'}
        </p>
      </div>
      <button onClick={toggleBalance} className="text-white">
        <FontAwesomeIcon icon={faEye} /> Lihat Saldo
      </button>
    </div>
  );
};

export default BalanceSection;
