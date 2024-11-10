import React, { useEffect } from "react";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";

const Popup = ({ amount, status, onClose }) => {
  useEffect(() => {
    // Automatically close the popup after 3 seconds (optional)
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300">
      <div
        className="bg-white text-gray-700 rounded-lg p-6 text-center shadow-xl max-w-xs w-full transform scale-100 opacity-0 transition-all duration-500 ease-in-out delay-100"
        style={{ opacity: "1", transform: "scale(1.05)" }} // Start with opacity and scale for a smooth effect
      >
        {/* Icon based on status */}
        {status === "sukses" ? (
          <AiOutlineCheckCircle className="text-green-500 mx-auto text-5xl mb-4" />
        ) : (
          <AiOutlineCloseCircle className="text-red-500 mx-auto text-5xl mb-4" />
        )}

        {/* Top-Up Amount */}
        <h2 className="text-lg font-semibold">Top Up sebesar</h2>
        <p className="text-2xl font-bold">
          Rp{Number(amount).toLocaleString("id-ID")}
        </p>

        {/* Status Message */}
        <p className="mt-2 text-gray-600">
          {status === "sukses" ? "berhasil" : "gagal"}
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 bg-red-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-red-600 transition duration-200"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};

export default Popup;
