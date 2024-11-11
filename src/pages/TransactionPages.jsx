import React, { useState, useEffect } from "react";
import { db } from "../api/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";
import AppHeader from "../components/AppHeader";
import WelcomeSection from "../components/WelcomeSection";
import BalanceSection from "../components/BalanceSection";
import { Calendar, Clock, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

function TransactionPages() {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const [transactions, setTransactions] = useState([]);
  const [visibleTransactions, setVisibleTransactions] = useState(5);
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

  const filteredTransactions = transactions.filter((transaction) => {
    if (!transaction.date) return false;
    return transaction.date.getMonth() === activeMonth;
  });

  const handleShowMore = () => {
    setVisibleTransactions((prev) => prev + 5);
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Riwayat Transaksi</h1>
          <div className="bg-white rounded-lg shadow-sm p-2">
            <select 
              value={activeMonth}
              onChange={(e) => setActiveMonth(Number(e.target.value))}
              className="text-gray-600 focus:outline-none bg-transparent"
            >
              {months.map((month, index) => (
                <option key={index} value={index}>{month}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500 font-medium">Memuat transaksi...</p>
            </div>
          ) : filteredTransactions.length > 0 ? (
            <div className="space-y-4">
              {filteredTransactions.slice(0, visibleTransactions).map((transaction) => (
                <div
                  key={transaction.id}
                  className="group flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:bg-gray-50 border border-gray-100"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${
                      transaction.amount >= 0 
                        ? "bg-green-100 text-green-600" 
                        : "bg-red-100 text-red-600"
                    }`}>
                      {transaction.amount >= 0 ? (
                        <ArrowUpCircle className="w-5 h-5" />
                      ) : (
                        <ArrowDownCircle className="w-5 h-5" />
                      )}
                    </div>
                    
                    <div>
                      <div className={`text-lg font-semibold ${
                        transaction.amount >= 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {transaction.amount >= 0 ? "+" : "-"} Rp{Math.abs(Number(transaction.amount)).toLocaleString("id-ID")}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center space-x-3">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {transaction.date.toLocaleDateString("id-ID")}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {transaction.date.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-3 py-1.5 bg-gray-50 rounded-lg text-sm text-gray-600 group-hover:bg-white">
                    {transaction.message || "Tidak ada pesan"}
                  </div>
                </div>
              ))}

              {visibleTransactions < filteredTransactions.length && (
                <div className="text-center pt-4">
                  <button 
                    onClick={handleShowMore}
                    className="px-5 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors duration-200"
                  >
                    Tampilkan Lebih Banyak
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                Tidak ada transaksi di bulan {months[activeMonth]}.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionPages;