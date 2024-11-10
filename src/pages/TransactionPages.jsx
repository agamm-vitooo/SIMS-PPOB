import React, { useState, useEffect } from "react";
import { db } from "../api/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";
import AppHeader from "../components/AppHeader";
import WelcomeSection from "../components/WelcomeSection";
import BalanceSection from "../components/BalanceSection";

function TransactionPages() {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const [transactions, setTransactions] = useState([]);
  const [visibleTransactions, setVisibleTransactions] = useState(5); // Jumlah transaksi yang terlihat
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    setLoading(true);

    const q = query(
      collection(db, "topUpHistory"),
      where("userId", "==", user.id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date && typeof doc.data().date.toDate === "function"
          ? doc.data().date.toDate()
          : new Date(doc.data().date)
      }));

      setTransactions(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Filter transaksi sesuai bulan yang aktif
  const filteredTransactions = transactions.filter((transaction) => {
    if (!transaction.date) return false;
    return transaction.date.getMonth() === activeMonth;
  });

  // Fungsi untuk menambah jumlah transaksi yang terlihat
  const handleShowMore = () => {
    setVisibleTransactions((prev) => prev + 5); // Tambah 5 transaksi lagi
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      
      <div className="p-6">
        <div className="flex flex-wrap gap-4 justify-between">
          <WelcomeSection />
          <BalanceSection />
        </div>
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">Riwayat Transaksi</h1>

        {/* Pilihan Bulan */}
        <div className="flex overflow-x-auto mb-6 space-x-2 pb-2 border-b-2">
          {months.map((month, index) => (
            <button
              key={index}
              onClick={() => setActiveMonth(index)}
              className={`px-4 py-2 rounded-lg ${
                activeMonth === index
                  ? "bg-red-500 text-white font-semibold"
                  : "bg-gray-100 text-gray-600 hover:bg-red-200"
              }`}
            >
              {month}
            </button>
          ))}
        </div>

        {/* Kontainer Transaksi */}
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto space-y-4">
          {loading ? (
            <p className="text-gray-500">Memuat transaksi...</p>
          ) : filteredTransactions.length > 0 ? (
            // Menampilkan hanya transaksi sesuai jumlah visibleTransactions
            filteredTransactions.slice(0, visibleTransactions).map((transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between items-center p-4 border rounded-lg"
              >
                <div>
                  <span
                    className={`text-lg font-semibold ${
                      transaction.amount >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {transaction.amount >= 0 ? "+ " : "- "}Rp{Number(transaction.amount).toLocaleString("id-ID")}
                  </span>
                  <div className="text-sm text-gray-400">
                    {transaction.date.toLocaleDateString("id-ID")} · {transaction.date.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div className="text-gray-500 text-sm">{transaction.message || "Tidak ada pesan"}</div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              Tidak ada transaksi di bulan {months[activeMonth]}.
            </p>
          )}

          {/* Tombol Show More */}
          {visibleTransactions < filteredTransactions.length && (
            <div className="text-center mt-4">
              <button onClick={handleShowMore} className="text-red-500 font-semibold hover:underline">
                Show more
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionPages;
