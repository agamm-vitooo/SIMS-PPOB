import { db } from "./firebaseConfig"; // Import Firestore instance
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react"; // Clerk's useUser hook for user data

const addUserToFirestore = async() => {
    const { user } = useUser(); // Clerk's user object

    if (user) {
        console.log("User ditemukan:", user); // Debug log untuk memeriksa data pengguna dari Clerk

        const userId = user.id; // UID dari Clerk
        const userRef = doc(db, "Users", userId); // Referensi ke koleksi Users dengan UID Clerk

        try {
            // Cek jika data pengguna sudah ada di Firestore
            const userSnapshot = await getDoc(userRef);
            if (!userSnapshot.exists()) {
                // Mengambil data email dari email utama, jika tersedia
                const email = user.emailAddresses && user.emailAddresses.length > 0 ?
                    user.emailAddresses[0].emailAddress :
                    "";

                console.log("Menyimpan data pengguna ke Firestore..."); // Debug log sebelum menyimpan data

                // Simpan data pengguna ke Firestore
                await setDoc(userRef, {
                    name: user.fullName || "", // Menggunakan nama dari Clerk
                    email: email, // Email utama dari Clerk atau string kosong jika tidak tersedia
                    created_at: Timestamp.now(), // Timestamp dari Firebase
                    status: "aktif" // Set status awal sebagai aktif
                });

                console.log("Data pengguna berhasil disimpan di Firestore."); // Debug log setelah data disimpan
            } else {
                console.log("Data pengguna sudah ada di Firestore."); // Debug jika data sudah ada
            }
        } catch (error) {
            console.error("Gagal menyimpan data ke Firestore:", error); // Debug jika terjadi error
        }
    } else {
        console.log("Tidak ada pengguna yang ditemukan."); // Debug jika `user` tidak ditemukan
    }
};

// Panggil fungsi ini setelah pengguna login atau mendaftar
addUserToFirestore();