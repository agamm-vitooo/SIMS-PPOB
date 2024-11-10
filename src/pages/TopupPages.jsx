// TopUpForm.jsx
import React, { useState, useEffect } from "react";
import WelcomeSection from "../components/WelcomeSection";
import AppHeader from "../components/AppHeader";
import BalanceSection from "../components/BalanceSection";
import TransactionHistory from "./TransactionPages";
import Popup from "../components/PopUp/PopUp";
import { db } from "../api/config"; // Firestore instance
import { addDoc, collection, query, where, onSnapshot, Timestamp, updateDoc, doc } from "firebase/firestore"; // Firestore functions
import { useUser } from "@clerk/clerk-react"; // Import useUser from Clerk

function TopUpForm() {
  const [topUpAmount, setTopUpAmount] = useState("");
  const [message, setMessage] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [viewHistory, setViewHistory] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ amount: 0, status: "" });
  const { user } = useUser(); // Get user from Clerk

  // Function to fetch transactions from Firestore in real-time
  const fetchTransactions = () => {
    if (!user) {
      console.log("User not available");
      return;
    }

    console.log("Fetching transactions for user:", user.id);

    const q = query(
      collection(db, "topUpHistory"),
      where("userId", "==", user.id)
    );

    // Using onSnapshot to listen to real-time data changes
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
        console.log("Fetched transactions:", fetchedTransactions);
        setTransactions(fetchedTransactions);
      } else {
        console.log("No transactions found");
        setTransactions([]); // Clear transactions if none are found
      }
    });

    return unsubscribe;
  };

  // Fetch transactions when component mounts and user is available
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

    // Initiating top-up transaction
    addDoc(collection(db, "topUpHistory"), {
      userId: user.id,
      amount: topUpAmount,
      message: message || null,
      date: Timestamp.fromDate(new Date()),
      status: "pending",
    })
      .then((transactionRef) => {
        // Simulate a transaction success update after 2 seconds
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
    <div className="halaman min-h-screen bg-gray-50">
      <AppHeader />
      <div className="p-6 flex flex-wrap gap-4 justify-between">
        <WelcomeSection />
        <BalanceSection />
      </div>

      <div className="container mx-auto flex flex-col md:flex-row gap-6 mt-6">
        {/* Top-Up Form Section (Left Column) */}
        <div className="w-full md:w-2/3">
          <div className="form p-6 sm:p-8 text-gray-700">
            <h2 className="text-lg font-bold mb-2">Top-Up Details</h2>
            <p className="text-2xl font-semibold mb-4">Enter Top-Up Amount</p>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
              <input
                type="number"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 bg-white text-gray-700"
                placeholder="Nominal Top Up"
              />
              <button
                onClick={handleTopUp}
                className="bg-red-500 text-white font-bold w-full sm:w-52 h-10 rounded-lg"
              >
                Top Up
              </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
              {[10000, 20000, 50000, 100000, 250000, 500000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => quickTopUp(amount)}
                  className="border rounded-lg py-2 text-center bg-gray-100 hover:bg-gray-200"
                >
                  Rp {amount.toLocaleString("id-ID")}
                </button>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Add a Message (optional)</label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 bg-white text-gray-700"
                placeholder="Message for the transaction"
              />
            </div>

            <button
              onClick={() => setViewHistory(true)}
              className="mt-6 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-full sm:w-auto"
            >
              View Full Transaction History
            </button>
          </div>
        </div>

        {/* Recent Transactions Section (Right Column) */}
        <div className="w-full md:w-1/3">
          {transactions && transactions.length > 0 ? (
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
              <div className="bg-gray-50 rounded-lg p-4 border">
                <div className="grid grid-cols-2 sm:grid-cols-4 text-gray-700 font-semibold mb-2">
                  <span>Amount</span>
                  <span>Date</span>
                  <span>Message</span>
                  <span>Status</span>
                </div>
                {transactions.slice(0, 5).map((transaction) => (
                  <div
                    key={transaction.id}
                    className="grid grid-cols-2 sm:grid-cols-4 items-center p-2 border-b last:border-b-0"
                  >
                    <span className="text-gray-700">
                      Rp {Number(transaction.amount).toLocaleString("id-ID")}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {transaction.date}
                    </span>
                    <span className="text-gray-500 text-sm truncate">
                      {transaction.message || "No message"}
                    </span>
                    <span className={`text-sm font-semibold ${transaction.status === "sukses" ? "text-green-500" : transaction.status === "pending" ? "text-yellow-500" : "text-red-500"}`}>
                      {transaction.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center p-6">No transactions found.</p>
          )}
        </div>
      </div>

      {/* Conditionally render the popup */}
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
