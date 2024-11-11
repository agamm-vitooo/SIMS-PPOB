import React, { useState, useEffect } from "react";
import WelcomeSection from "../components/WelcomeSection";
import AppHeader from "../components/AppHeader";
import BalanceSection from "../components/BalanceSection";
import TransactionHistory from "./TransactionPages";
import Popup from "../components/PopUp/PopUp";
import { db } from "../api/config";
import { addDoc, collection, query, where, onSnapshot, Timestamp, updateDoc, doc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";
import { Clock, MessageSquare } from "lucide-react";

function TopUpForm() {
  const [topUpAmount, setTopUpAmount] = useState("");
  const [message, setMessage] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [viewHistory, setViewHistory] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ amount: 0, status: "" });
  const { user } = useUser();

  const fetchTransactions = () => {
    if (!user) {
      console.log("User not available");
      return;
    }

    const q = query(
      collection(db, "topUpHistory"),
      where("userId", "==", user.id)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const fetchedTransactions = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            date: data.date instanceof Timestamp
              ? data.date.toDate().toLocaleString("id-ID")
              : new Date(data.date).toLocaleString("id-ID"),
          };
        });
        setTransactions(fetchedTransactions);
      } else {
        setTransactions([]);
      }
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchTransactions();
    return () => unsubscribe && unsubscribe();
  }, [user]);

  const handleTopUp = () => {
    if (!topUpAmount) {
      setPopupData({ amount: topUpAmount, status: "error" });
      setShowPopup(true);
      return;
    }

    if (!user) {
      setPopupData({ amount: topUpAmount, status: "error" });
      setShowPopup(true);
      return;
    }

    addDoc(collection(db, "topUpHistory"), {
      userId: user.id,
      amount: topUpAmount,
      message: message || null,
      date: Timestamp.fromDate(new Date()),
      status: "pending",
    })
      .then((transactionRef) => {
        setTimeout(() => {
          updateDoc(doc(db, "topUpHistory", transactionRef.id), {
            status: "sukses",
          });
          setPopupData({ amount: topUpAmount, status: "sukses" });
          setShowPopup(true);
          setTopUpAmount("");
          setMessage("");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error saving transaction: ", error);
        setPopupData({ amount: topUpAmount, status: "error" });
        setShowPopup(true);
      });
  };

  const quickTopUp = (amount) => {
    setTopUpAmount(amount);
  };

  const handleClosePopup = () => setShowPopup(false);

  if (viewHistory) {
    return <TransactionHistory onClose={() => setViewHistory(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <div className="p-6 flex flex-wrap gap-4 justify-between">
        <WelcomeSection />
        <BalanceSection />
      </div>

      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-6 mt-6">
        {/* Top-Up Form Section */}
        <div className="w-full md:w-2/3">
          <div className=" p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Up Dana</h2>

            <div className="space-y-6">
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Masukkan Nominal
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="number"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    className="flex-1 h-12 px-4 rounded-lg bg-white text-gray-600 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Rp"
                  />
                  <button
                    onClick={handleTopUp}
                    className="h-12 px-6 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Top Up Sekarang
                  </button>
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Pilihan Cepat
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[10000, 20000, 50000, 100000, 250000, 500000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => quickTopUp(amount)}
                      className="py-2 px-3 rounded-lg border border-gray-200 hover:bg-gray-50 font-medium text-gray-700 transition-colors"
                    >
                      Rp {amount.toLocaleString("id-ID")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Pesan (Opsional)
                </label>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-12 px-4 rounded-lg bg-white text-gray-600 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Tambahkan catatan untuk transaksi ini"
                />
              </div>

              {/* Transaction History Button */}
              <button
                onClick={() => setViewHistory(true)}
                className="w-full sm:w-auto h-12 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors"
              >
                Lihat Semua Transaksi
              </button>
            </div>
          </div>
        </div>

        {/* Recent Transactions Section */}
        <div className="w-full md:w-1/3">
          <div className=" p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Transaksi Terakhir</h3>
            
            {transactions && transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.slice(0, 5).map((transaction) => (
                  <div
                    key={transaction.id}
                    className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-lg font-semibold text-gray-800">
                        Rp {Number(transaction.amount).toLocaleString("id-ID")}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        transaction.status === "sukses" 
                          ? "bg-green-100 text-green-600" 
                          : transaction.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}>
                        {transaction.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {transaction.date}
                      </span>
                      {transaction.message && (
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {transaction.message}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Belum ada transaksi
              </div>
            )}
          </div>
        </div>
      </div>

      {showPopup && (
        <Popup
          amount={popupData.amount}
          status={popupData.status}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}

export default TopUpForm;