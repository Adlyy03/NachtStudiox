# LichtCraft --- Product Requirements Document (PRD)

**Versi:** 1.0\
**Status:** Draft untuk persetujuan sebelum development\
**Produk:** Website landing page dan showcase jasa digital LichtCraft

## 1. Ringkasan Produk

LichtCraft adalah brand jasa pengembangan produk digital yang menawarkan
pembuatan website, web application, dan mobile application. Website
berfungsi sebagai storefront digital yang menjelaskan layanan,
menunjukkan kualitas kerja melalui portofolio, membangun kepercayaan,
dan nantinya mengarahkan calon klien ke kanal kontak.

Arah pengalaman: **premium, monochrome, editorial, interaktif, dan
motion-led**. Animasi harus terasa sengaja dan berkualitas, bukan
sekadar dekorasi atau menghambat pengunjung memahami layanan.

## 2. Tujuan Bisnis

1.  Membuat LichtCraft terlihat profesional dan berbeda dari penyedia
    jasa generik.
2.  Menjelaskan layanan dan kemampuan dengan cepat.
3.  Menampilkan proyek sebagai bukti kualitas.
4.  Memudahkan calon klien memahami bahwa harga dibuat berdasarkan
    kebutuhan dan kompleksitas.
5.  Menyediakan fondasi agar portofolio dapat dikelola melalui CRUD
    admin.
6.  Menyiapkan struktur yang bisa dikembangkan menjadi website bisnis
    yang lebih lengkap.

### Indikator keberhasilan

-   Pengunjung dapat memahami apa yang dikerjakan LichtCraft dalam
    beberapa detik.
-   Pengunjung dapat menemukan layanan, proses kerja, dan portofolio
    tanpa kebingungan.
-   CTA utama terlihat jelas dan dapat diarahkan ke kontak setelah
    detail kontak tersedia.
-   Halaman tetap nyaman dipakai di mobile, desktop, keyboard, dan
    perangkat dengan preferensi reduced motion.
-   Animasi tidak menyebabkan layout bergeser, navigasi rusak, atau
    performa terasa berat.

## 3. Target Audiens

Target awal dibuat luas: - UMKM yang ingin meningkatkan kredibilitas dan
kehadiran online. - Startup yang membutuhkan MVP atau produk digital. -
Perusahaan yang membutuhkan website atau sistem internal. - Personal
brand, kreator, dan profesional yang membutuhkan website. - Tim atau
bisnis yang membutuhkan aplikasi web maupun mobile.

**Catatan strategi:** target luas ini cocok untuk versi awal, tetapi
copywriting nantinya sebaiknya memprioritaskan masalah dan hasil bisnis,
bukan sekadar menyebut semua tipe klien.

## 4. Layanan

### Website Development

Website company profile, landing page, website bisnis, katalog, dan
website custom.

### Web Application

Dashboard, sistem internal, portal pengguna, panel admin, dan aplikasi
berbasis web sesuai kebutuhan.

### Mobile Application

Aplikasi mobile yang dirancang berdasarkan kebutuhan produk dan target
pengguna.

### Solusi Custom

Scope, fitur, timeline, dan biaya ditentukan berdasarkan kebutuhan,
kompleksitas, integrasi, dan ruang lingkup proyek.

Jangan menampilkan harga tetap atau klaim layanan yang belum
dikonfirmasi. Gunakan pendekatan **custom quotation**.

## 5. Ruang Lingkup

### Termasuk dalam fase pertama

-   Landing page responsif.
-   Header dan navigasi.
-   Hero section dengan visual motion graphic.
-   Ringkasan layanan.
-   Showcase portofolio.
-   Penjelasan nilai pembeda.
-   Proses kerja.
-   Bagian CTA / ajakan konsultasi dengan placeholder sampai kontak
    ditentukan.
-   Footer.
-   Animasi GSAP untuk entrance, scroll, dan micro-interaction terpilih.
-   Elemen visual 3D opsional melalui Three.js / React Three Fiber jika
    memberi nilai nyata.
-   Fondasi data portofolio yang konsisten agar siap dihubungkan ke
    CRUD.
-   SEO dasar, metadata, semantic HTML, dan optimasi performa.
-   Aksesibilitas dasar, termasuk navigasi keyboard dan reduced motion.

### Ditunda untuk fase berikutnya

-   Integrasi WhatsApp, email, form, atau booking sampai kanal kontak
    diputuskan.
-   Backend/database dan autentikasi admin.
-   CRUD portofolio yang benar-benar tersimpan secara persisten.
-   Blog, CMS penuh, multi-bahasa, pembayaran, dashboard klien, dan
    sistem invoice.
-   Klaim testimoni, statistik, logo klien, atau studi kasus yang belum
    tersedia.

**Penting:** tampilan tombol admin atau CRUD saja tidak membuat data
tersimpan. CRUD produksi memerlukan backend/database atau layanan
penyimpanan yang sesuai serta autentikasi dan otorisasi.

## 6. Struktur Halaman

Landing page satu halaman dengan navigasi anchor: 1. Header / Navigation
2. Hero 3. Trust statement / value proposition 4. Services 5. Selected
Work / Portfolio 6. Why LichtCraft 7. Process 8. CTA 9. Footer

Halaman tambahan yang mungkin dikembangkan: - Detail proyek / case
study. - Login admin. - Dashboard admin. - Form tambah/edit proyek.

## 7. Kebutuhan Fungsional

### F-01: Navigasi

-   Pengunjung dapat menuju section melalui menu.
-   Header mendukung tampilan desktop dan mobile.
-   Menu mobile dapat dibuka/ditutup dengan keyboard dan screen reader.
-   Navigasi tidak menutupi konten saat anchor scroll.

### F-02: Hero

-   Menampilkan nama LichtCraft, proposisi nilai, deskripsi singkat, dan
    CTA.
-   Menampilkan visual monochrome yang dinamis.
-   CTA memiliki tujuan yang jelas; sebelum kontak ditentukan, gunakan
    anchor ke portofolio atau placeholder yang mudah diganti.
-   Konten utama tetap terbaca jika animasi gagal dimuat.

### F-03: Layanan

-   Menampilkan tiga kategori utama: Website, Web App, dan Mobile App.
-   Tiap layanan memiliki deskripsi berorientasi manfaat.
-   Kartu dapat memiliki hover state dan animasi masuk yang tidak
    berlebihan.

### F-04: Portofolio

-   Menampilkan kartu proyek dengan gambar/visual, nama, kategori,
    deskripsi, dan tag teknologi bila tersedia.
-   Mendukung data kosong dengan empty state yang dirancang baik.
-   Tidak boleh menampilkan proyek fiktif seolah-olah proyek klien
    sungguhan.
-   Data demo harus diberi label atau diganti dengan proyek nyata
    sebelum publikasi.

### F-05: CRUD Portofolio (fase admin)

-   Create: tambah proyek.
-   Read: daftar proyek dan detail proyek.
-   Update: edit konten proyek.
-   Delete: hapus proyek dengan konfirmasi.
-   Validasi field wajib dan URL.
-   Feedback sukses/gagal.
-   Proteksi admin melalui autentikasi dan otorisasi.
-   Data tersimpan secara persisten, bukan hanya state browser.
-   Penghapusan dan perubahan data hanya bisa dilakukan pengguna
    berizin.

### F-06: Custom Pricing

-   Menjelaskan bahwa estimasi biaya disesuaikan dengan fitur,
    kompleksitas, integrasi, dan scope.
-   Tidak menciptakan angka harga tanpa persetujuan.
-   Mengarahkan pengunjung untuk konsultasi ketika kontak sudah
    tersedia.

### F-07: CTA dan Kontak

-   Disiapkan sebagai komponen yang mudah dikonfigurasi.
-   Kontak final belum ditentukan.
-   Hindari tautan palsu atau tombol yang tidak melakukan apa-apa di
    versi publik.

### F-08: Motion dan Interaksi

-   GSAP digunakan untuk timeline, reveal, dan animasi scroll yang
    terpilih.
-   ScrollTrigger dipakai secara selektif dan dibersihkan saat komponen
    unmount.
-   Hover/focus state memberikan feedback yang jelas.
-   Animasi tidak boleh menjadi satu-satunya cara untuk memahami konten.
-   Sediakan reduced-motion behavior.

## 8. Kebutuhan Non-Fungsional

### Performa

-   Prioritaskan loading cepat dan interaksi responsif.
-   Lazy-load media di luar viewport.
-   Hindari model 3D berat di perangkat mobile atau jaringan lambat.
-   Gunakan transform/opacity untuk animasi bila memungkinkan.
-   Hindari animasi layout mahal secara terus-menerus.
-   Ukur performa dengan Lighthouse sebelum rilis.

### Responsivitas

-   Mendukung mobile kecil, tablet, laptop, dan desktop lebar.
-   Tidak ada horizontal overflow yang tidak disengaja.
-   Tipografi dan jarak menyesuaikan viewport.

### Aksesibilitas

-   Kontras teks memadai.
-   Semua interaksi utama bisa dilakukan via keyboard.
-   Focus indicator terlihat.
-   Gambar memiliki alt text yang relevan.
-   Form admin memiliki label dan pesan error yang jelas.
-   Hormati `prefers-reduced-motion`.

### SEO

-   Title dan meta description unik.
-   Struktur heading berurutan.
-   Open Graph metadata.
-   URL dan nama proyek yang deskriptif jika halaman studi kasus dibuat.
-   Konten inti tersedia di HTML, bukan hanya dirender oleh animasi.

### Keamanan

-   Jangan menaruh secret/API key di frontend.
-   Admin CRUD harus memiliki autentikasi dan otorisasi server-side.
-   Validasi dan sanitasi input.
-   Batasi jenis dan ukuran file upload.
-   Jangan mengandalkan proteksi UI saja.

## 9. Teknologi

-   React + Vite: aplikasi frontend.
-   GSAP: animasi timeline dan scroll.
-   `@gsap/react`: integrasi lifecycle React.
-   Three.js + React Three Fiber + Drei: visual 3D bila diperlukan.
-   Tailwind CSS: styling utility-first, jika tetap dipilih saat setup.
-   Lucide React: ikon.
-   Backend/database untuk CRUD: diputuskan sebelum fase admin.
-   Hosting: diputuskan saat deployment.

Hindari menggunakan Three.js hanya demi tren. Jika visual 2D berbasis
CSS/SVG sudah cukup dan lebih ringan, prioritaskan solusi yang lebih
sederhana.

## 10. Konten yang Dibutuhkan

Sebelum publikasi: - Logo/wordmark LichtCraft atau persetujuan
penggunaan wordmark tipografi. - Deskripsi singkat brand. - Daftar
layanan final. - Proyek nyata, screenshot, peran LichtCraft, hasil, dan
teknologi yang benar-benar digunakan. - Testimoni atau logo klien hanya
dengan izin dan data yang valid. - Email/WhatsApp/kanal kontak. - Domain
dan informasi legal bila diperlukan.

## 11. Risiko dan Mitigasi

-   **Animasi terlalu ramai:** batasi pada momen penting dan pertahankan
    hirarki visual.
-   **3D berat:** gunakan fallback statis, lazy-load, dan nonaktifkan
    efek berat di perangkat yang tidak mendukung.
-   **Portofolio kosong:** siapkan empty state atau demo yang jelas
    diberi label.
-   **Target audiens terlalu luas:** evaluasi pesan berdasarkan jenis
    klien yang paling menguntungkan setelah data masuk.
-   **CRUD tidak aman:** jangan merilis admin tanpa auth, otorisasi,
    validasi, dan penyimpanan persisten.
-   **Kontak belum ada:** gunakan CTA internal sementara dan pastikan
    CTA final dikonfigurasi sebelum rilis.

## 12. Acceptance Criteria

-   [ ] Landing page responsif pada mobile dan desktop.
-   [ ] Semua section utama tersedia dan navigasi berfungsi.
-   [ ] Warna hanya memakai sistem monochrome dengan bayangan/kontras
    sebagai kedalaman; tidak ada aksen warna mencolok tanpa persetujuan.
-   [ ] Animasi GSAP berjalan tanpa error dan tidak menghalangi
    interaksi.
-   [ ] Konten tetap dapat diakses dengan reduced motion.
-   [ ] Portofolio menggunakan data nyata atau demo yang jelas dilabeli.
-   [ ] Tidak ada CTA publik yang mati atau mengarah ke URL palsu.
-   [ ] Metadata SEO dasar tersedia.
-   [ ] Tidak ada error console kritis.
-   [ ] Performa, aksesibilitas, dan responsivitas diuji sebelum rilis.
-   [ ] Fitur CRUD produksi tidak diklaim selesai sebelum backend,
    persistence, dan keamanan siap.

## 13. Keputusan yang Masih Terbuka

-   Logo final dan domain.
-   Kontak serta tujuan CTA.
-   Konten portofolio nyata.
-   Pilihan backend/database dan autentikasi admin.
-   Hosting/deployment.
-   Apakah visual 3D menjadi centerpiece atau hanya aksen ringan.

## 14. Rencana Tahapan

1.  Persetujuan PRD dan design direction.
2.  Setup proyek dan design tokens.
3.  Implementasi layout statis responsif.
4.  Implementasi motion system GSAP.
5.  Integrasi visual 3D yang terukur.
6.  Pengisian konten dan portofolio.
7.  Integrasi kontak.
8.  Backend/auth/CRUD portofolio.
9.  QA, optimasi, dan deployment.
