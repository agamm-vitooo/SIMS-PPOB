# SIMS-PPOB

**SIMS-PPOB** adalah aplikasi berbasis web yang dikembangkan dengan teknologi React dan Vite untuk keperluan Point of Payment Online Banking (PPOB). Aplikasi ini memanfaatkan Firebase sebagai layanan backend serta didukung dengan pengaturan tampilan menggunakan Tailwind CSS.

## Instalasi dan Penggunaan

### Prasyarat

Pastikan Anda memiliki [Node.js](https://nodejs.org/) dan [npm](https://www.npmjs.com/) terinstal di komputer Anda.

### Langkah-Langkah Instalasi

1. Clone repositori ini:
   ```bash
   git clone https://github.com/agamm-vitooo/SIMS-PPOB.git
   ```
2. Masuk ke direktori proyek:
   ```bash
   cd SIMS-PPOB
   ```
3. Instal dependensi:
   ```bash
   npm install
   ```
4. Jalankan aplikasi:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000`.

## Deployment

Aplikasi ini di-deploy menggunakan Firebase Hosting dan Vercel. Untuk meng-deploy ulang aplikasi, lakukan langkah berikut:

1. Build aplikasi:
   ```bash
   npm run build
   ```
2. Jalankan Firebase CLI untuk deployment ke Firebase Hosting:
   ```bash
   firebase deploy
   ```

--- 
