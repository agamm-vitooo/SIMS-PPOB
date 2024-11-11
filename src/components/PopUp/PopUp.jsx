import React, { useEffect } from "react";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";

const Popup = ({ amount, status, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="relative bg-white text-gray-700 rounded-2xl p-8 text-center shadow-2xl max-w-sm w-full mx-4 animate-scaleIn">
        <div className="animate-iconBounce">
          {status === "sukses" ? (
            <AiOutlineCheckCircle className="text-green-500 mx-auto text-6xl mb-6" />
          ) : (
            <AiOutlineCloseCircle className="text-red-500 mx-auto text-6xl mb-6" />
          )}
        </div>

        <div className="animate-slideUp delay-200">
          <h2 className="text-lg font-semibold text-gray-600">Top Up sebesar</h2>
          <p className="text-3xl font-bold mt-2 text-gray-800">
            Rp{Number(amount).toLocaleString("id-ID")}
          </p>

          <p className={`mt-3 text-lg font-medium ${
            status === "sukses" ? "text-green-500" : "text-red-500"
          }`}>
            {status === "sukses" ? "Transaksi Berhasil" : "Transaksi Gagal"}
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-8 bg-red-500 text-white py-3 px-8 rounded-xl font-semibold hover:bg-red-600 
                     transition-all duration-200 hover:shadow-lg animate-slideUp delay-300
                     active:scale-95"
        >
          Kembali ke Beranda
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes iconBounce {
          0% { 
            opacity: 0;
            transform: scale(0.3);
          }
          50% { 
            transform: scale(1.1);
          }
          70% { 
            transform: scale(0.9);
          }
          100% { 
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-iconBounce {
          animation: iconBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
};

export default Popup;