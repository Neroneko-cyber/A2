Projek ini dikembangkan dengan arsitektur modern yang membutuhkan beberapa integrasi pihak ketiga. Berikut adalah daftar variabel lingkungan yang harus dikonfigurasi dalam file `.env` untuk menjalankan sistem secara penuh.

### Daftar API Key & Konfigurasi Environment (.env)

| Kategori | Nama Variabel | Status Saat Ini | Kebutuhan / Deskripsi |
| :--- | :--- | :--- | :--- |
| **Database** | `DB_USERNAME` | `sa` | Username database SQL Server. |
| **Database** | `DB_PASSWORD` | `password` | Password database SQL Server. |
| **Security** | `JWT_SECRET` | `OtakuEcommerce...` | Key untuk enkripsi token JWT (Ganti di produksi!). |
| **Logistik** | `BINDERBYTE_API_KEY` | `f3f50808...` (Inputted) | API Key untuk cek ongkir & tracking Binderbyte. |
| **Pembayaran**| `XENDIT_SECRET_KEY` | *Perlu Input* | Secret Key dari Dashboard Xendit. |
| **Pembayaran**| `XENDIT_CALLBACK_TOKEN`| *Perlu Input* | Verification token untuk webhook Xendit. |
| **Media** | `CLOUDINARY_CLOUD_NAME`| *Perlu Input* | Nama cloud di Cloudinary. |
| **Media** | `CLOUDINARY_API_KEY` | *Perlu Input* | API Key dari Cloudinary. |
| **Media** | `CLOUDINARY_API_SECRET` | *Perlu Input* | API Secret dari Cloudinary. |
| **3D Engine** | `TRIPO_AI_API_KEY` | *Perlu Input* | API Key untuk Generative 3D dari Tripo AI. |
| **Redis** | `REDIS_HOST` | `localhost` | Host server Redis untuk cache & session. |
| **Redis** | `REDIS_PORT` | `6379` | Port server Redis. |
| **Redis** | `REDIS_PASSWORD` | *Kosong* | Password Redis (jika ada). |

---

## 2. Arsitektur Sistem
Projek ini merupakan aplikasi e-commerce modern dengan arsitektur **Decoupled (Frontend-Backend terpisah)**.


### Backend (Spring Boot)
- **Framework**: Spring Boot 3.2.4 (Java 21).
- **Database**: SQL Server (MSSQL) dengan **Flyway** untuk migrasi skema secara teratur.
- **Keamanan**: Spring Security dengan autentikasi berbasis JWT. Menggunakan **Redis** untuk blacklist token dan manajemen sesi.
- **Rate Limiting**: Menggunakan **Bucket4j** untuk perlindungan terhadap serangan brute-force atau DDoS ringan.
- **Media**: Terintegrasi dengan **Cloudinary** sebagai penyimpanan utama. Selain untuk gambar produk katalog, Cloudinary akan digunakan untuk menyimpan **snapshot desain** (Custom Apparel) dan **hasil render 3D** (Custom 3D) yang diunggah oleh pelanggan, guna memastikan ketersediaan data yang persisten dan cepat.
- **Dokumentasi**: Menggunakan **Swagger/OpenAPI 3.0** yang dapat diakses di `/swagger-ui/index.html`.

### Frontend (React + Vite)
- **Framework**: React.js dengan build tool **Vite**.
- **Styling**: Tailwind CSS (Desain premium, responsif).
- **State Management**: React Context API (`CartContext`, `ModalContext`).
- **Networking**: Axios dengan interceptor untuk menangani token JWT.
- **Fitur Utama**: Custom 3D preview (placeholder/logic), Custom Apparel, Katalog Produk, dan Manajemen Keranjang.

---

## 2. Analisis Alur Saat Ini (Existing Flow)

### Checkout & Order
1. Pengguna memilih produk -> Keranjang.
2. Di halaman Checkout, pengguna memilih alamat. Saat ini data area (Kota/Kecamatan) masih **hardcoded** di `ShippingService.java`.
3. Kalkulasi ongkos kirim juga masih menggunakan **simulasi logika internal** (per 500gr) tanpa real-time rate dari kurir.
4. Saat "Place Order", order disimpan dengan status `Pending`.

### Pembayaran
1. `PaymentService.java` saat ini menghasilkan **Mock Token (UUID)**.
2. URL pembayaran diarahkan ke mock gateway.
3. Terdapat endpoint webhook yang sudah disiapkan namun logic-nya masih sederhana.

### Logistik & Tracking
1. `TrackingService.java` sudah memiliki kerangka dasar untuk **Binderbyte** tetapi masih menggunakan **Mock Mode** untuk data simulasi.
2. Skema database `Orders` sudah memiliki kolom `CourierCode` dan `TrackingNumber`.

---

## 3. Evaluasi Kesiapan Integrasi

### Xendit (Payment)
- **Kesiapan**: 80%. Struktur DTO (`PaymentRequestDTO`, `PaymentResponseDTO`) sudah ada. Perlu penggantian logic di `PaymentService` untuk memanggil API Xendit (Invoice atau Checkout).
- **Kebutuhan**: API Key Xendit, Callback Token, dan penanganan webhook yang lebih aman (verifikasi signature).

### Binderbyte (Logistics)
- **Kesiapan**: 60%. Kerangka service sudah ada. 
- **Hambatan**: Data alamat di frontend/backend perlu disinkronkan dengan API Binderbyte agar ID area konsisten saat cek ongkir.
- **Kebutuhan**: API Key Binderbyte, integrasi endpoint `list kota`, `cek tarif`, dan `cek resi`.

---

## 4. Rekomendasi Teknis
- **Environment Variables**: Pindahkan semua API Key (Xendit & Binderbyte) ke `.env` atau `application.properties` (saat ini sudah ada beberapa placeholder).
- **Global Error Handling**: Sudah bagus menggunakan `CustomBusinessException`, perlu ditambah handling khusus error API pihak ketiga (misal: saldo Xendit habis, API Binderbyte limit).
- **Database**: Perlu penambahan tabel/kolom untuk menyimpan `payment_id` dari Xendit guna rekonsiliasi data.

---

## 5. Apa yang Dibutuhkan untuk Menjalankan Rencana Ini

### Infrastruktur & Akun
- **Akun Cloudinary**: Untuk penyimpanan aset desain dan render 3D.
- **Akun Xendit (Dashboard)**: Untuk mendapatkan API Key dan konfigurasi webhook pembayaran.
- **Akun Binderbyte**: Untuk integrasi tracking logistik dan cek ongkir.
- **Akun Tripo AI / Meshy**: Untuk API Generative 3D Mesh.

### Environment Backend
- **Java 21 & Maven**: Untuk pengembangan backend Spring Boot.
- **SQL Server**: Sebagai database utama.
- **Redis Server**: Untuk manajemen cache (List Kota, Tracking) dan Security.

### Environment Frontend
- **Node.js (v18+)**: Untuk menjalankan environment Vite & React.
- **API Client (Axios)**: Terkonfigurasi dengan Base URL backend yang benar.

### Library Tambahan
- `html2canvas`: Untuk capture desain mockup apparel.
- `three-stdlib` / `@react-three/drei`: Untuk GLTFLoader dan kontrol 3D yang lebih advance.
- `xendit-java` (Opsional) atau Custom Rest Client.

